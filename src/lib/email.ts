import 'server-only';

import { Resend } from 'resend';

export interface EmailMessage {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export class EmailConfigurationError extends Error {}
export class EmailDeliveryError extends Error {}

function splitRecipients(value: string | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function orderNotificationRecipients(): string[] {
  const configured = splitRecipients(process.env.ORDER_NOTIFICATION_EMAIL);
  return configured.length > 0 ? configured : ['info@maisonasili.com'];
}

export function enquiryNotificationRecipients(): string[] {
  const configured = splitRecipients(process.env.ENQUIRY_NOTIFICATION_EMAIL);
  return configured.length > 0 ? configured : orderNotificationRecipients();
}

function emailFrom(): string {
  return process.env.ORDER_FROM_EMAIL?.trim() ?? '';
}

/**
 * Sends a transactional email through Resend.
 *
 * `EMAIL_TRANSPORT=log` is an explicit development-only switch that records the
 * message in the server log instead of delivering it. It is ignored in
 * production so a deployment can never silently pretend to send email.
 */
export async function sendEmail(message: EmailMessage): Promise<{ id: string | null; simulated: boolean }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = emailFrom();
  const logTransport = process.env.EMAIL_TRANSPORT?.trim().toLowerCase() === 'log';
  const simulate = !apiKey && logTransport && process.env.NODE_ENV !== 'production';

  if (simulate) {
    console.info(
      '[email:log] outbound message recorded (EMAIL_TRANSPORT=log)',
      JSON.stringify({
        to: message.to,
        from: from || 'not-configured',
        subject: message.subject,
        replyTo: message.replyTo,
        text: message.text
      })
    );
    return { id: null, simulated: true };
  }

  if (!apiKey) {
    throw new EmailConfigurationError('RESEND_API_KEY is not configured on the server.');
  }
  if (!from) {
    throw new EmailConfigurationError('ORDER_FROM_EMAIL is not configured on the server.');
  }

  const resend = new Resend(apiKey);
  const response = await resend.emails.send({
    from,
    to: message.to,
    subject: message.subject,
    html: message.html,
    text: message.text,
    ...(message.replyTo ? { replyTo: message.replyTo } : {})
  });

  if (response.error) {
    throw new EmailDeliveryError(response.error.message || response.error.name || 'Email provider rejected the message.');
  }

  return { id: response.data?.id ?? null, simulated: false };
}
