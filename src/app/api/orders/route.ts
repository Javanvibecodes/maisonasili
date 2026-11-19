import { NextResponse } from 'next/server';
import {
  checkRateLimit,
  clientAddress,
  createReference,
  isAllowedOrigin,
  isHoneypotTripped
} from '@/lib/api-guards';
import {
  EmailConfigurationError,
  EmailDeliveryError,
  orderNotificationRecipients,
  sendEmail
} from '@/lib/email';
import {
  buildOrderAcknowledgementEmail,
  buildOrderNotificationEmail,
  resolveOrderLines
} from '@/lib/order-emails';
import { validateOrderRequest } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function failure(status: number, message: string, errors?: Record<string, string>) {
  return NextResponse.json({ ok: false, message, ...(errors ? { errors } : {}) }, { status });
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return failure(403, 'This request could not be verified. Please reload the page and try again.');
  }

  if (!checkRateLimit(`order:${clientAddress(request)}`)) {
    return failure(429, 'Too many order requests were submitted from this connection. Please wait a few minutes and try again.');
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return failure(400, 'The order request could not be read. Please reload the page and try again.');
  }

  const source = typeof payload === 'object' && payload !== null ? (payload as Record<string, unknown>) : {};
  if (isHoneypotTripped(source.companyWebsiteConfirm)) {
    return failure(400, 'The order request could not be processed.');
  }

  const validated = validateOrderRequest(payload);
  if (!validated.ok) {
    return failure(422, 'Please check the highlighted fields and submit the request again.', validated.errors);
  }

  const lines = resolveOrderLines(validated.value.items);
  if (lines.length === 0) {
    return failure(422, 'None of the selected products are available in the catalogue.', {
      items: 'Please return to the collection and add products again.'
    });
  }

  const context = {
    reference: createReference('MA'),
    submittedAt: new Date(),
    request: validated.value,
    lines
  };

  try {
    const notification = buildOrderNotificationEmail(context);
    await sendEmail({
      to: orderNotificationRecipients(),
      ...notification,
      replyTo: validated.value.email
    });
  } catch (error) {
    if (error instanceof EmailConfigurationError) {
      console.error('[orders] email delivery is not configured:', error.message);
      return failure(
        503,
        'Online order requests are not available yet because email delivery has not been configured. Please write to info@maisonasili.com in the meantime.'
      );
    }

    console.error(
      '[orders] internal notification failed:',
      error instanceof EmailDeliveryError ? error.message : error instanceof Error ? error.name : 'unknown error'
    );
    return failure(
      502,
      'We could not deliver your order request just now. Your order cart has been kept — please try again in a moment.'
    );
  }

  // The internal notification is the record of the request. If the retailer
  // acknowledgement fails we still report success, but say so honestly.
  let acknowledgementSent = true;
  try {
    const acknowledgement = buildOrderAcknowledgementEmail(context);
    await sendEmail({
      to: validated.value.email,
      ...acknowledgement,
      replyTo: orderNotificationRecipients()[0]
    });
  } catch (error) {
    acknowledgementSent = false;
    console.error(
      '[orders] retailer acknowledgement failed:',
      error instanceof EmailDeliveryError ? error.message : error instanceof Error ? error.name : 'unknown error'
    );
  }

  return NextResponse.json({
    ok: true,
    reference: context.reference,
    acknowledgementSent,
    message: acknowledgementSent
      ? 'Your wholesale order request has been received. An acknowledgement has been sent to your email address.'
      : 'Your wholesale order request has been received. We could not send the acknowledgement email, but our team has your request and will follow up directly.'
  });
}
