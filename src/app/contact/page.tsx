import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact the Maison',
  description:
    'Questions about a product, a wholesale order request, a collaboration or the collection? Write to Maison Asili and we will reply personally.'
};

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
            Questions about a product, a wholesale order request, a collaboration or the collection? Write to us and we
            will come back to you personally.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="border border-outline-variant bg-surface-container-lowest p-6 sm:p-8 lg:col-span-7">
            <h2 className="mb-6 border-b border-outline-variant pb-4 font-headline text-sm font-semibold uppercase tracking-[0.2em] text-on-surface">
              Send a message
            </h2>
            <ContactForm />
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
                    <span className="text-on-surface">Berlin, Germany</span>
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
                The street address, telephone number and opening hours will be published here once they have been
                confirmed by Maison Asili.
              </p>
            </div>

            <div className="border border-outline-variant bg-surface-container-lowest p-6 sm:p-7">
              <h2 className="mb-4 font-headline text-sm font-semibold uppercase tracking-[0.2em] text-on-surface">
                Follow the Maison
              </h2>
              <p className="text-[11px] leading-relaxed text-on-surface-variant">
                Official Maison Asili social channels will be linked here once they are confirmed.
              </p>
            </div>

            <div className="bg-charcoal p-6 sm:p-7">
              <h2 className="mb-2 font-headline text-xl text-white">Buying for a business?</h2>
              <p className="mb-4 text-xs leading-relaxed text-white/70">
                Delicatessens, restaurants, hotels and distributors can submit a wholesale enquiry and request trade
                pricing.
              </p>
              <Link
                href="/wholesale"
                className="inline-flex items-center gap-2 bg-brand-gold px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-charcoal transition-colors hover:bg-on-primary"
              >
                Wholesale Enquiry
                <span aria-hidden="true" className="material-symbols-outlined text-sm">
                  north_east
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
