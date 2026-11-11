# Maison Asili

Maison Asili is an Afro-Gourmet product house rooted in Africa and born in Berlin. This repository contains the official brand website and its retailer-facing **wholesale order request** platform.

The website is a product catalogue and brand story, not a consumer checkout:

- No product prices are displayed.
- No payment is taken and no card/PayPal integration exists.
- Retailers build an **Order Cart**, submit a **wholesale order request**, and Maison Asili follows up by email to confirm availability, trade pricing and fulfilment.

## Tech stack

- **Next.js 14** (App Router) with **React 18** and **TypeScript**
- **Tailwind CSS** for the existing Maison Asili design system
- **LocalStorage** for the Order Cart (no accounts, no database)
- **Resend** for transactional email, called from server-side route handlers
- Intended deployment: **Vercel**

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values you have
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

Type checking:

```bash
npm run typecheck
```

## Environment variables

All variables are documented in `.env.example`. Only `RESEND_API_KEY` and `ORDER_FROM_EMAIL` are required to send real email.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes (to send email) | Server-side Resend API key. Never exposed to the browser. |
| `ORDER_NOTIFICATION_EMAIL` | No | Recipient for wholesale order requests. Defaults to `info@maisonasili.com`. Comma-separate multiple addresses. |
| `ENQUIRY_NOTIFICATION_EMAIL` | No | Recipient for contact/wholesale enquiries. Defaults to `ORDER_NOTIFICATION_EMAIL`. |
| `ORDER_FROM_EMAIL` | Yes (to send email) | Verified sender, e.g. `Maison Asili <orders@maisonasili.com>`. Must be a domain verified in Resend. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public site URL, used for same-origin checks. |
| `EMAIL_TRANSPORT` | No | Development only. Set to `log` to record emails in the server log instead of sending them. Ignored in production. |

Secrets are only read inside server modules (`src/lib/email.ts` is marked `server-only`) and are never included in client bundles.

## Email provider setup (required before launch)

1. Create a [Resend](https://resend.com) account and verify the Maison Asili sending domain.
2. Create an API key with send permission.
3. Add `RESEND_API_KEY` and `ORDER_FROM_EMAIL` to Vercel (Production, Preview and Development as appropriate).
4. Set `ORDER_NOTIFICATION_EMAIL` to the mailbox that should receive order requests.
5. Submit a test order request and confirm both the internal notification and the retailer acknowledgement arrive.
6. Check the Resend dashboard for delivery/bounce events.

Until these steps are complete, the API returns a clear `503` message and the website asks buyers to email `info@maisonasili.com` instead. It never displays a fake success message.

For local UI/API testing without a Resend account, run with `EMAIL_TRANSPORT=log` in development; the server records the rendered message in the log.

## How the order flow works

1. A retailer explores the collection at `/shop` and adds products and quantities to the Order Cart (stored in their browser).
2. At `/cart` they review the selection and complete the retailer information form.
3. The browser posts the request to `POST /api/orders`.
4. The server validates every field and quantity, verifies product slugs against the catalogue (`src/data/products.js`), derives product names and pack sizes from trusted data, and ignores any price data.
5. The server generates a reference such as `MA-20261111-K7Q4`, sends the internal notification to `ORDER_NOTIFICATION_EMAIL`, then sends an acknowledgement to the retailer.
6. Only after the internal notification succeeds does the browser clear the cart and show the confirmation with the reference.
7. If the internal email fails, the cart is kept and the retailer can retry. If only the acknowledgement fails, the request is still recorded and the confirmation says so honestly.

Contact and wholesale enquiries use `POST /api/enquiries` with the same validation, rate limiting and email pipeline. They are not part of the order record.

## Abuse protection

The form endpoints implement:

- Server-side validation with shared limits (`src/lib/validation.ts`)
- Email, phone, website and quantity validation
- Catalogue slug verification
- Empty-cart rejection
- Same-origin / `Sec-Fetch-Site` checks
- A hidden honeypot field
- Per-IP rate limiting (6 submissions per 10 minutes)
- Safe error responses and logging without secrets

**Limitation:** the rate limiter is in-memory and therefore per serverless instance. It is adequate as a basic safeguard but is not a durable distributed limit. If strict global limits are needed, add a shared store such as Upstash Redis or Vercel KV in `src/lib/api-guards.ts`.

## Deployment on Vercel

1. Import the repository into Vercel.
2. Framework preset: **Next.js** (build command `npm run build`, output handled automatically).
3. Add the environment variables above.
4. Deploy, then run a test order request against the production URL.
5. Verify the sending domain in Resend before switching `ORDER_FROM_EMAIL` to the live address.

## Catalogue

The active catalogue is defined in `src/data/products.js` and `src/data/collections.js` and is the single source of truth for product pages, collection pages, search, filtering and order validation. It currently contains the spice, salt and botanical tea ranges with their verified descriptions, ingredients, pack sizes and imagery.

Prices were removed from the catalogue during the wholesale conversion. Trade pricing must be supplied by Maison Asili on request and is never invented by the website.

## Remaining client-provided information

The following content is intentionally not fabricated and still needs confirmation from Maison Asili:

- Verified sender address/domain for Resend and the final notification mailbox(es).
- Registered business address, telephone number, commercial register details, VAT ID and authorised representative for the Impressum.
- Official social media URLs (the footer and contact page do not link to unverified accounts).
- Any trade terms, minimum order quantities or pack formats to be published.
- Legal review of the privacy notice and terms.
- Final approval of product descriptions, origins and ingredient lists.

## Project structure

```
src/
  app/                 App Router pages and API route handlers
    api/orders/        Wholesale order request endpoint
    api/enquiries/     Contact and wholesale enquiry endpoint
  components/          Shared UI, cart provider, forms and drawer
  data/                Catalogue, collections and legal content
  lib/                 Catalogue access, validation, email, guards
public/
  assets/              Brand imagery, fonts and video
```
