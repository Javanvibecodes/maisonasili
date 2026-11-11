import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CollectionCards } from '@/components/collection-cards';
import { FeaturedProductsCarousel } from '@/components/featured-products-carousel';
import { collections, products } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Maison Asili — Afro-Gourmet Product House',
  description:
    'An Afro-Gourmet product house rooted in Africa and born in Berlin: heritage spice blends, botanical salts and rare African teas. Explore the collection and enquire about wholesale.'
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

// A daily seed keeps the trio stable for each build while rotating the selection.
const dailySeed = new Date().toISOString().slice(0, 10);

const featured = products
  .map((product) => ({
    product,
    rank: [...`${product.slug}-${dailySeed}`].reduce(
      (acc, char) => (acc * 31 + char.charCodeAt(0)) % 1000003,
      7
    )
  }))
  .sort((a, b) => a.rank - b.rank)
  .slice(0, 3)
  .map((entry) => entry.product);

export default function HomePage() {
  return (
    <main className="relative w-full">
      {/* ── Fixed hero background ── */}
      <section
        id="hero-curtain"
        className="fixed inset-0 flex flex-col justify-end overflow-hidden lg:min-h-[calc(100svh-5rem)]"
        aria-hidden="false"
      >
        <Image
          src="/assets/img/hero-products.jpg"
          alt="Maison Asili product collection"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] sm:object-[center_50%] lg:object-[center_45%]"
          fill
          priority
        />
        {/* Subtle darkening overlays for text legibility */}
        <div className="pointer-events-none absolute inset-0 z-10 hidden bg-gradient-to-r from-black/75 via-black/40 to-transparent sm:block lg:w-[68%]" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/55 to-black/20 sm:hidden" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 w-full bg-gradient-to-b from-black/80 to-transparent" />

        <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-start px-6 pb-6 pt-16 sm:px-8 sm:pb-8 sm:pt-20 lg:px-12 lg:pb-10 lg:pt-14">
          <div className="relative max-w-xl sm:-ml-12 lg:-ml-14">
            <h1 className="mb-3 select-none font-sans text-[clamp(1.9rem,6.5vw,2.8rem)] font-extrabold uppercase leading-[0.98] tracking-tight text-white sm:mb-4 sm:text-5xl lg:text-[clamp(2.4rem,5.5vw,5.2rem)]">
              <span className="mb-1.5 block font-sans text-xs font-light normal-case tracking-[0.2em] text-white/90 sm:mb-3 sm:text-base md:text-xl lg:text-2xl">
                Welcome to
              </span>
              MAISON <span className="text-brand-gold">ASILI</span>
            </h1>

            <p className="mb-5 max-w-lg font-sans text-xs font-light leading-relaxed text-white/85 sm:mb-8 sm:text-base md:text-lg">
              Afro-Gourmet Fusion. Heritage Ingredients. Extraordinary Flavours.
            </p>

            <div className="mb-5 flex w-full flex-col items-stretch gap-2.5 sm:mb-6 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/shop"
                className="whitespace-nowrap rounded-sm bg-brand-gold px-5 py-3 text-center font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal shadow-md transition-all hover:bg-white hover:text-charcoal sm:px-7 sm:text-xs"
              >
                Explore the Collection
              </Link>
              <Link
                href="/heritage"
                className="whitespace-nowrap rounded-sm border border-brand-gold/40 bg-transparent px-5 py-3 text-center font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-all hover:border-brand-gold hover:bg-brand-gold/10 sm:px-7 sm:text-xs"
              >
                Discover Our Heritage
              </Link>
            </div>

            <p className="mb-4 font-headline text-xs italic tracking-wide text-brand-gold sm:mb-6 sm:text-base">
              Rooted in Africa. Born in Berlin. For the World.
            </p>

            <a
              href="#curtain-content"
              className="flex cursor-pointer select-none items-center text-white/75 transition-colors hover:text-white"
            >
              <span className="mr-2 text-[9px] uppercase tracking-[0.28em] sm:text-[10px]">Scroll to explore</span>
              <span aria-hidden="true" className="material-symbols-outlined animate-bounce text-sm sm:text-base">
                arrow_downward
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Spacer so the fixed hero takes up visual space in the document flow */}
      <div className="h-screen min-h-[560px]" aria-hidden="true" />

      {/* ── Content layer — scrolls up over the hero ── */}
      <div id="curtain-content" className="relative z-30 overflow-hidden rounded-t-[2rem] border-t border-brand-gold/40 bg-surface-container-lowest text-on-surface sm:rounded-t-[2.5rem] lg:rounded-t-[3.5rem]">
        {/* Intro Editorial */}
        <section className="w-full px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-surface-container ring-1 ring-brand-gold/40 sm:mb-7 sm:h-14 sm:w-14">
                <Image
                  src="/assets/img/img-59efbbe90f.jpg"
                  alt="Maison Asili Gold Crest"
                  width={72}
                  height={72}
                  className="h-8 w-8 object-contain sm:h-9 sm:w-9"
                />
              </div>
              <div className="h-0.5 w-10 bg-brand-gold sm:w-12" />
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
          <div className="mb-6 flex flex-col justify-between gap-2 sm:mb-12 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-sans text-2xl font-light uppercase tracking-tight text-on-surface sm:text-4xl lg:text-5xl">
                Explore Our Collections
              </h2>
            </div>
            <Link
              href="/shop"
              className="flex items-center gap-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-on-surface transition-colors hover:text-tertiary sm:text-xs"
            >
              View All {collections.length} Collections
              <span aria-hidden="true" className="material-symbols-outlined text-sm">
                north_east
              </span>
            </Link>
          </div>

          <CollectionCards />
        </section>

        {/* Featured Products Section */}
        <section className="w-full px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex flex-col justify-between gap-2 sm:mb-12 sm:flex-row sm:items-end">
              <div>
                <h2 className="font-sans text-2xl font-light uppercase tracking-tight text-on-surface sm:text-4xl lg:text-5xl">
                  Selected for Your Table
                </h2>
              </div>
              <Link
                href="/shop"
                className="flex items-center gap-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-on-surface transition-colors hover:text-tertiary sm:text-xs"
              >
                View all provisions
                <span aria-hidden="true" className="material-symbols-outlined text-sm">
                  north_east
                </span>
              </Link>
            </div>

            <FeaturedProductsCarousel products={featured} />
          </div>
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
            <div className="flex w-full max-w-md flex-1 flex-col gap-2.5 sm:flex-row sm:gap-3 lg:w-auto">
              <Link
                href="/wholesale"
                className="whitespace-nowrap rounded-sm bg-primary px-5 py-3 text-center font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-on-primary transition-colors hover:bg-brand-gold hover:text-primary sm:text-xs"
              >
                Wholesale Enquiry
              </Link>
              <Link
                href="/shop"
                className="whitespace-nowrap rounded-sm border border-outline-variant px-5 py-3 text-center font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-on-surface transition-colors hover:border-tertiary hover:text-tertiary sm:text-xs"
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
