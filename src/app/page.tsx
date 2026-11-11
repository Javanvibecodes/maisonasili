import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { DemoForm } from '@/components/demo-form';
import { ProductCard } from '@/components/product-card';
import { assetPath, collections, getProduct, media, products } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Maison Asili — Afro-Gourmet Luxury',
  description:
    'Afro-Gourmet Fusion. Heritage Ingredients. Extraordinary Flavours. Heritage spice blends, botanical salts and rare African teas from Berlin.'
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
    <main className="w-full">
      <section className="relative flex min-h-[560px] flex-col justify-end overflow-hidden bg-primary lg:min-h-[calc(100svh-5rem)]">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={assetPath(media.hero)}
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] sm:object-[center_8%]"
          aria-hidden="true"
        >
          <source src={assetPath(media.videoBotanical)} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 z-10 hidden bg-gradient-to-r from-primary/95 via-primary/55 to-transparent sm:block lg:w-[68%]" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-primary via-primary/70 to-primary/25 sm:hidden" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-primary/80 to-transparent" />

        <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-start px-5 pb-10 pt-24 sm:px-6 sm:pb-12 lg:px-12 lg:pb-14">
          <h1 className="mb-4 select-none font-sans text-[clamp(2.1rem,7.5vw,3.2rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-on-primary sm:text-5xl lg:text-[clamp(2.4rem,5.5vw,5.2rem)]">
            <span className="mb-2 block font-sans text-sm font-light normal-case tracking-[0.16em] text-on-primary/90 sm:mb-3 sm:text-base md:text-xl lg:text-2xl">
              Welcome to
            </span>
            MAISON <span className="text-brand-gold">ASILI</span>
          </h1>

          <p className="mb-6 max-w-xl font-sans text-sm font-light leading-relaxed text-on-primary/85 sm:mb-8 sm:text-base md:text-lg">
            Afro-Gourmet Fusion. Heritage Ingredients. Extraordinary Flavours.
          </p>

          <div className="mb-5 flex w-full flex-col items-stretch gap-2.5 sm:mb-6 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/shop"
              className="whitespace-nowrap bg-brand-gold px-4 py-3 text-center font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal shadow-md transition-all hover:bg-on-primary hover:text-primary sm:px-7 sm:text-xs"
            >
              Explore Our Collection
            </Link>
            <Link
              href="/heritage"
              className="whitespace-nowrap border border-brand-gold/40 bg-transparent px-4 py-3 text-center font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-on-primary transition-all hover:border-brand-gold hover:bg-brand-gold/10 sm:px-7 sm:text-xs"
            >
              Discover Our Heritage
            </Link>
          </div>

          <p className="mb-5 font-headline text-sm italic tracking-wide text-brand-gold sm:mb-6 sm:text-base">
            Rooted in Africa. Born in Berlin. For the World.
          </p>

          <a
            href="#curtain-content"
            className="flex cursor-pointer select-none items-center text-on-primary/70 transition-colors hover:text-on-primary"
          >
            <span className="mr-2 text-[9px] uppercase tracking-[0.3em] sm:text-[10px]">Scroll to explore</span>
            <span aria-hidden="true" className="material-symbols-outlined animate-bounce text-sm sm:text-base">
              arrow_downward
            </span>
          </a>
        </div>
      </section>

      <div id="curtain-content" className="overflow-hidden rounded-t-[2.5rem] border-t border-brand-gold/40 bg-surface-container-lowest text-on-surface lg:rounded-t-[3.5rem]">
        <section className="w-full px-6 py-20 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 flex flex-col items-center text-center">
              <div className="mb-7 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-surface-container ring-1 ring-brand-gold/40">
                <Image
                  src="/assets/img/img-59efbbe90f.jpg"
                  alt="Maison Asili Gold Crest"
                  width={72}
                  height={72}
                  className="h-9 w-9 object-contain"
                />
              </div>
              <div className="h-0.5 w-12 bg-brand-gold" />
            </div>
            <div className="mx-auto max-w-3xl space-y-6 font-body text-base font-light leading-relaxed tracking-normal text-on-surface-variant sm:text-lg">
              <p className="editorial-lead">
                Born in Berlin and deeply rooted in Africa’s rich agricultural and culinary heritage,{' '}
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

        <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12">
          <div className="mb-8 flex flex-col justify-between md:flex-row md:items-end sm:mb-12">
            <div>
              <h2 className="font-sans text-3xl font-light uppercase tracking-tight text-on-surface sm:text-4xl lg:text-5xl">
                Explore Our Collections
              </h2>
            </div>
            <Link
              href="/shop"
              className="mt-4 flex items-center gap-1.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-on-surface transition-colors hover:text-tertiary md:mt-0"
            >
              View All 3 Collections
              <span aria-hidden="true" className="material-symbols-outlined text-sm">
                north_east
              </span>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:gap-5">
            {collections.map((collection) => {
              const image = getProduct(
                collection.slug === 'spices'
                  ? 'savannah-fire'
                  : collection.slug === 'salts'
                    ? 'tropical-pink-pepper-salt'
                    : 'royal-purple-elixir'
              );
              return (
                <Link
                  key={collection.slug}
                  href={`/collections/${collection.slug}`}
                  className="group flex h-[430px] flex-col overflow-hidden rounded-2xl border border-brand-gold/20 bg-primary shadow-md transition-all duration-500 hover:shadow-2xl sm:h-[470px] lg:h-[540px]"
                >
                  <div className="relative min-h-0 flex-1 overflow-hidden">
                    {image ? (
                      <Image
                        src={assetPath(image.image)}
                        alt={`${collection.name} — ${image.name}`}
                        width={image.imageWidth}
                        height={image.imageHeight}
                        className="h-full w-full object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-105 sm:p-6 lg:p-8"
                      />
                    ) : null}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-primary to-transparent" />
                  </div>
                  <div className="relative z-10 px-6 pb-6 pt-3 text-center">
                    <h3 className="mb-1 font-sans text-2xl font-bold uppercase leading-tight tracking-wider text-on-primary lg:text-3xl">
                      {collection.name}
                    </h3>
                    <p className="text-xs font-sans font-light uppercase tracking-widest text-on-primary/75">
                      {collection.tagline}
                    </p>
                    <span className="mt-5 inline-block rounded-full bg-brand-gold px-6 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-primary shadow-lg transition-all group-hover:bg-on-primary">
                      Explore
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="w-full px-6 py-16 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 font-sans text-3xl font-light uppercase tracking-tight text-on-surface sm:text-4xl lg:text-5xl">
              Selected for Your Table
            </h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
              {featured.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="my-8 w-full bg-surface-container-low px-6 py-20 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center">
              <h2 className="mb-4 font-sans text-3xl font-light uppercase tracking-tight text-on-surface sm:text-4xl lg:text-5xl">
                Rooted in Heritage. Crafted Without Compromise.
              </h2>
              <p className="text-sm font-light text-on-surface-variant">
                Every jar, tin, and bottle embodies our devotion to African agronomy, Berlin craftsmanship, and
                culinary integrity.
              </p>
            </div>
            <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto py-2 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">
              {pillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className="flex w-[280px] shrink-0 snap-start flex-col items-start bg-surface-container-lowest p-8 shadow-sm sm:w-[320px] md:w-auto"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-surface-container text-tertiary">
                    <span aria-hidden="true" className="material-symbols-outlined text-2xl">
                      {pillarIcons[index]}
                    </span>
                  </div>
                  <h3 className="mb-3 font-sans text-xl font-medium text-on-surface">{pillar.title}</h3>
                  <p className="text-xs font-light leading-relaxed text-on-surface-variant sm:text-sm">{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-12">
          <div className="flex w-full flex-col items-center justify-between gap-8 bg-surface-container-low p-8 lg:flex-row lg:p-10">
            <div className="flex max-w-xl flex-col text-center lg:text-left">
              <h2 className="mb-1 font-sans text-lg font-medium text-on-surface sm:text-xl">An Invitation to Our Table</h2>
              <p className="text-xs font-light text-on-surface-variant">
                New spice blends, botanical salt harvests and rare tea arrivals, plus invitations to Berlin tastings.
              </p>
            </div>
            <div className="w-full max-w-md flex-1 lg:w-auto">
              <DemoForm kind="newsletter" className="flex w-full flex-col gap-2">
                <div className="flex w-full flex-col gap-2 sm:flex-row">
                  <label className="sr-only" htmlFor="home-newsletter-email">
                    Email address
                  </label>
                  <input
                    id="home-newsletter-email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="flex-1 bg-surface-container-lowest px-4 py-3 text-xs text-on-surface placeholder:text-outline focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="whitespace-nowrap bg-primary px-6 py-3 font-sans text-xs font-medium uppercase tracking-[0.2em] text-on-primary transition-colors hover:bg-brand-gold hover:text-primary"
                  >
                    Join Gazette
                  </button>
                </div>
                <span className="block text-center text-[10px] text-outline lg:text-left">
                  Unsubscribe at any time. We honor your digital peace.
                </span>
              </DemoForm>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
