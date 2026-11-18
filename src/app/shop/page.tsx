import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { collections, productsInCollection } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'The Collection',
  description:
    'Explore the Maison Asili collection: heritage spice blends, botanical finishing salts, rare African teas and cold-pressed culinary oils, composed in our Berlin atelier. Trade pricing available on request.'
};

export default function ShopPage() {
  return (
    <main className="min-h-[calc(100vh-140px)] w-full bg-background">
      <section className="mx-auto w-full max-w-7xl px-6 pb-10 pt-12 lg:px-12 lg:pb-14 lg:pt-20">
        <h1 className="max-w-2xl font-headline text-4xl font-light leading-[1.1] tracking-tight text-on-surface sm:text-5xl lg:text-6xl">
          The Maison Asili <span className="font-normal italic text-tertiary">Collection</span>
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-on-surface-variant sm:text-base">
          Ten small-batch creations across four collections: heritage spice blends, botanical finishing salts, rare
          African teas and cold-pressed culinary oils.
        </p>
      </section>

      {collections.map((collection) => {
        const items = productsInCollection(collection.slug);

        return (
          <section key={collection.slug} id={collection.slug} className="mx-auto w-full max-w-7xl px-6 pb-12 lg:px-12 lg:pb-16">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-t border-outline-variant pt-7">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-tertiary">
                  {items.length} {items.length === 1 ? 'provision' : 'provisions'}
                </p>
                <h2 className="mt-2 font-headline text-2xl font-light tracking-tight text-on-surface sm:text-3xl">
                  {collection.name}
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-on-surface-variant">{collection.tagline}</p>
              </div>
              <Link
                href={`/collections/${collection.slug}`}
                className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-on-surface transition-colors hover:text-tertiary"
              >
                Explore
                <span aria-hidden="true" className="material-symbols-outlined text-sm">
                  north_east
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
