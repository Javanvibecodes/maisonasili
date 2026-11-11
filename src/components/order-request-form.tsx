'use client';

import * as React from 'react';
import type { ResolvedCartLine } from '@/components/cart-provider';
import {
  BUSINESS_TYPES,
  LIMITS,
  validateOrderRequest,
  type FieldErrors
} from '@/lib/validation';

const inputClass =
  'w-full border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-tertiary focus:outline-none aria-invalid:border-error';
const labelClass = 'text-[11px] font-semibold uppercase tracking-[0.2em] text-on-surface';
const errorClass = 'text-[11px] leading-relaxed text-error';

const fieldIds: Record<string, string> = {
  businessName: 'order-business-name',
  contactName: 'order-contact-name',
  email: 'order-email',
  phone: 'order-phone',
  country: 'order-country',
  city: 'order-city',
  businessType: 'order-business-type',
  deliveryAddress: 'order-delivery-address',
  website: 'order-website',
  fulfilment: 'order-fulfilment',
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
      businessName: data.get('businessName'),
      contactName: data.get('contactName'),
      email: data.get('email'),
      phone: data.get('phone'),
      country: data.get('country'),
      city: data.get('city'),
      businessType: data.get('businessType'),
      deliveryAddress: data.get('deliveryAddress'),
      website: data.get('website'),
      fulfilment: data.get('fulfilment'),
      notes: data.get('notes'),
      companyWebsiteConfirm: data.get('companyWebsiteConfirm'),
      items: lines.map((line) => ({ slug: line.slug, qty: line.qty }))
    };

    const validated = validateOrderRequest(payload);
    if (!validated.ok) {
      setErrors(validated.errors);
      setFormError('Please check the highlighted fields before submitting your order request.');
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
            'We could not submit your order request. Your order cart has been kept — please try again in a moment.'
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
        'We could not reach the Maison Asili server. Your order cart has been kept — please check your connection and try again.'
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
          Retailer information
        </legend>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className={labelClass}>
              Business name <span className="text-tertiary">*</span>
            </span>
            <input
              id="order-business-name"
              name="businessName"
              type="text"
              required
              maxLength={LIMITS.business}
              autoComplete="organization"
              placeholder="Company, venue or shop"
              aria-invalid={Boolean(errors.businessName)}
              aria-describedby={describedBy('businessName')}
              className={inputClass}
            />
            <FieldError id="order-business-name-error" message={errors.businessName} />
          </label>

          <label className="flex flex-col gap-2">
            <span className={labelClass}>
              Contact person <span className="text-tertiary">*</span>
            </span>
            <input
              id="order-contact-name"
              name="contactName"
              type="text"
              required
              maxLength={LIMITS.name}
              autoComplete="name"
              placeholder="Full name"
              aria-invalid={Boolean(errors.contactName)}
              aria-describedby={describedBy('contactName')}
              className={inputClass}
            />
            <FieldError id="order-contact-name-error" message={errors.contactName} />
          </label>

          <label className="flex flex-col gap-2">
            <span className={labelClass}>
              Business email <span className="text-tertiary">*</span>
            </span>
            <input
              id="order-email"
              name="email"
              type="email"
              required
              maxLength={LIMITS.email}
              autoComplete="email"
              placeholder="buyer@business.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy('email')}
              className={inputClass}
            />
            <FieldError id="order-email-error" message={errors.email} />
          </label>

          <label className="flex flex-col gap-2">
            <span className={labelClass}>
              Phone{' '}
              <span className="font-normal normal-case tracking-normal text-on-surface-variant">(optional)</span>
            </span>
            <input
              id="order-phone"
              name="phone"
              type="tel"
              maxLength={LIMITS.phone}
              autoComplete="tel"
              placeholder="+49 …"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={describedBy('phone')}
              className={inputClass}
            />
            <FieldError id="order-phone-error" message={errors.phone} />
          </label>

          <label className="flex flex-col gap-2">
            <span className={labelClass}>
              Business type <span className="text-tertiary">*</span>
            </span>
            <select
              id="order-business-type"
              name="businessType"
              required
              defaultValue=""
              aria-invalid={Boolean(errors.businessType)}
              aria-describedby={describedBy('businessType')}
              className={inputClass}
            >
              <option value="">Please select</option>
              {BUSINESS_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <FieldError id="order-business-type-error" message={errors.businessType} />
          </label>

          <label className="flex flex-col gap-2">
            <span className={labelClass}>
              Country <span className="text-tertiary">*</span>
            </span>
            <input
              id="order-country"
              name="country"
              type="text"
              required
              maxLength={LIMITS.country}
              autoComplete="country-name"
              placeholder="Country of operation"
              aria-invalid={Boolean(errors.country)}
              aria-describedby={describedBy('country')}
              className={inputClass}
            />
            <FieldError id="order-country-error" message={errors.country} />
          </label>

          <label className="flex flex-col gap-2">
            <span className={labelClass}>
              City <span className="text-tertiary">*</span>
            </span>
            <input
              id="order-city"
              name="city"
              type="text"
              required
              maxLength={LIMITS.city}
              autoComplete="address-level2"
              placeholder="City"
              aria-invalid={Boolean(errors.city)}
              aria-describedby={describedBy('city')}
              className={inputClass}
            />
            <FieldError id="order-city-error" message={errors.city} />
          </label>

          <label className="flex flex-col gap-2">
            <span className={labelClass}>
              Website{' '}
              <span className="font-normal normal-case tracking-normal text-on-surface-variant">(optional)</span>
            </span>
            <input
              id="order-website"
              name="website"
              type="text"
              inputMode="url"
              maxLength={LIMITS.website}
              autoComplete="url"
              placeholder="yourbusiness.com"
              aria-invalid={Boolean(errors.website)}
              aria-describedby={describedBy('website')}
              className={inputClass}
            />
            <FieldError id="order-website-error" message={errors.website} />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className={labelClass}>
              Delivery address{' '}
              <span className="font-normal normal-case tracking-normal text-on-surface-variant">(optional)</span>
            </span>
            <textarea
              id="order-delivery-address"
              name="deliveryAddress"
              maxLength={LIMITS.address}
              autoComplete="street-address"
              placeholder="Street, number, postcode and city, if already known"
              aria-invalid={Boolean(errors.deliveryAddress)}
              aria-describedby={describedBy('deliveryAddress')}
              className={`${inputClass} min-h-[90px] resize-y`}
            />
            <FieldError id="order-delivery-address-error" message={errors.deliveryAddress} />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className={labelClass}>
              Preferred fulfilment{' '}
              <span className="font-normal normal-case tracking-normal text-on-surface-variant">(optional)</span>
            </span>
            <input
              id="order-fulfilment"
              name="fulfilment"
              type="text"
              maxLength={LIMITS.fulfilment}
              placeholder="For example a preferred delivery window or collection preference"
              aria-invalid={Boolean(errors.fulfilment)}
              aria-describedby={describedBy('fulfilment')}
              className={inputClass}
            />
            <FieldError id="order-fulfilment-error" message={errors.fulfilment} />
          </label>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4" disabled={submitting}>
        <legend className="mb-4 border-b border-outline-variant pb-3 font-headline text-lg font-semibold text-on-surface">
          Order notes
        </legend>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>
            Anything we should know?{' '}
            <span className="font-normal normal-case tracking-normal text-on-surface-variant">(optional)</span>
          </span>
          <textarea
            id="order-notes"
            name="notes"
            maxLength={LIMITS.notes}
            placeholder="Tell us about your business, how you intend to use the products, expected order frequency or any delivery considerations."
            aria-invalid={Boolean(errors.notes)}
            aria-describedby={describedBy('notes')}
            className={`${inputClass} min-h-[140px] resize-y`}
          />
          <span className="text-[11px] text-on-surface-variant">
            {LIMITS.notes} characters maximum. Do not include payment details.
          </span>
          <FieldError id="order-notes-error" message={errors.notes} />
        </label>
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

      <div className="flex flex-col gap-4 border-t border-outline-variant pt-6 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting || lines.length === 0}
          className="bg-on-surface px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-surface-container-lowest transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Submitting request…' : 'Submit Wholesale Order Request'}
        </button>
        <p className="max-w-sm text-[11px] leading-relaxed text-on-surface-variant">
          Submitting this form does not place an order. Maison Asili will confirm availability, trade pricing and
          fulfilment with you.
        </p>
      </div>
    </form>
  );
}
