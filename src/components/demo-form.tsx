'use client';

import * as React from 'react';

type FormKind = 'newsletter' | 'contact' | 'wholesale';

interface DemoFormProps {
  kind: FormKind;
  className?: string;
  messageClassName?: string;
  children: React.ReactNode;
}

const messages: Record<FormKind, (name: string, email: string) => string> = {
  newsletter: (_, email) =>
    `Thank you — ${email} has been noted for this demonstration. No email was sent and no list was updated.`,
  contact: (name) =>
    `Thank you, ${name}. Your message was validated in the browser only — nothing was transmitted to Maison Asili.`,
  wholesale: (name) =>
    `Thank you, ${name}. Your enquiry has been validated in the browser only — nothing was sent to Maison Asili.`
};

export function DemoForm({ kind, className = '', messageClassName = 'text-tertiary', children }: DemoFormProps) {
  const [message, setMessage] = React.useState<string | null>(null);
  const [sameAsBefore, setSameAsBefore] = React.useState(0);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const name = String(data.get('name') ?? 'there').trim() || 'there';
    const email = String(data.get('email') ?? '').trim();
    setMessage(messages[kind](name, email));
    setSameAsBefore((value) => value + 1);
    form.reset();
  }

  return (
    <form className={className} noValidate onSubmit={handleSubmit}>
      {children}
      <p
        role="status"
        aria-live="polite"
        data-demo-form-message
        data-submissions={sameAsBefore}
        className={`text-xs leading-relaxed ${messageClassName}`}
        hidden={!message}
      >
        {message}
      </p>
    </form>
  );
}
