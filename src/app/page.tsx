import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CollectionCards } from '@/components/collection-cards';

export const metadata: Metadata = {
  title: 'Maison Asili — Afro-Gourmet Product House',
  description:
    'An Afro-Gourmet product house rooted in Africa and born in Berlin: heritage spice blends, botanical salts, rare African teas and cold-pressed culinary oils. Explore the collection and enquire about wholesale.'
};

const pillarIcons = ['spa', 'precision_manufacturing', 'public'];

const pillars = [
  {
    title: 'African Botanical Heritage',
    body:
      'Direct partnerships with cooperative family growers across Kenya, Ethiopia, and Tanzania protect centuries of botanical intelligence and native biodiversity.'
  },
  {
    title: 'Artisanal Craftsmanship',
    body:
      'Milled and bottled in small micro-batches in our Berlin Atelier. We refuse chemical stabilizers, fillers, or high-heat pressing to safeguard therapeutic volatiles.'
  },
  {
    title: 'A World of Flavour',
    body:
      'Conceived as a contemporary Afro-Gourmet dialogue, our ingredients are composed to inspire modern Michelin gastronomy as seamlessly as the soulful home hearth.'
  }
];

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
        <section className="w-full px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <div className="mb-9 flex flex-col items-center text-center sm:mb-11">
              <p className="font-headline text-2xl font-medium uppercase leading-none tracking-[0.32em] text-gold sm:text-3xl sm:tracking-[0.4em]">
                House of Asili
              </p>
              <div className="mt-6 h-px w-12 bg-gold/40 sm:mt-7 sm:w-16" />
            </div>
            <div className="mx-auto max-w-3xl space-y-4 font-body text-sm font-light leading-relaxed tracking-normal text-on-surface-variant sm:space-y-6 sm:text-base lg:text-lg">
              <p className="editorial-lead">
                Born in Berlin and deeply rooted in Africa's rich agricultural and culinary heritage,{' '}
                <strong className="font-semibold text-primary">MAISON ASILI presents an exquisite world of Afro-Gourmet Fusion.</strong>{' '}
                From exceptional small-batch coffees and distinctive teas to rare botanicals, heritage spices, artisan
                culinary oils, and gourmet salts, our collections bring together the richness of African terroirs and
                the sophistication of international gastronomy.
              </p>
              <p>
                Built upon more than two decades of artisanal culinary experience, MAISON ASILI unites uncompromising
                gourmet standards with carefully selected ingredients of exceptional provenance,{' '}
                <strong className="font-semibold text-primary">blending traditional knowledge with contemporary creativity.</strong>
              </p>
              <p>
                Every MAISON ASILI creation celebrates origin, purity, authenticity, and the art of flavour. Through
                imaginative combinations of heritage aromatics, rare botanicals, natural umami, and refined culinary
                techniques, we transform exceptional ingredients into{' '}
                <strong className="font-semibold text-primary">distinctive gourmet experiences that transcend borders and traditions.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Collections Section */}
        <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="mb-6 sm:mb-10">
            <h2 className="font-sans text-2xl font-light uppercase tracking-tight text-on-surface sm:text-4xl lg:text-5xl">
              Explore Our Collections
            </h2>
          </div>

          <CollectionCards />
        </section>

        {/* Heritage Pillars */}
        <section className="my-6 w-full bg-surface-container-low px-5 py-14 sm:my-8 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center text-center sm:mb-16">
              <h2 className="mb-3 font-sans text-2xl font-light uppercase tracking-tight text-on-surface sm:mb-4 sm:text-4xl lg:text-5xl">
                Rooted in Heritage. Crafted Without Compromise.
              </h2>
              <p className="text-xs font-light text-on-surface-variant sm:text-sm">
                Every jar, tin, and bottle embodies our devotion to African agronomy, Berlin craftsmanship, and
                culinary integrity.
              </p>
            </div>
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0 md:gap-8">
              {pillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className="flex w-[72vw] max-w-[280px] shrink-0 snap-center flex-col items-start rounded-xl bg-surface-container-lowest p-6 shadow-sm sm:w-auto sm:max-w-none sm:snap-align-none sm:rounded-none sm:p-8"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-tertiary sm:mb-6 sm:h-12 sm:w-12">
                    <span aria-hidden="true" className="material-symbols-outlined text-xl sm:text-2xl">
                      {pillarIcons[index]}
                    </span>
                  </div>
                  <h3 className="mb-2 font-sans text-base font-medium text-on-surface sm:mb-3 sm:text-xl">{pillar.title}</h3>
                  <p className="text-[11px] font-light leading-relaxed text-on-surface-variant sm:text-xs md:text-sm">{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wholesale CTA */}
        <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="flex w-full flex-col items-center justify-between gap-6 rounded-xl bg-surface-container-low p-6 sm:gap-8 sm:p-8 lg:flex-row lg:p-10">
            <div className="flex max-w-xl flex-col text-center lg:text-left">
              <h2 className="mb-1 font-sans text-base font-medium text-on-surface sm:text-lg lg:text-xl">
                For Retailers, Restaurants &amp; Hotels
              </h2>
              <p className="text-xs font-light leading-relaxed text-on-surface-variant">
                Maison Asili supplies delicatessens, gourmet shops, restaurants, hotels and distributors. Explore the
                collection and submit a wholesale order request — we will follow up with availability and trade pricing.
              </p>
            </div>
            <div className="flex w-full max-w-md flex-1 flex-row gap-2 sm:gap-3 lg:w-auto">
              <Link
                href="/wholesale"
                className="flex min-h-[44px] flex-1 items-center justify-center whitespace-nowrap rounded-sm bg-primary px-2 py-3 text-center font-sans text-[10px] font-medium uppercase leading-tight tracking-[0.08em] text-on-primary transition-colors sm:hover:bg-brand-gold sm:hover:text-primary active:bg-primary sm:flex-none sm:px-5 sm:text-xs sm:tracking-[0.2em]"
              >
                Wholesale Enquiry
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
