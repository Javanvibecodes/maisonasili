'use client';

import * as React from 'react';
import {
  BUSINESS_TYPES,
  LIMITS,
  WHOLESALE_INTERESTS,
  WHOLESALE_VOLUMES,
  validateEnquiry,
  type FieldErrors
} from '@/lib/validation';

const inputClass =
  'w-full border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-tertiary focus:outline-none aria-invalid:border-error';
const labelClass = 'text-[11px] font-semibold uppercase tracking-[0.2em] text-on-surface';

interface SubmissionResult {
  reference: string;
  message: string;
}

export function WholesaleForm() {
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
      kind: 'wholesale' as const,
      name: data.get('name'),
      businessName: data.get('businessName'),
      email: data.get('email'),
      phone: data.get('phone'),
      businessType: data.get('businessType'),
      country: data.get('country'),
      interests: data.getAll('interests'),
      volume: data.get('volume'),
      message: data.get('message'),
      companyWebsiteConfirm: data.get('companyWebsiteConfirm')
    };

    const validated = validateEnquiry(payload);
    if (!validated.ok) {
      setErrors(validated.errors);
      setFormError('Please check the highlighted fields before sending your enquiry.');
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
        setFormError(body?.message ?? 'We could not send your enquiry just now. Please try again in a moment.');
        return;
      }

      setResult({ reference: body.reference, message: body.message ?? 'Thank you — your enquiry has been sent.' });
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
              Business name <span className="text-tertiary">*</span>
            </span>
            <input
              name="businessName"
              type="text"
              required
              maxLength={LIMITS.business}
              autoComplete="organization"
              placeholder="Company or venue"
              aria-invalid={Boolean(errors.businessName)}
              className={inputClass}
            />
            {errors.businessName ? <span className="text-[11px] text-error">{errors.businessName}</span> : null}
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
              placeholder="you@business.com"
              aria-invalid={Boolean(errors.email)}
              className={inputClass}
            />
            {errors.email ? <span className="text-[11px] text-error">{errors.email}</span> : null}
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>
              Phone{' '}
              <span className="font-normal normal-case tracking-normal text-on-surface-variant">(optional)</span>
            </span>
            <input
              name="phone"
              type="tel"
              maxLength={LIMITS.phone}
              autoComplete="tel"
              placeholder="+49 …"
              aria-invalid={Boolean(errors.phone)}
              className={inputClass}
            />
            {errors.phone ? <span className="text-[11px] text-error">{errors.phone}</span> : null}
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>
              Business type <span className="text-tertiary">*</span>
            </span>
            <select
              name="businessType"
              required
              defaultValue=""
              aria-invalid={Boolean(errors.businessType)}
              className={inputClass}
            >
              <option value="">Please select</option>
              {BUSINESS_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.businessType ? <span className="text-[11px] text-error">{errors.businessType}</span> : null}
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>
              Country <span className="text-tertiary">*</span>
            </span>
            <input
              name="country"
              type="text"
              required
              maxLength={LIMITS.country}
              autoComplete="country-name"
              placeholder="Country of operation"
              aria-invalid={Boolean(errors.country)}
              className={inputClass}
            />
            {errors.country ? <span className="text-[11px] text-error">{errors.country}</span> : null}
          </label>
        </div>

        <fieldset className="flex flex-col gap-3">
          <legend className={`${labelClass} mb-1`}>
            Product interests <span className="text-tertiary">*</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {WHOLESALE_INTERESTS.map((interest) => (
              <label
                key={interest}
                className="inline-flex cursor-pointer items-center gap-2 border border-outline-variant px-4 py-2.5 transition-colors hover:border-tertiary"
              >
                <input type="checkbox" name="interests" value={interest} className="accent-tertiary" />
                <span className="text-xs text-on-surface">{interest}</span>
              </label>
            ))}
          </div>
          {errors.interests ? <span className="text-[11px] text-error">{errors.interests}</span> : null}
        </fieldset>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>
            Estimated order volume{' '}
            <span className="font-normal normal-case tracking-normal text-on-surface-variant">(optional)</span>
          </span>
          <select name="volume" className={inputClass} defaultValue="">
            <option value="">Not sure yet</option>
            {WHOLESALE_VOLUMES.filter((volume) => volume !== 'Not sure yet').map((volume) => (
              <option key={volume} value={volume}>
                {volume}
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
            placeholder="Tell us about your business, your guests and what you are looking for."
            aria-invalid={Boolean(errors.message)}
            className={`${inputClass} min-h-[140px] resize-y`}
          />
          {errors.message ? <span className="text-[11px] text-error">{errors.message}</span> : null}
        </label>
      </fieldset>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="wholesale-company-website-confirm">Leave this field empty</label>
        <input
          id="wholesale-company-website-confirm"
          name="companyWebsiteConfirm"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting}
          className="bg-on-surface px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-surface-container-lowest transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Sending enquiry…' : 'Submit Enquiry'}
        </button>
        <span className="text-[11px] text-on-surface-variant">
          or write to{' '}
          <a href="mailto:info@maisonasili.com" className="text-tertiary transition-colors hover:text-on-surface">
            info@maisonasili.com
          </a>
        </span>
      </div>
    </form>
  );
}
