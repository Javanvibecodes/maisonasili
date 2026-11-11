/**
 * Shared form contracts for the wholesale order request and the enquiry forms.
 *
 * This module is safe to import from both client components and route handlers:
 * it contains no secrets and no server-only dependencies. It is the single
 * source of truth for field limits and business-type options so the browser and
 * the server validate exactly the same rules.
 */

import { getProduct } from '@/lib/catalog';
import { MAX_ORDER_QUANTITY, MIN_ORDER_QUANTITY } from '@/lib/order-limits';

export const BUSINESS_TYPES = [
  'Delicatessen',
  'Gourmet food shop',
  'Retail store',
  'Hotel',
  'Restaurant',
  'Café',
  'Distributor',
  'Corporate gifting',
  'Other'
] as const;

export const CONTACT_SUBJECTS = [
  'Product question',
  'Wholesale & hospitality',
  'Press & collaboration',
  'Something else'
] as const;

export const WHOLESALE_INTERESTS = ['Spice blends', 'Salts', 'Botanical teas', 'Gift ranges'] as const;

export const WHOLESALE_VOLUMES = [
  'Trial order',
  'Monthly recurring',
  'Seasonal programme',
  'One-off event or gifting',
  'Not sure yet'
] as const;

export const LIMITS = {
  name: 120,
  business: 160,
  email: 254,
  phone: 40,
  country: 80,
  city: 100,
  address: 300,
  website: 300,
  fulfilment: 200,
  subject: 120,
  notes: 2000,
  message: 3000,
  maxItems: 60
} as const;

export type FieldErrors = Record<string, string>;

export interface OrderItemInput {
  slug: string;
  qty: number;
}

export interface OrderRequestInput {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  businessType: string;
  deliveryAddress: string;
  website: string;
  fulfilment: string;
  notes: string;
  items: OrderItemInput[];
}

export interface EnquiryInput {
  kind: 'contact' | 'wholesale';
  name: string;
  email: string;
  phone: string;
  businessName: string;
  country: string;
  businessType: string;
  subject: string;
  interests: string[];
  volume: string;
  message: string;
}

type ValidationResult<T> = { ok: true; value: T } | { ok: false; errors: FieldErrors };

/** Remove control characters and trim; keeps internal line breaks. */
export function cleanMultiline(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
    .replace(/\r\n/g, '\n')
    .trim()
    .slice(0, max);
}

/** Collapse to a single line and trim. */
export function cleanLine(value: unknown, max: number): string {
  return cleanMultiline(value, max).replace(/\s+/g, ' ').trim();
}

export function isValidEmail(value: string): boolean {
  if (!value || value.length > LIMITS.email) return false;
  // Deliberately pragmatic: one @, no whitespace, a dot in the domain.
  return /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[A-Za-z]{2,}$/.test(value);
}

function isBusinessType(value: string): boolean {
  return (BUSINESS_TYPES as readonly string[]).includes(value);
}

function isValidWebsite(value: string): boolean {
  if (!value) return true;
  if (/\s/.test(value)) return false;
  if (/^https?:\/\/[^\s/]+\.[^\s]+$/i.test(value)) return true;
  return /^[^\s/]+\.[^\s]{2,}(\/\S*)?$/i.test(value);
}

function isValidPhone(value: string): boolean {
  if (!value) return true;
  return /^[+()\d][\d\s()./-]{4,}$/.test(value);
}

function addError(errors: FieldErrors, field: string, message: string) {
  if (!errors[field]) errors[field] = message;
}

function requiredText(
  errors: FieldErrors,
  field: string,
  label: string,
  raw: unknown,
  max: number,
  min = 2
): string {
  const value = cleanLine(raw, max);
  if (!value) addError(errors, field, `${label} is required.`);
  else if (value.length < min) addError(errors, field, `${label} is too short.`);
  return value;
}

export function validateOrderRequest(payload: unknown): ValidationResult<OrderRequestInput> {
  const errors: FieldErrors = {};
  if (typeof payload !== 'object' || payload === null) {
    return { ok: false, errors: { form: 'The order request could not be read.' } };
  }

  const source = payload as Record<string, unknown>;
  const businessName = requiredText(errors, 'businessName', 'Business name', source.businessName, LIMITS.business);
  const contactName = requiredText(errors, 'contactName', 'Contact name', source.contactName, LIMITS.name);
  const country = requiredText(errors, 'country', 'Country', source.country, LIMITS.country);
  const city = requiredText(errors, 'city', 'City', source.city, LIMITS.city);

  const email = cleanLine(source.email, LIMITS.email).toLowerCase();
  if (!email) addError(errors, 'email', 'Business email is required.');
  else if (!isValidEmail(email)) addError(errors, 'email', 'Enter a valid business email address.');

  const businessType = cleanLine(source.businessType, 60);
  if (!businessType) addError(errors, 'businessType', 'Business type is required.');
  else if (!isBusinessType(businessType)) addError(errors, 'businessType', 'Choose a business type from the list.');

  const phone = cleanLine(source.phone, LIMITS.phone);
  if (phone && !isValidPhone(phone)) addError(errors, 'phone', 'Enter a valid phone number.');

  const website = cleanLine(source.website, LIMITS.website);
  if (website && !isValidWebsite(website)) addError(errors, 'website', 'Enter a valid website address.');

  const deliveryAddress = cleanMultiline(source.deliveryAddress, LIMITS.address);
  const fulfilment = cleanLine(source.fulfilment, LIMITS.fulfilment);
  const notes = cleanMultiline(source.notes, LIMITS.notes);

  const rawItems = Array.isArray(source.items) ? source.items : [];
  if (rawItems.length === 0) addError(errors, 'items', 'Add at least one product to your order request.');
  if (rawItems.length > LIMITS.maxItems) addError(errors, 'items', 'Too many product lines in one request.');

  const merged = new Map<string, number>();
  for (const entry of rawItems) {
    if (typeof entry !== 'object' || entry === null) {
      addError(errors, 'items', 'One of the product lines is invalid.');
      continue;
    }
    const slug = cleanLine((entry as Record<string, unknown>).slug, 120);
    const qtyRaw = (entry as Record<string, unknown>).qty;
    if (!slug || !getProduct(slug)) {
      addError(errors, 'items', 'One of the products is no longer in the catalogue.');
      continue;
    }
    if (typeof qtyRaw !== 'number' || !Number.isFinite(qtyRaw) || !Number.isInteger(qtyRaw)) {
      addError(errors, 'items', 'Quantities must be whole numbers.');
      continue;
    }
    if (qtyRaw < MIN_ORDER_QUANTITY || qtyRaw > MAX_ORDER_QUANTITY) {
      addError(errors, 'items', `Quantities must be between ${MIN_ORDER_QUANTITY} and ${MAX_ORDER_QUANTITY}.`);
      continue;
    }
    merged.set(slug, Math.min(MAX_ORDER_QUANTITY, (merged.get(slug) ?? 0) + qtyRaw));
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: {
      businessName,
      contactName,
      email,
      phone,
      country,
      city,
      businessType,
      deliveryAddress,
      website,
      fulfilment,
      notes,
      items: [...merged.entries()].map(([slug, qty]) => ({ slug, qty }))
    }
  };
}

export function validateEnquiry(payload: unknown): ValidationResult<EnquiryInput> {
  const errors: FieldErrors = {};
  if (typeof payload !== 'object' || payload === null) {
    return { ok: false, errors: { form: 'The enquiry could not be read.' } };
  }

  const source = payload as Record<string, unknown>;
  const kind = cleanLine(source.kind, 20);
  if (kind !== 'contact' && kind !== 'wholesale') {
    return { ok: false, errors: { form: 'Unknown enquiry type.' } };
  }

  const name = requiredText(errors, 'name', 'Full name', source.name, LIMITS.name);
  const email = cleanLine(source.email, LIMITS.email).toLowerCase();
  if (!email) addError(errors, 'email', 'Email is required.');
  else if (!isValidEmail(email)) addError(errors, 'email', 'Enter a valid email address.');

  const phone = cleanLine(source.phone, LIMITS.phone);
  if (phone && !isValidPhone(phone)) addError(errors, 'phone', 'Enter a valid phone number.');

  const message = cleanMultiline(source.message, LIMITS.message);
  if (!message) addError(errors, 'message', 'Message is required.');
  else if (message.length < 10) addError(errors, 'message', 'Please add a little more detail.');

  let businessName = '';
  let country = '';
  let businessType = '';
  let subject = '';
  let interests: string[] = [];
  let volume = '';

  if (kind === 'wholesale') {
    businessName = requiredText(errors, 'businessName', 'Business name', source.businessName, LIMITS.business);
    country = requiredText(errors, 'country', 'Country', source.country, LIMITS.country);
    businessType = cleanLine(source.businessType, 60);
    if (!businessType) addError(errors, 'businessType', 'Business type is required.');
    else if (!isBusinessType(businessType)) addError(errors, 'businessType', 'Choose a business type from the list.');

    const rawInterests = Array.isArray(source.interests) ? source.interests : [];
    interests = rawInterests
      .map((value) => cleanLine(value, 60))
      .filter((value) => (WHOLESALE_INTERESTS as readonly string[]).includes(value));
    if (interests.length === 0) addError(errors, 'interests', 'Choose at least one product interest.');

    const rawVolume = cleanLine(source.volume, 80);
    volume = (WHOLESALE_VOLUMES as readonly string[]).includes(rawVolume) ? rawVolume : '';
  } else {
    const rawSubject = cleanLine(source.subject, LIMITS.subject);
    subject = (CONTACT_SUBJECTS as readonly string[]).includes(rawSubject) ? rawSubject : CONTACT_SUBJECTS[0];
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: {
      kind,
      name,
      email,
      phone,
      businessName,
      country,
      businessType,
      subject,
      interests,
      volume,
      message
    }
  };
}
