import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AddToOrderCart } from '@/components/add-to-order-cart';
import { IngredientsCard } from '@/components/ingredients-card';
import { ProductCard } from '@/components/product-card';
import { ProductGallery } from '@/components/product-gallery';
import { ProductStory } from '@/components/product-story';
import { collectionName, getProduct, products, type Product } from '@/lib/catalog';

interface ProductPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: product.name,
    description: product.description
  };
}

/**
 * Mixes the rest of this collection with creations from the other
 * collections so the closing grid never singles out the current collection.
 */
function buildSuggestions(primary: Product[], secondary: Product[], limit = 8): Product[] {
  const result: Product[] = [];
  let index = 0;
  while (result.length < limit && (index < primary.length || index < secondary.length)) {
    if (index < primary.length) result.push(primary[index]);
    if (result.length < limit && index < secondary.length) result.push(secondary[index]);
    index += 1;
  }
  return result;
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const restOfCollection = products.filter(
    (item) => item.slug !== product.slug && item.category === product.category
  );
  const otherCollections = products.filter((item) => item.category !== product.category);
  const suggestions = buildSuggestions(restOfCollection, otherCollections);

  return (
    <main className="w-full bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 pb-2 pt-6 lg:px-12">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant"
        >
          <Link href="/" className="transition-colors hover:text-on-surface">
            Home
          </Link>
          <span className="text-outline-variant">/</span>
          <Link href="/shop" className="transition-colors hover:text-on-surface">
            The Collection
          </Link>
          <span className="text-outline-variant">/</span>
          <Link href={`/collections/${product.category}`} className="transition-colors hover:text-on-surface">
            {collectionName(product.category)}
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="font-semibold text-on-surface">{product.name}</span>
        </nav>
      </div>

      {/* Photograph on the left, the composition on the right. */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-14 pt-8 lg:px-12 lg:pb-20">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ProductGallery product={product} />
          </div>

          <div className="flex flex-col lg:col-span-5">
            <Link
              href={`/collections/${product.category}`}
              className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-tertiary transition-colors hover:text-primary"
            >
              <span aria-hidden="true" className="h-px w-8 bg-brand-gold" />
              <span>{collectionName(product.category)}</span>
            </Link>

            <h1 className="mt-5 font-headline text-4xl font-light leading-[1.05] tracking-tight text-primary sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">{product.subtitle}</p>
            {product.descriptor ? (
              <p className="mt-3 font-headline text-base italic leading-relaxed text-on-surface-variant">
                {product.descriptor}
              </p>
            ) : null}

            <div className="mt-8">
              <IngredientsCard product={product} />
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-outline-variant pt-6 text-sm">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-on-surface-variant">
                  Size / pack
                </dt>
                <dd className="mt-1 text-on-surface">{product.size}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-on-surface-variant">
                  Origin
                </dt>
                <dd className="mt-1 text-on-surface">{product.origin}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* The full story, read in a single comfortable column. */}
      <section className="border-t border-outline-variant/70 bg-surface-container-lowest">
        <div className="mx-auto w-full max-w-3xl px-6 py-14 lg:px-12 lg:py-20">
          <ProductStory product={product} />
        </div>
      </section>

      {/* Order controls close the story rather than opening the page. */}
      <section id="order" className="border-t border-outline-variant/70 bg-surface-container-low">
        <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-12 lg:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-tertiary">Order</p>
              <h2 className="mt-3 font-headline text-3xl font-light leading-tight tracking-tight text-primary sm:text-4xl">
                {product.name}
              </h2>
              <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">
                {product.size} • {collectionName(product.category)}
              </p>
            </div>
            <div className="lg:col-span-7">
              <AddToOrderCart product={product} />
            </div>
          </div>
        </div>
      </section>

      {suggestions.length > 0 ? (
        <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
          <div className="mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-tertiary">Continue Exploring</p>
            <h2 className="mt-3 font-headline text-3xl font-light tracking-tight text-on-surface sm:text-4xl">
              More Afro-Gourmet Creations
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {suggestions.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
