import { collectionName, getProduct, type Product } from '@/lib/catalog';
import type { EnquiryInput, OrderRequestInput } from '@/lib/validation';

const BRAND = {
  plum: '#210B36',
  gold: '#D4B58C',
  sand: '#F4EFE6',
  ink: '#171122',
  muted: '#5A5264',
  line: '#E2D9CE'
} as const;

const CONTACT_EMAIL = 'info@maisonasili.com';

export interface ResolvedOrderLine {
  product: Product;
  qty: number;
}

export interface OrderEmailContext {
  reference: string;
  submittedAt: Date;
  request: OrderRequestInput;
  lines: ResolvedOrderLine[];
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatSubmittedAt(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin'
  }).format(date);
}

export function resolveOrderLines(items: { slug: string; qty: number }[]): ResolvedOrderLine[] {
  return items.flatMap((item) => {
    const product = getProduct(item.slug);
    return product ? [{ product, qty: item.qty }] : [];
  });
}

function productTable(lines: ResolvedOrderLine[]): string {
  const rows = lines
    .map(
      (line) => `
        <tr>
          <td style="padding:12px 10px;border-bottom:1px solid ${BRAND.line};font-family:Georgia,'Times New Roman',serif;font-size:15px;color:${BRAND.ink};">${escapeHtml(line.product.name)}</td>
          <td style="padding:12px 10px;border-bottom:1px solid ${BRAND.line};font-size:13px;color:${BRAND.muted};">${escapeHtml(collectionName(line.product.category))}</td>
          <td style="padding:12px 10px;border-bottom:1px solid ${BRAND.line};font-size:13px;color:${BRAND.muted};">${escapeHtml(line.product.size)}</td>
          <td style="padding:12px 10px;border-bottom:1px solid ${BRAND.line};font-size:13px;color:${BRAND.ink};text-align:right;font-weight:bold;">${line.qty}</td>
        </tr>`
    )
    .join('');

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:8px 0 4px;">
      <thead>
        <tr>
          <th align="left" style="padding:8px 10px;border-bottom:2px solid ${BRAND.plum};font-size:10px;letter-spacing:1.6px;text-transform:uppercase;color:${BRAND.muted};">Product</th>
          <th align="left" style="padding:8px 10px;border-bottom:2px solid ${BRAND.plum};font-size:10px;letter-spacing:1.6px;text-transform:uppercase;color:${BRAND.muted};">Collection</th>
          <th align="left" style="padding:8px 10px;border-bottom:2px solid ${BRAND.plum};font-size:10px;letter-spacing:1.6px;text-transform:uppercase;color:${BRAND.muted};">Size / pack</th>
          <th align="right" style="padding:8px 10px;border-bottom:2px solid ${BRAND.plum};font-size:10px;letter-spacing:1.6px;text-transform:uppercase;color:${BRAND.muted};">Qty</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function detailRow(label: string, value: string): string {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:5px 0;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:${BRAND.muted};width:38%;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:5px 0;font-size:14px;color:${BRAND.ink};vertical-align:top;">${escapeHtml(value)}</td>
    </tr>`;
}

function shell(title: string, eyebrow: string, body: string, footerNote: string): string {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:${BRAND.sand};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.sand};padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:1px solid ${BRAND.line};">
            <tr>
              <td style="background:${BRAND.plum};padding:26px 32px;">
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:20px;letter-spacing:5px;text-transform:uppercase;color:${BRAND.gold};">Maison Asili</div>
                <div style="margin-top:6px;font-size:10px;letter-spacing:2.6px;text-transform:uppercase;color:#F8F0E6;opacity:.75;">Rooted in Africa. Born in Berlin. For the World.</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <div style="font-size:10px;letter-spacing:2.6px;text-transform:uppercase;color:#7C5A2E;font-weight:bold;">${escapeHtml(eyebrow)}</div>
                <h1 style="margin:10px 0 22px;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.2;font-weight:normal;color:${BRAND.plum};">${escapeHtml(title)}</h1>
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid ${BRAND.line};background:#FAF7F2;">
                <p style="margin:0;font-size:11px;line-height:1.7;color:${BRAND.muted};">${footerNote}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildOrderNotificationEmail(context: OrderEmailContext): {
  subject: string;
  html: string;
  text: string;
} {
  const { reference, submittedAt, request, lines } = context;
  const submitted = formatSubmittedAt(submittedAt);

  const body = `
    <p style="margin:0 0 18px;font-size:14px;line-height:1.7;color:${BRAND.ink};">
      A retailer has submitted a wholesale order request through the Maison Asili website.
      This message is a request for a trade quotation and availability check — it is not a confirmed sale.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px;border:1px solid ${BRAND.line};background:#FAF7F2;">
      <tr>
        <td style="padding:14px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${detailRow('Order reference', reference)}
            ${detailRow('Submitted', `${submitted} (Europe/Berlin)`)}
          </table>
        </td>
      </tr>
    </table>

    <h2 style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.muted};">Retailer details</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      ${detailRow('Business', request.businessName)}
      ${detailRow('Contact', request.contactName)}
      ${detailRow('Email', request.email)}
      ${detailRow('Phone', request.phone)}
      ${detailRow('Business type', request.businessType)}
      ${detailRow('Country', request.country)}
      ${detailRow('City', request.city)}
      ${detailRow('Delivery address', request.deliveryAddress)}
      ${detailRow('Website', request.website)}
      ${detailRow('Preferred fulfilment', request.fulfilment)}
    </table>

    <h2 style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.muted};">Requested products</h2>
    ${productTable(lines)}
    <p style="margin:10px 0 24px;font-size:11px;color:${BRAND.muted};">
      ${lines.length} ${lines.length === 1 ? 'product line' : 'product lines'} requested. No prices were submitted with this request.
    </p>

    ${
      request.notes
        ? `<h2 style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.muted};">Retailer notes</h2>
           <div style="margin:0 0 8px;padding:14px 16px;border-left:3px solid ${BRAND.gold};background:#FAF7F2;font-size:14px;line-height:1.7;color:${BRAND.ink};white-space:pre-wrap;">${escapeHtml(request.notes)}</div>`
        : ''
    }

    <p style="margin:22px 0 0;font-size:12px;line-height:1.7;color:${BRAND.muted};">
      Reply directly to this email to answer ${escapeHtml(request.contactName)} at ${escapeHtml(request.businessName)}.
    </p>`;

  const text = [
    'MAISON ASILI — WHOLESALE ORDER REQUEST',
    'This is a request for a trade quotation, not a confirmed sale.',
    '',
    `Order reference: ${reference}`,
    `Submitted: ${submitted} (Europe/Berlin)`,
    '',
    'RETAILER DETAILS',
    `Business: ${request.businessName}`,
    `Contact: ${request.contactName}`,
    `Email: ${request.email}`,
    request.phone ? `Phone: ${request.phone}` : '',
    `Business type: ${request.businessType}`,
    `Country: ${request.country}`,
    `City: ${request.city}`,
    request.deliveryAddress ? `Delivery address: ${request.deliveryAddress}` : '',
    request.website ? `Website: ${request.website}` : '',
    request.fulfilment ? `Preferred fulfilment: ${request.fulfilment}` : '',
    '',
    'REQUESTED PRODUCTS',
    ...lines.map(
      (line) =>
        `- ${line.product.name} | ${collectionName(line.product.category)} | ${line.product.size} | qty ${line.qty}`
    ),
    '',
    request.notes ? `RETAILER NOTES\n${request.notes}` : '',
    '',
    `Reply directly to this email to reach ${request.contactName}.`
  ]
    .filter((line) => line !== '')
    .join('\n');

  return {
    subject: `Wholesale Order Request ${reference} — ${request.businessName}`,
    html: shell(
      'New wholesale order request',
      'Wholesale Order Request',
      body,
      `Internal notification from maisonasili.com. This request has not been commercially accepted. Trade pricing, availability and fulfilment must be confirmed directly with the retailer.`
    ),
    text
  };
}

export function buildOrderAcknowledgementEmail(context: OrderEmailContext): {
  subject: string;
  html: string;
  text: string;
} {
  const { reference, request, lines } = context;

  const body = `
    <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:${BRAND.ink};">
      Dear ${escapeHtml(request.contactName)},
    </p>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:${BRAND.ink};">
      Thank you for your interest in Maison Asili. We have received the wholesale order request from
      <strong>${escapeHtml(request.businessName)}</strong>.
    </p>
    <p style="margin:0 0 22px;font-size:14px;line-height:1.7;color:${BRAND.ink};">
      This email acknowledges receipt of your request. It is not an order confirmation: availability, trade pricing
      and fulfilment terms will be confirmed with you personally.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border:1px solid ${BRAND.line};background:#FAF7F2;">
      <tr>
        <td style="padding:14px 16px;font-size:13px;color:${BRAND.ink};">
          <strong style="letter-spacing:1.4px;text-transform:uppercase;font-size:10px;color:${BRAND.muted};">Your reference</strong><br />
          <span style="font-family:Georgia,'Times New Roman',serif;font-size:20px;color:${BRAND.plum};">${escapeHtml(reference)}</span>
        </td>
      </tr>
    </table>

    <h2 style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.muted};">Your request</h2>
    ${productTable(lines)}

    <h2 style="margin:24px 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.muted};">What happens next</h2>
    <ol style="margin:0 0 8px;padding-left:20px;font-size:14px;line-height:1.8;color:${BRAND.ink};">
      <li>We review product availability for the quantities you requested.</li>
      <li>We prepare trade pricing and fulfilment details for your business.</li>
      <li>We contact you to confirm the commercial terms before anything is dispatched.</li>
    </ol>

    <p style="margin:22px 0 0;font-size:13px;line-height:1.7;color:${BRAND.muted};">
      If you did not submit this request, or if anything above needs correcting, please write to
      <a href="mailto:${CONTACT_EMAIL}" style="color:#7C5A2E;">${CONTACT_EMAIL}</a>.
    </p>`;

  const text = [
    'MAISON ASILI',
    '',
    `Dear ${request.contactName},`,
    '',
    `Thank you for your interest in Maison Asili. We have received the wholesale order request from ${request.businessName}.`,
    '',
    'This email acknowledges receipt of your request. It is not an order confirmation: availability, trade pricing and fulfilment terms will be confirmed with you personally.',
    '',
    `Your reference: ${reference}`,
    '',
    'YOUR REQUEST',
    ...lines.map(
      (line) => `- ${line.product.name} | ${line.product.size} | qty ${line.qty}`
    ),
    '',
    'WHAT HAPPENS NEXT',
    '1. We review product availability for the quantities you requested.',
    '2. We prepare trade pricing and fulfilment details for your business.',
    '3. We contact you to confirm the commercial terms before anything is dispatched.',
    '',
    `If you did not submit this request, please write to ${CONTACT_EMAIL}.`,
    '',
    'Maison Asili — Rooted in Africa. Born in Berlin. For the World.'
  ].join('\n');

  return {
    subject: `We have received your wholesale order request — ${reference}`,
    html: shell(
      'We have received your order request',
      'Order Request Received',
      body,
      `Maison Asili · Buyer enquiries: ${CONTACT_EMAIL}. This acknowledgement confirms receipt of a request only; no order has been accepted, dispatched or paid for.`
    ),
    text
  };
}

export interface EnquiryEmailContext {
  reference: string;
  submittedAt: Date;
  request: EnquiryInput;
}

export function buildEnquiryNotificationEmail(context: EnquiryEmailContext): {
  subject: string;
  html: string;
  text: string;
} {
  const { reference, submittedAt, request } = context;
  const isWholesale = request.kind === 'wholesale';
  const heading = isWholesale ? 'New wholesale enquiry' : 'New website enquiry';
  const submitted = formatSubmittedAt(submittedAt);

  const body = `
    <p style="margin:0 0 20px;font-size:14px;line-height:1.7;color:${BRAND.ink};">
      A new enquiry was submitted through the Maison Asili website.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px;border:1px solid ${BRAND.line};background:#FAF7F2;">
      <tr>
        <td style="padding:14px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${detailRow('Reference', reference)}
            ${detailRow('Submitted', `${submitted} (Europe/Berlin)`)}
            ${detailRow('Type', isWholesale ? 'Wholesale & hospitality' : request.subject)}
          </table>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      ${detailRow('Name', request.name)}
      ${detailRow('Email', request.email)}
      ${detailRow('Phone', request.phone)}
      ${detailRow('Business', request.businessName)}
      ${detailRow('Business type', request.businessType)}
      ${detailRow('Country', request.country)}
      ${detailRow('Product interests', request.interests.join(', '))}
      ${detailRow('Estimated volume', request.volume)}
    </table>

    <h2 style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.muted};">Message</h2>
    <div style="margin:0;padding:14px 16px;border-left:3px solid ${BRAND.gold};background:#FAF7F2;font-size:14px;line-height:1.7;color:${BRAND.ink};white-space:pre-wrap;">${escapeHtml(request.message)}</div>`;

  const text = [
    isWholesale ? 'MAISON ASILI — WHOLESALE ENQUIRY' : 'MAISON ASILI — WEBSITE ENQUIRY',
    '',
    `Reference: ${reference}`,
    `Submitted: ${submitted} (Europe/Berlin)`,
    `Type: ${isWholesale ? 'Wholesale & hospitality' : request.subject}`,
    '',
    `Name: ${request.name}`,
    `Email: ${request.email}`,
    request.phone ? `Phone: ${request.phone}` : '',
    request.businessName ? `Business: ${request.businessName}` : '',
    request.businessType ? `Business type: ${request.businessType}` : '',
    request.country ? `Country: ${request.country}` : '',
    request.interests.length ? `Product interests: ${request.interests.join(', ')}` : '',
    request.volume ? `Estimated volume: ${request.volume}` : '',
    '',
    'MESSAGE',
    request.message
  ]
    .filter((line) => line !== '')
    .join('\n');

  return {
    subject: `${isWholesale ? 'Wholesale enquiry' : 'Website enquiry'} ${reference} — ${request.name}`,
    html: shell(heading, isWholesale ? 'Wholesale Enquiry' : 'Website Enquiry', body, 'Internal notification from maisonasili.com.'),
    text
  };
}

export function buildEnquiryAcknowledgementEmail(context: EnquiryEmailContext): {
  subject: string;
  html: string;
  text: string;
} {
  const { reference, request } = context;
  const isWholesale = request.kind === 'wholesale';

  const body = `
    <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:${BRAND.ink};">Dear ${escapeHtml(request.name)},</p>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:${BRAND.ink};">
      Thank you for writing to Maison Asili. We have received your ${isWholesale ? 'wholesale enquiry' : 'message'} and a member of our team will reply personally.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px;border:1px solid ${BRAND.line};background:#FAF7F2;">
      <tr>
        <td style="padding:14px 16px;font-size:13px;color:${BRAND.ink};">
          <strong style="letter-spacing:1.4px;text-transform:uppercase;font-size:10px;color:${BRAND.muted};">Your reference</strong><br />
          <span style="font-family:Georgia,'Times New Roman',serif;font-size:20px;color:${BRAND.plum};">${escapeHtml(reference)}</span>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 8px;font-size:14px;line-height:1.7;color:${BRAND.ink};">
      If your message is urgent, you can also reach us at
      <a href="mailto:${CONTACT_EMAIL}" style="color:#7C5A2E;">${CONTACT_EMAIL}</a>.
    </p>`;

  const text = [
    'MAISON ASILI',
    '',
    `Dear ${request.name},`,
    '',
    `Thank you for writing to Maison Asili. We have received your ${isWholesale ? 'wholesale enquiry' : 'message'} and a member of our team will reply personally.`,
    '',
    `Your reference: ${reference}`,
    '',
    `If your message is urgent, you can also reach us at ${CONTACT_EMAIL}.`,
    '',
    'Maison Asili — Rooted in Africa. Born in Berlin. For the World.'
  ].join('\n');

  return {
    subject: `We have received your enquiry — ${reference}`,
    html: shell('We have received your enquiry', 'Enquiry Received', body, `Maison Asili · Buyer enquiries: ${CONTACT_EMAIL}.`),
    text
  };
}
