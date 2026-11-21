import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import {
  collections,
  getCollection,
  productsInCollection
} from '@/lib/catalog';

interface CollectionPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export function generateMetadata({ params }: CollectionPageProps): Metadata {
  const collection = getCollection(params.slug);
  if (!collection) return { title: 'Collection not found' };
  return {
    title: collection.name,
    description: collection.intro
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const collection = getCollection(params.slug);
  if (!collection) notFound();

  const items = productsInCollection(collection.slug);
  const related = collections.filter((item) => item.slug !== collection.slug);

  return (
    <main className="w-full bg-background">
      <section className="mx-auto w-full max-w-7xl px-6 pb-8 pt-6 lg:px-12">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant"
        >
          <Link href="/" className="transition-colors hover:text-on-surface">
            Home
          </Link>
          <span className="text-outline-variant">/</span>
          <Link href="/shop" className="transition-colors hover:text-on-surface">
            Collections
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="font-semibold text-on-surface">{collection.name}</span>
        </nav>

        <div className="mx-auto max-w-3xl pt-8 pb-4 text-center">
          <h1 className="mb-4 font-headline text-4xl font-light leading-[1.1] tracking-tight text-on-surface sm:text-5xl">
            {collection.name}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-sm font-light leading-relaxed text-on-surface-variant sm:text-base">
            {collection.intro}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="material-symbols-outlined text-sm text-tertiary">
                inventory_2
              </span>
              {items.length} provisions
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="material-symbols-outlined text-sm text-tertiary">
                local_shipping
              </span>
              Small-Batch Pre-Launch — Private &amp; Trade Enquiries
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-4 lg:px-12">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-headline text-2xl font-light tracking-tight text-on-surface sm:text-3xl">
              Related Collections
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {related.map((item) => (
            <Link
              key={item.slug}
              href={`/collections/${item.slug}`}
              className="group flex flex-col justify-between border border-outline-variant bg-surface-container-lowest p-6 transition-colors hover:border-brand-gold"
            >
              <div>
                <h3 className="font-headline text-xl text-on-surface group-hover:text-tertiary">{item.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-on-surface-variant">{item.tagline}</p>
              </div>
              <span className="mt-6 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-on-surface">
                Explore
                <span aria-hidden="true" className="material-symbols-outlined text-sm">
                  north_east
                </span>
              </span>
            </Link>
          ))}
          <Link
            href="/shop"
            className="group flex flex-col justify-between border border-outline-variant bg-surface-container-lowest p-6 transition-colors hover:border-brand-gold"
          >
            <div>
              <h3 className="font-headline text-xl text-on-surface group-hover:text-tertiary">All Provisions</h3>
              <p className="mt-2 text-xs leading-relaxed text-on-surface-variant">
                Browse every small-batch creation in the Maison Asili catalogue.
              </p>
            </div>
            <span className="mt-6 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-on-surface">
              View all
              <span aria-hidden="true" className="material-symbols-outlined text-sm">
                north_east
              </span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
