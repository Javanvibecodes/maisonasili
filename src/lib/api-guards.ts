import 'server-only';

/**
 * Lightweight abuse protection for the public form endpoints.
 *
 * The rate limiter is in-memory and therefore per serverless instance. It stops
 * casual repeat submissions and runaway retries, but it is not a durable
 * distributed limiter. A shared store (for example Upstash Redis or Vercel KV)
 * should be added if strict global limits are required. This limitation is
 * documented in the README rather than overstated.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 6;
const MAX_TRACKED_KEYS = 5000;

const buckets = new Map<string, number[]>();

export function checkRateLimit(key: string, max = MAX_REQUESTS, windowMs = WINDOW_MS): boolean {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((time) => now - time < windowMs);

  if (recent.length >= max) {
    buckets.set(key, recent);
    return false;
  }

  recent.push(now);
  buckets.set(key, recent);

  if (buckets.size > MAX_TRACKED_KEYS) {
    for (const [bucketKey, times] of buckets) {
      if (times.every((time) => now - time >= windowMs)) buckets.delete(bucketKey);
    }
  }

  return true;
}

export function clientAddress(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

/**
 * Rejects cross-site browser submissions. Requests without an Origin header are
 * allowed so that server-to-server health checks and older clients still work;
 * they are still subject to validation and rate limiting.
 */
export function isAllowedOrigin(request: Request): boolean {
  const fetchSite = request.headers.get('sec-fetch-site');
  if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) return false;

  const origin = request.headers.get('origin');
  if (!origin) return true;

  const host = request.headers.get('host');
  try {
    const originHost = new URL(origin).host;
    if (host && originHost === host) return true;

    const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    if (configured) {
      try {
        if (new URL(configured).host === originHost) return true;
      } catch {
        // Ignore a malformed configuration value; the host comparison above stands.
      }
    }
  } catch {
    return false;
  }

  return false;
}

const REFERENCE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

/** Human-readable, sortable reference such as MA-20261111-K7Q4. */
export function createReference(prefix: 'MA' | 'ENQ', now = new Date()): string {
  const date = [
    now.getUTCFullYear(),
    String(now.getUTCMonth() + 1).padStart(2, '0'),
    String(now.getUTCDate()).padStart(2, '0')
  ].join('');

  let suffix = '';
  for (let index = 0; index < 4; index += 1) {
    suffix += REFERENCE_ALPHABET[Math.floor(Math.random() * REFERENCE_ALPHABET.length)];
  }

  return `${prefix}-${date}-${suffix}`;
}

/** A filled hidden field means the submission came from a bot. */
export function isHoneypotTripped(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}
