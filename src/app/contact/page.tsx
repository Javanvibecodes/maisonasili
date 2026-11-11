import type { Metadata } from 'next';
import Link from 'next/link';
import { DemoForm } from '@/components/demo-form';

export const metadata: Metadata = {
  title: 'Contact the Maison',
  description: 'Questions about a product, an order, a collaboration or the wholesale pantry? Write to Maison Asili.'
};

const inputClass =
  'border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-tertiary focus:outline-none';
const labelClass = 'text-[11px] font-semibold uppercase tracking-[0.2em] text-on-surface';

export default function ContactPage() {
  return (
    <main className="w-full bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant"
        >
          <Link href="/" className="transition-colors hover:text-on-surface">
            Home
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="font-semibold text-on-surface">Contact</span>
        </nav>

        <div className="max-w-3xl">
          <h1 className="mb-5 font-headline text-4xl font-light tracking-tight text-on-surface sm:text-5xl">
            Contact the Maison
          </h1>
          <p className="text-sm font-light leading-relaxed text-on-surface-variant sm:text-base">
            Questions about a product, an order, a collaboration or the wholesale pantry? Write to us and we will come
            back to you personally.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="border border-outline-variant bg-surface-container-lowest p-6 sm:p-8 lg:col-span-7">
            <h2 className="mb-6 border-b border-outline-variant pb-4 font-headline text-sm font-semibold uppercase tracking-[0.2em] text-on-surface">
              Send a message
            </h2>
            <DemoForm kind="contact" className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className={labelClass}>
                    Full name <span className="text-tertiary">*</span>
                  </span>
                  <input name="name" type="text" required placeholder="Your full name" className={inputClass} />
                </label>
                <label className="flex flex-col gap-2">
                  <span className={labelClass}>
                    Email <span className="text-tertiary">*</span>
                  </span>
                  <input name="email" type="email" required placeholder="you@example.com" className={inputClass} />
                </label>
              </div>
              <label className="flex flex-col gap-2">
                <span className={labelClass}>Subject</span>
                <select name="subject" className={inputClass} defaultValue="Product question">
                  <option>Product question</option>
                  <option>Order question</option>
                  <option>Wholesale &amp; hospitality</option>
                  <option>Press &amp; collaboration</option>
                  <option>Something else</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className={labelClass}>
                  Message <span className="text-tertiary">*</span>
                </span>
                <textarea
                  name="message"
                  required
                  placeholder="How can we help?"
                  className={`${inputClass} min-h-[150px] resize-y`}
                />
              </label>
              <button
                type="submit"
                className="self-start bg-on-surface px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-surface-container-lowest transition-colors hover:bg-primary"
              >
                Send Message
              </button>
            </DemoForm>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="border border-outline-variant bg-surface-container-lowest p-6 sm:p-7">
              <h2 className="mb-5 font-headline text-sm font-semibold uppercase tracking-[0.2em] text-on-surface">
                Direct
              </h2>
              <div className="flex flex-col gap-5 text-sm">
                <div className="flex items-start gap-4">
                  <span aria-hidden="true" className="material-symbols-outlined text-xl text-tertiary">
                    mail
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
                      Buyer &amp; general enquiries
                    </span>
                    <a
                      href="mailto:info@maisonasili.com"
                      className="font-medium text-on-surface transition-colors hover:text-tertiary"
                    >
                      info@maisonasili.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span aria-hidden="true" className="material-symbols-outlined text-xl text-tertiary">
                    location_on
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">Atelier</span>
                    <span className="text-on-surface">
                      Berlin, Germany <span className="text-outline">—</span> full address pending
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span aria-hidden="true" className="material-symbols-outlined text-xl text-tertiary">
                    schedule
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
                      Response time
                    </span>
                    <span className="text-on-surface">Usually within two working days</span>
                  </div>
                </div>
              </div>
              <p className="mt-5 border-t border-outline-variant pt-5 text-[11px] leading-relaxed text-on-surface-variant">
                Telephone, opening hours and street address have not been provided yet and are intentionally left as
                placeholders rather than invented.
              </p>
            </div>

            <div className="border border-outline-variant bg-surface-container-lowest p-6 sm:p-7">
              <h2 id="social" className="mb-4 font-headline text-sm font-semibold uppercase tracking-[0.2em] text-on-surface">
                Follow the Maison
              </h2>
              <div className="flex flex-wrap gap-3">
                {['Instagram', 'Facebook', 'Pinterest'].map((social) => (
                  <button
                    key={social}
                    type="button"
                    title="Placeholder — official account to be linked"
                    className="cursor-not-allowed border border-outline-variant px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] text-on-surface-variant"
                  >
                    {social}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-on-surface-variant">
                Social accounts are placeholders in this demonstration — official handles will be linked here.
              </p>
            </div>

            <div className="bg-charcoal p-6 sm:p-7">
              <h2 className="mb-2 font-headline text-xl text-white">An invitation to our table</h2>
              <p className="mb-4 text-xs leading-relaxed text-white/70">
                Seasonal arrivals, small-batch releases and invitations to Berlin tastings.
              </p>
              <DemoForm
                kind="newsletter"
                className="flex flex-col gap-2"
                messageClassName="text-[11px] leading-relaxed text-brand-gold"
              >
                <label className="sr-only" htmlFor="contact-newsletter-email">
                  Email address
                </label>
                <input
                  id="contact-newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="min-w-0 flex-1 bg-surface-container-lowest px-4 py-3 text-xs text-on-surface placeholder:text-outline focus:outline-none"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap bg-brand-gold px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-charcoal transition-colors hover:bg-on-primary"
                >
                  Subscribe
                </button>
              </DemoForm>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
