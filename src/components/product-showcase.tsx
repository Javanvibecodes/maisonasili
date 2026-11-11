import Image from 'next/image';
import Link from 'next/link';
import { AddToOrderCart } from '@/components/add-to-order-cart';
import { assetPath, collectionName, type Product } from '@/lib/catalog';

interface ProductShowcaseProps {
  product: Product;
  index?: number;
  /** Alternates the photograph between the right and left column. */
  reverse?: boolean;
  /** The homepage preview keeps the row discovery-only. */
  showAddToCart?: boolean;
  priority?: boolean;
}

/**
 * Large editorial product row used across the catalogue.
 *
 * Photograph on one side, story and order controls on the other; the sides
 * alternate so the collection reads like a lookbook rather than a grid.
 */
export function ProductShowcase({
  product,
  index = 0,
  reverse = false,
  showAddToCart = true,
  priority = false
}: ProductShowcaseProps) {
  const intro = product.story.paragraphs.slice(0, 2);
  const flavour = product.story.flavour ?? [];
  const number = String(index + 1).padStart(2, '0');

  return (
    <article className="grid items-center gap-8 border-t border-outline-variant/70 py-12 first:border-t-0 first:pt-0 sm:gap-10 lg:grid-cols-12 lg:gap-14 lg:py-16">
      <div className={`lg:col-span-6 ${reverse ? 'lg:order-2' : ''}`}>
        <Link
          href={`/product/${product.slug}`}
          className="group relative block overflow-hidden bg-warm-sand"
          aria-label={`Discover ${product.name}`}
        >
          <span aria-hidden="true" className="absolute inset-3 z-10 border border-brand-gold/35" />
          <span
            aria-hidden="true"
            className="absolute left-6 top-6 z-10 font-headline text-xs tracking-[0.28em] text-tertiary/70"
          >
            {number}
          </span>
          <div className="relative flex aspect-[4/3] items-center justify-center p-6 sm:p-10 lg:aspect-[4/5] lg:p-12">
            <Image
              src={assetPath(product.image)}
              alt={`${product.name} — ${product.subtitle}`}
              width={product.imageWidth}
              height={product.imageHeight}
              priority={priority}
              className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
          <span
            aria-hidden="true"
            className="absolute bottom-6 right-6 z-10 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.26em] text-tertiary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            View the creation
            <span className="material-symbols-outlined text-sm">north_east</span>
          </span>
        </Link>
      </div>

      <div className={`flex flex-col lg:col-span-6 ${reverse ? 'lg:order-1' : ''}`}>
        <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-tertiary">
          <span>{number}</span>
          <span aria-hidden="true" className="h-px w-6 bg-brand-gold" />
          <span>{collectionName(product.category)}</span>
        </div>

        <h3 className="mt-4 font-headline text-3xl font-light leading-[1.1] tracking-tight text-primary sm:text-4xl">
          <Link href={`/product/${product.slug}`} className="transition-colors hover:text-tertiary">
            {product.name}
          </Link>
        </h3>
        <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">{product.subtitle}</p>
        {product.descriptor ? (
          <p className="mt-2 max-w-md font-headline text-sm italic leading-relaxed text-on-surface-variant">
            {product.descriptor}
          </p>
        ) : null}

        <div className="mt-5 max-w-xl space-y-4 text-sm leading-[1.8] text-on-surface-variant">
          {intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {flavour.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2" aria-label={`Flavour notes for ${product.name}`}>
            {flavour.map((note) => (
              <li
                key={note}
                className="text-[10px] uppercase tracking-[0.16em] text-on-surface-variant before:mr-2 before:text-brand-gold before:content-['•']"
              >
                {note}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-outline-variant/70 pt-5">
          <Link
            href={`/product/${product.slug}`}
            className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:text-tertiary"
          >
            Read the full story
            <span aria-hidden="true" className="material-symbols-outlined text-sm">
              north_east
            </span>
          </Link>
          <span className="text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
            {product.size}
          </span>
        </div>

        {showAddToCart ? (
          <div className="mt-6">
            <AddToOrderCart product={product} variant="compact" />
          </div>
        ) : null}
      </div>
    </article>
  );
}
