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
  enquiryNotificationRecipients,
  sendEmail
} from '@/lib/email';
import {
  buildEnquiryAcknowledgementEmail,
  buildEnquiryNotificationEmail
} from '@/lib/order-emails';
import { validateEnquiry } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function failure(status: number, message: string, errors?: Record<string, string>) {
  return NextResponse.json({ ok: false, message, ...(errors ? { errors } : {}) }, { status });
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return failure(403, 'This request could not be verified. Please reload the page and try again.');
  }

  if (!checkRateLimit(`enquiry:${clientAddress(request)}`)) {
    return failure(429, 'Too many messages were sent from this connection. Please wait a few minutes and try again.');
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return failure(400, 'The enquiry could not be read. Please reload the page and try again.');
  }

  const source = typeof payload === 'object' && payload !== null ? (payload as Record<string, unknown>) : {};
  if (isHoneypotTripped(source.companyWebsiteConfirm)) {
    return failure(400, 'The enquiry could not be processed.');
  }

  const validated = validateEnquiry(payload);
  if (!validated.ok) {
    return failure(422, 'Please check the highlighted fields and send the message again.', validated.errors);
  }

  const context = {
    reference: createReference('ENQ'),
    submittedAt: new Date(),
    request: validated.value
  };

  try {
    const notification = buildEnquiryNotificationEmail(context);
    await sendEmail({
      to: enquiryNotificationRecipients(),
      ...notification,
      replyTo: validated.value.email
    });
  } catch (error) {
    if (error instanceof EmailConfigurationError) {
      console.error('[enquiries] email delivery is not configured:', error.message);
      return failure(
        503,
        'Online messages are not available yet because email delivery has not been configured. Please write to info@maisonasili.com in the meantime.'
      );
    }

    console.error(
      '[enquiries] internal notification failed:',
      error instanceof EmailDeliveryError ? error.message : error instanceof Error ? error.name : 'unknown error'
    );
    return failure(502, 'We could not send your message just now. Please try again in a moment.');
  }

  let acknowledgementSent = true;
  try {
    const acknowledgement = buildEnquiryAcknowledgementEmail(context);
    await sendEmail({
      to: validated.value.email,
      ...acknowledgement,
      replyTo: enquiryNotificationRecipients()[0]
    });
  } catch (error) {
    acknowledgementSent = false;
    console.error(
      '[enquiries] acknowledgement failed:',
      error instanceof EmailDeliveryError ? error.message : error instanceof Error ? error.name : 'unknown error'
    );
  }

  return NextResponse.json({
    ok: true,
    reference: context.reference,
    acknowledgementSent,
    message: acknowledgementSent
      ? 'Thank you — your message has been sent. We will reply personally.'
      : 'Thank you — your message has been received. We could not send an acknowledgement email, but our team will reply personally.'
  });
}
