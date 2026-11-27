'use client';

import * as React from 'react';
import type { ResolvedCartLine } from '@/components/cart-provider';
import {
  LIMITS,
  validateOrderRequest,
  type FieldErrors
} from '@/lib/validation';

const inputClass =
  'w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-tertiary focus:outline-none aria-invalid:border-error';
const labelClass = 'text-[11px] font-semibold uppercase tracking-[0.2em] text-on-surface';
const errorClass = 'text-[11px] leading-relaxed text-error';

const fieldIds: Record<string, string> = {
  contactName: 'order-contact-name',
  email: 'order-email',
  notes: 'order-notes',
  items: 'order-items-error'
};

export interface OrderSubmission {
  reference: string;
  acknowledgementSent: boolean;
  lines: ResolvedCartLine[];
}

interface OrderRequestFormProps {
  lines: ResolvedCartLine[];
  onSubmitted: (submission: OrderSubmission) => void;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className={errorClass}>
      {message}
    </p>
  );
}

export function OrderRequestForm({ lines, onSubmitted }: OrderRequestFormProps) {
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const describedBy = (field: string) => (errors[field] ? `${fieldIds[field]}-error` : undefined);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      contactName: data.get('contactName'),
      email: data.get('email'),
      notes: data.get('notes'),
      companyWebsiteConfirm: data.get('companyWebsiteConfirm'),
      items: lines.map((line) => ({ slug: line.slug, qty: line.qty }))
    };

    const validated = validateOrderRequest(payload);
    if (!validated.ok) {
      setErrors(validated.errors);
      setFormError('Please check the highlighted fields before submitting your order enquiry.');
      const firstField = Object.keys(validated.errors)[0];
      const firstId = firstField ? fieldIds[firstField] : undefined;
      if (firstId) document.getElementById(firstId)?.focus();
      return;
    }

    setErrors({});
    setFormError(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = (await response.json().catch(() => null)) as
        | {
            ok?: boolean;
            message?: string;
            reference?: string;
            acknowledgementSent?: boolean;
            errors?: FieldErrors;
          }
        | null;

      if (!response.ok || !result?.ok || !result.reference) {
        setErrors(result?.errors ?? {});
        setFormError(
          result?.message ??
            'We could not submit your enquiry. Your enquiry selection has been kept — please try again in a moment.'
        );
        const firstField = result?.errors ? Object.keys(result.errors)[0] : undefined;
        const firstId = firstField ? fieldIds[firstField] : undefined;
        if (firstId) document.getElementById(firstId)?.focus();
        return;
      }

      onSubmitted({
        reference: result.reference,
        acknowledgementSent: result.acknowledgementSent !== false,
        lines
      });
    } catch {
      setFormError(
        'We could not reach the Maison Asili server. Your enquiry selection has been kept — please check your connection and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col gap-6" noValidate onSubmit={handleSubmit} aria-busy={submitting}>
      {formError ? (
        <div
          role="alert"
          className="border border-error/40 bg-error-container px-5 py-4 text-xs leading-relaxed text-on-error-container"
        >
          {formError}
          {Object.keys(errors).length > 0 ? (
            <ul className="mt-2 list-disc pl-5">
              {Object.entries(errors).map(([field, message]) => (
                <li key={field}>
                  <a href={`#${fieldIds[field] ?? 'order-request'}`} className="underline underline-offset-2">
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <fieldset className="flex flex-col gap-5" disabled={submitting}>
        <legend className="mb-4 border-b border-outline-variant pb-3 font-headline text-lg font-semibold text-on-surface">
          Your details
        </legend>

        <div className="flex flex-col gap-4 sm:gap-5">
          <label className="flex flex-col gap-2">
            <span className={labelClass}>
              FULL NAME <span className="text-tertiary">*</span>
            </span>
            <input
              id="order-contact-name"
              name="contactName"
              type="text"
              required
              maxLength={LIMITS.name}
              autoComplete="name"
              placeholder="Your full name"
              aria-invalid={Boolean(errors.contactName)}
              aria-describedby={describedBy('contactName')}
              className={inputClass}
            />
            <FieldError id="order-contact-name-error" message={errors.contactName} />
          </label>

          <label className="flex flex-col gap-2">
            <span className={labelClass}>
              EMAIL ADDRESS <span className="text-tertiary">*</span>
            </span>
            <input
              id="order-email"
              name="email"
              type="email"
              required
              maxLength={LIMITS.email}
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy('email')}
              className={inputClass}
            />
            <FieldError id="order-email-error" message={errors.email} />
          </label>

          <label className="flex flex-col gap-2">
            <span className={labelClass}>
              DELIVERY CITY / NOTES{' '}
              <span className="font-normal normal-case tracking-normal text-on-surface-variant">(optional)</span>
            </span>
            <textarea
              id="order-notes"
              name="notes"
              maxLength={LIMITS.notes}
              placeholder="Delivery city/address, phone number, or company name"
              aria-invalid={Boolean(errors.notes)}
              aria-describedby={describedBy('notes')}
              className={`${inputClass} min-h-[110px] resize-y`}
            />
            <FieldError id="order-notes-error" message={errors.notes} />
          </label>
        </div>
      </fieldset>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="order-company-website-confirm">Leave this field empty</label>
        <input
          id="order-company-website-confirm"
          name="companyWebsiteConfirm"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {errors.items ? (
        <p id="order-items-error" role="alert" className={errorClass}>
          {errors.items}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-outline-variant pt-6">
        <button
          type="submit"
          disabled={submitting || lines.length === 0}
          className="w-full bg-on-surface py-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-surface-container-lowest transition-colors sm:hover:bg-primary active:bg-on-surface disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Submitting request…' : 'Submit Enquiry'}
        </button>
        <p className="text-center text-[11px] leading-relaxed text-on-surface-variant">
          Submitting this form does not place a binding order. Maison Asili will confirm availability, pricing, and
          shipping options with you personally.
        </p>
      </div>
    </form>
  );
}
