import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CollectionCards } from '@/components/collection-cards';

export const metadata: Metadata = {
  title: 'Maison Asili — Afro-Gourmet Product House',
  description:
    'An Afro-Gourmet product house rooted in Africa and born in Berlin: heritage spice blends, botanical salts, rare African teas and cold-pressed culinary oils. Explore the collection and send a private or trade enquiry.'
};

/**
 * Upcoming Berlin market dates and locations.
 * Add confirmed entries here once contracts are signed, e.g.
 * { name: 'Markthalle Neun', dates: 'Every Thursday' }.
 * Nothing is rendered while the list is empty.
 */
const berlinMarkets: { name: string; dates: string }[] = [];

export default function HomePage() {
  return (
    <main className="relative w-full">
      {/* ── Hero banner — shown in full at every width; the page body follows immediately ── */}
      <section className="w-full bg-primary" aria-label="Maison Asili — Origin. Identity. Heritage.">
        <Image
          src="/assets/img/hero-banner-actual.jpg"
          alt="Maison Asili — Afro-Gourmet Fusion: spices, oils, teas and coffee. Origin. Identity. Heritage."
          width={2752}
          height={1536}
          priority
          sizes="100vw"
          className="block h-auto w-full"
        />

        <div className="flex w-full flex-row items-stretch gap-2 px-4 py-5 sm:items-center sm:justify-center sm:gap-3 sm:px-8 sm:py-6 lg:px-12">
          <Link
            href="/shop"
            className="flex min-h-[44px] flex-1 items-center justify-center whitespace-nowrap rounded-sm bg-brand-gold px-2 py-3 text-center font-sans text-[10px] font-semibold uppercase leading-tight tracking-[0.08em] text-charcoal shadow-md transition-colors hover:bg-white hover:text-charcoal sm:flex-none sm:px-7 sm:text-xs sm:tracking-[0.2em]"
          >
            Explore the Collection
          </Link>
          <Link
            href="/heritage"
            className="flex min-h-[44px] flex-1 items-center justify-center whitespace-nowrap rounded-sm border border-brand-gold/40 bg-transparent px-2 py-3 text-center font-sans text-[10px] font-medium uppercase leading-tight tracking-[0.08em] text-white transition-colors hover:border-brand-gold hover:bg-brand-gold/10 sm:flex-none sm:px-7 sm:text-xs sm:tracking-[0.2em]"
          >
            Discover Our Heritage
          </Link>
        </div>
      </section>

      {/* ── Content layer ── */}
      <div id="curtain-content" className="relative bg-surface-container-lowest text-on-surface">
        {/* Intro Editorial */}
        <section className="w-full px-5 pb-7 pt-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <div className="mb-9 flex flex-col items-center text-center sm:mb-11">
              <p className="font-headline text-2xl font-medium uppercase leading-none tracking-[0.32em] text-gold sm:text-3xl sm:tracking-[0.4em]">
                House of Asili
              </p>
              <div className="mt-6 h-px w-12 bg-gold/40 sm:mt-7 sm:w-16" />
            </div>
            <div className="mx-auto max-w-3xl space-y-4 font-body text-sm font-light leading-relaxed tracking-normal text-on-surface-variant sm:space-y-6 sm:text-base lg:text-lg">
              <p className="editorial-lead">
                Maison Asili brings together distinctive African spices, rare botanicals, botanical salts, fine teas and
                carefully crafted culinary oils. Inspired by ingredients, traditions and flavours from across the
                continent, each creation is an expression of discovery, craftsmanship and contemporary Afro-Gourmet
                Fusion.
              </p>
              <p>
                From familiar favourites to ingredients yet to be discovered, our collection invites you to explore new
                dimensions of flavour, awaken the senses and experience the richness of Africa's culinary heritage.
              </p>
              <p className="font-semibold text-primary">Rooted in Africa. Born in Berlin. For the World.</p>
            </div>
          </div>
        </section>

        {/* Collections Section */}
        <section className="mx-auto w-full max-w-7xl px-5 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-10 lg:px-12">
          <div className="mb-4 sm:mb-8">
            <h2 className="font-sans text-2xl font-light uppercase tracking-tight text-on-surface sm:text-4xl lg:text-5xl">
              Explore Our Collections
            </h2>
          </div>

          <CollectionCards />
        </section>

        {/* A World of Flavour */}
        <section className="w-full bg-surface-container-low px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-tertiary sm:mb-4 sm:h-11 sm:w-11">
              <span aria-hidden="true" className="material-symbols-outlined text-xl sm:text-2xl">
                public
              </span>
            </div>
            <h2 className="mb-2.5 font-sans text-xl font-light uppercase tracking-tight text-on-surface sm:text-2xl lg:text-3xl">
              A World of Flavour
            </h2>
            <p className="mx-auto max-w-2xl text-xs font-light leading-relaxed text-on-surface-variant sm:text-sm">
              Conceived as a contemporary Afro-Gourmet dialogue, our ingredients are composed to inspire modern
              Michelin gastronomy as seamlessly as the soulful home hearth.
            </p>
          </div>
        </section>

        {/* Experience in Berlin */}
        <section className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 sm:py-8 lg:px-12">
          <div className="flex w-full flex-col items-center justify-between gap-6 rounded-xl bg-surface-container-low p-6 sm:gap-8 sm:p-8 lg:flex-row lg:p-10">
            <div className="flex max-w-xl flex-col text-center lg:text-left">
              <h2 className="mb-1 font-sans text-base font-medium text-on-surface sm:text-lg lg:text-xl">
                Experience Maison Asili in Berlin
              </h2>
              <p className="text-xs font-light leading-relaxed text-on-surface-variant">
                Ahead of our online store launch, our small-batch spice blends, botanical salts, rare teas, and
                cold-pressed oils are available exclusively through private order enquiries at{' '}
                <a href="mailto:info@maisonasili.com" className="font-medium text-primary underline underline-offset-2">
                  info@maisonasili.com
                </a>{' '}
                and select Berlin market pop-ups. Upcoming Berlin market dates and locations will be announced shortly.
              </p>
              {berlinMarkets.length > 0 ? (
                <ul className="mt-4 flex flex-col gap-1.5 text-xs text-on-surface-variant">
                  {berlinMarkets.map((market) => (
                    <li key={market.name} className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-semibold text-on-surface">{market.name}</span>
                      <span>{market.dates}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="flex w-full max-w-md flex-1 flex-row gap-2 sm:gap-3 lg:w-auto">
              <Link
                href="/enquiries"
                className="flex min-h-[44px] flex-1 items-center justify-center whitespace-nowrap rounded-sm bg-primary px-2 py-3 text-center font-sans text-[10px] font-medium uppercase leading-tight tracking-[0.08em] text-on-primary transition-colors sm:hover:bg-brand-gold sm:hover:text-primary active:bg-primary sm:flex-none sm:px-5 sm:text-xs sm:tracking-[0.2em]"
              >
                Private &amp; Trade Enquiries
              </Link>
              <Link
                href="/shop"
                className="flex min-h-[44px] flex-1 items-center justify-center whitespace-nowrap rounded-sm border border-outline-variant px-2 py-3 text-center font-sans text-[10px] font-medium uppercase leading-tight tracking-[0.08em] text-on-surface transition-colors hover:border-tertiary hover:text-tertiary sm:flex-none sm:px-5 sm:text-xs sm:tracking-[0.2em]"
              >
                Explore the Collection
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
