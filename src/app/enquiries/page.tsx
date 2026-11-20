import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Enquiries & Partnerships',
  description:
    'Ahead of our online store launch, Maison Asili’s small-batch spice blends, finishing salts, rare African teas and culinary oils are available via private order enquiries, select Berlin market pop-ups and bespoke partnerships.'
};

export default function EnquiriesPage() {
  return (
    <main className="w-full bg-background">
      <div className="mx-auto w-full max-w-3xl px-6 py-8 lg:px-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant"
        >
          <Link href="/" className="transition-colors hover:text-on-surface">
            Home
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="font-semibold text-on-surface">Enquiries</span>
        </nav>

        <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-tertiary">Enquiries &amp; Partnerships</p>

        <h1 className="mt-5 font-headline text-4xl font-light leading-[1.08] tracking-tight text-on-surface sm:text-5xl">
          Exceptional Ingredients for Discerning Tables
        </h1>

        <p className="mt-8 text-sm font-light leading-[1.85] text-on-surface-variant sm:text-base">
          Ahead of our online store launch, Maison Asili&rsquo;s small-batch spice blends, finishing salts, rare African
          teas, and culinary oils are available via private order enquiries, select Berlin market pop-ups, and bespoke
          partnerships (
          <a
            href="mailto:info@maisonasili.com"
            className="font-medium text-primary underline underline-offset-2 transition-colors hover:text-tertiary"
          >
            info@maisonasili.com
          </a>
          ).
        </p>

        <div className="mt-10 h-px w-12 bg-brand-gold" />

        <Link
          href="/shop"
          className="mt-10 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-on-surface transition-colors hover:text-tertiary"
        >
          Explore the Collection
          <span aria-hidden="true" className="material-symbols-outlined text-sm">
            north_east
          </span>
        </Link>
      </div>
    </main>
  );
}
