import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AddToBag } from '@/components/add-to-bag';
import { ProductCard } from '@/components/product-card';
import { assetPath, collectionName, getProduct, products } from '@/lib/catalog';
import { money } from '@/lib/format';

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
      <div className="mx-auto w-full max-w-7xl px-6 pb-4 pt-6 lg:px-12">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant"
        >
          <Link href="/" className="transition-colors hover:text-on-surface">
            Home
          </Link>
          <span className="text-outline-variant">/</span>
          <Link href="/shop" className="transition-colors hover:text-on-surface">
            Shop
          </Link>
          <span className="text-outline-variant">/</span>
          <Link href={`/collections/${product.category}`} className="transition-colors hover:text-on-surface">
            {collectionName(product.category)}
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="font-semibold text-on-surface">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto w-full max-w-7xl px-6 py-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 xl:gap-16">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="relative flex items-center justify-center overflow-hidden bg-surface-container-lowest p-6 shadow-sm md:p-10">
              <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden">
                <Image
                  src={assetPath(product.image)}
                  alt={`${product.name} — ${product.subtitle}`}
                  width={product.imageWidth}
                  height={product.imageHeight}
                  priority
                  className="h-full w-full object-contain transition-transform duration-700 ease-out hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:col-span-5">
            <h1 className="mb-3 font-headline text-3xl font-semibold leading-tight tracking-tight text-primary sm:text-4xl">
              {product.name}
            </h1>
            <p className="mb-5 text-xs uppercase tracking-[0.18em] text-on-surface-variant">{product.size}</p>

            <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">{product.description}</p>

            <div className="mb-6 border border-outline-variant bg-surface-container-low p-5">
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-on-surface">Ingredients</h2>
              <ul className="flex flex-col gap-2 text-sm text-on-surface-variant">
                {product.ingredients.map((ingredient) => (
                  <li key={ingredient} className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-tertiary" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6 flex items-baseline gap-3 border-b border-outline-variant pb-6">
              <span className="font-headline text-3xl font-semibold text-on-surface">{money(product.price)}</span>
              <span className="text-xs uppercase tracking-wider text-on-surface-variant">Incl. VAT</span>
            </div>

            <AddToBag product={product} />
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="font-headline text-2xl font-light tracking-tight text-on-surface sm:text-3xl">
                You may also like
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
