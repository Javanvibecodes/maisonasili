import Image from 'next/image';
import Link from 'next/link';
import { assetPath, type Product } from '@/lib/catalog';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-outline-variant/60 bg-surface-container-lowest shadow-sm transition-all duration-300 hover:border-brand-gold/80 hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden bg-surface-container sm:aspect-[4/3]">
        <Link href={`/product/${product.slug}`} tabIndex={-1} aria-hidden="true" className="block h-full w-full">
          <Image
            src={assetPath(product.image)}
            alt={`${product.name} — ${product.subtitle}`}
            width={product.imageWidth}
            height={product.imageHeight}
            className="h-full w-full object-contain p-3.5 transition-transform duration-700 ease-out group-hover:scale-105 sm:p-5"
          />
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2.5 p-3.5 sm:gap-3 sm:p-5">
        <div>
          <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.22em] text-tertiary sm:text-[10px]">
            {product.eyebrow}
          </span>
          <h3 className="font-headline text-base font-medium leading-snug text-primary transition-colors group-hover:text-tertiary sm:text-lg">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-on-surface-variant sm:text-[11px] sm:leading-snug">
            {product.subtitle}
          </p>
        </div>
        <div className="border-t border-outline-variant/40 pt-2.5 sm:pt-3">
          <Link
            href={`/product/${product.slug}`}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-on-primary shadow-sm transition-colors hover:bg-brand-gold hover:text-primary sm:py-2.5 sm:text-[10px]"
          >
            Discover
            <span aria-hidden="true" className="material-symbols-outlined text-xs">
              north_east
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
