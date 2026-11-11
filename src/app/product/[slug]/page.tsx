import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AddToOrderCart } from '@/components/add-to-order-cart';
import { IngredientsCard } from '@/components/ingredients-card';
import { ProductShowcase } from '@/components/product-showcase';
import { ProductStory } from '@/components/product-story';
import { assetPath, collectionName, getProduct, products } from '@/lib/catalog';

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

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = products.filter(
    (item) => item.slug !== product.slug && item.category === product.category
  );

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

      <section className="mx-auto w-full max-w-7xl px-6 pb-14 pt-8 lg:px-12 lg:pb-20">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden bg-warm-sand">
              <span aria-hidden="true" className="absolute inset-4 z-10 border border-brand-gold/35 sm:inset-6" />
              <div className="relative flex aspect-[4/3] items-center justify-center p-7 sm:p-12 lg:aspect-[4/5] lg:p-14">
                <Image
                  src={assetPath(product.image)}
                  alt={`${product.name} — ${product.subtitle}`}
                  width={product.imageWidth}
                  height={product.imageHeight}
                  priority
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:col-span-5">
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-tertiary">
              <span aria-hidden="true" className="h-px w-8 bg-brand-gold" />
              <span>{collectionName(product.category)}</span>
            </div>

            <h1 className="mt-5 font-headline text-4xl font-light leading-[1.05] tracking-tight text-primary sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">{product.subtitle}</p>
            {product.descriptor ? (
              <p className="mt-3 font-headline text-base italic leading-relaxed text-on-surface-variant">
                {product.descriptor}
              </p>
            ) : null}

            <dl className="mt-7 grid grid-cols-1 gap-x-6 gap-y-3 border-y border-outline-variant py-5 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-on-surface-variant">
                  Size / pack
                </dt>
                <dd className="mt-1 text-on-surface">{product.size}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-on-surface-variant">
                  Product type
                </dt>
                <dd className="mt-1 text-on-surface">{product.productType}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-on-surface-variant">
                  Origin
                </dt>
                <dd className="mt-1 text-on-surface">{product.origin}</dd>
              </div>
            </dl>

            <div className="mt-7">
              <AddToOrderCart product={product} />
            </div>

            <p className="text-[11px] leading-relaxed text-on-surface-variant">
              Trade pricing, pack formats and minimum quantities are confirmed on request.{' '}
              <Link href="/wholesale" className="font-semibold text-tertiary underline underline-offset-2 hover:text-primary">
                Learn about wholesale
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-outline-variant/70 bg-surface-container-lowest">
        <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-12 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7 xl:col-span-8">
              <ProductStory product={product} />
            </div>
            <aside className="lg:col-span-5 xl:col-span-4">
              <div className="lg:sticky lg:top-28">
                <IngredientsCard product={product} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-tertiary">Continue Exploring</p>
              <h2 className="mt-3 font-headline text-3xl font-light tracking-tight text-on-surface sm:text-4xl">
                More from {collectionName(product.category)}
              </h2>
            </div>
            <Link
              href={`/collections/${product.category}`}
              className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-on-surface transition-colors hover:text-tertiary"
            >
              View {collectionName(product.category)}
              <span aria-hidden="true" className="material-symbols-outlined text-sm">
                north_east
              </span>
            </Link>
          </div>
          <div>
            {related.map((item, index) => (
              <ProductShowcase
                key={item.slug}
                product={item}
                index={index}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
