'use client';

import * as React from 'react';
import { CONTACT_SUBJECTS, LIMITS, validateEnquiry, type FieldErrors } from '@/lib/validation';

const inputClass =
  'w-full border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-tertiary focus:outline-none aria-invalid:border-error';
const labelClass = 'text-[11px] font-semibold uppercase tracking-[0.2em] text-on-surface';

interface SubmissionResult {
  reference: string;
  message: string;
}

export function ContactForm() {
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [result, setResult] = React.useState<SubmissionResult | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      kind: 'contact' as const,
      name: data.get('name'),
      email: data.get('email'),
      subject: data.get('subject'),
      message: data.get('message'),
      companyWebsiteConfirm: data.get('companyWebsiteConfirm')
    };

    const validated = validateEnquiry(payload);
    if (!validated.ok) {
      setErrors(validated.errors);
      setFormError('Please check the highlighted fields before sending your message.');
      return;
    }

    setErrors({});
    setFormError(null);
    setSubmitting(true);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const body = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; reference?: string; errors?: FieldErrors }
        | null;

      if (!response.ok || !body?.ok || !body.reference) {
        setErrors(body?.errors ?? {});
        setFormError(body?.message ?? 'We could not send your message just now. Please try again in a moment.');
        return;
      }

      setResult({ reference: body.reference, message: body.message ?? 'Thank you — your message has been sent.' });
      form.reset();
    } catch {
      setFormError('We could not reach the Maison Asili server. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col gap-5" noValidate onSubmit={handleSubmit} aria-busy={submitting}>
      {formError ? (
        <div role="alert" className="border border-error/40 bg-error-container px-4 py-3 text-xs leading-relaxed text-on-error-container">
          {formError}
        </div>
      ) : null}

      {result ? (
        <div role="status" aria-live="polite" className="border border-tertiary/40 bg-surface-container-low px-4 py-4 text-xs leading-relaxed text-on-surface">
          <p className="font-semibold text-primary">{result.message}</p>
          <p className="mt-1 text-on-surface-variant">
            Your reference: <span className="font-semibold text-primary">{result.reference}</span>
          </p>
        </div>
      ) : null}

      <fieldset className="flex flex-col gap-5" disabled={submitting}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className={labelClass}>
              Full name <span className="text-tertiary">*</span>
            </span>
            <input
              name="name"
              type="text"
              required
              maxLength={LIMITS.name}
              autoComplete="name"
              placeholder="Your full name"
              aria-invalid={Boolean(errors.name)}
              className={inputClass}
            />
            {errors.name ? <span className="text-[11px] text-error">{errors.name}</span> : null}
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>
              Email <span className="text-tertiary">*</span>
            </span>
            <input
              name="email"
              type="email"
              required
              maxLength={LIMITS.email}
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              className={inputClass}
            />
            {errors.email ? <span className="text-[11px] text-error">{errors.email}</span> : null}
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>Subject</span>
          <select name="subject" defaultValue={CONTACT_SUBJECTS[0]} className={inputClass}>
            {CONTACT_SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>
            Message <span className="text-tertiary">*</span>
          </span>
          <textarea
            name="message"
            required
            maxLength={LIMITS.message}
            placeholder="How can we help?"
            aria-invalid={Boolean(errors.message)}
            className={`${inputClass} min-h-[150px] resize-y`}
          />
          {errors.message ? <span className="text-[11px] text-error">{errors.message}</span> : null}
        </label>
      </fieldset>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-company-website-confirm">Leave this field empty</label>
        <input
          id="contact-company-website-confirm"
          name="companyWebsiteConfirm"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="self-start bg-on-surface px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-surface-container-lowest transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? 'Sending message…' : 'Send Message'}
      </button>
    </form>
  );
}
