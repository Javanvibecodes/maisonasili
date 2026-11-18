import Image from 'next/image';
import Link from 'next/link';
import { assetPath, type Product } from '@/lib/catalog';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-outline-variant/60 bg-surface-container-lowest shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-brand-gold/80 hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden bg-surface-container">
        <Link href={`/product/${product.slug}`} tabIndex={-1} aria-hidden="true" className="block h-full w-full">
          <Image
            src={assetPath(product.image)}
            alt={`${product.name} — ${product.subtitle}`}
            width={product.imageWidth}
            height={product.imageHeight}
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 68vw"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-between min-h-[170px] sm:min-h-[185px] gap-2.5 p-3.5 sm:gap-3 sm:p-5">
        <div>
          <h3 className="font-headline text-lg font-medium leading-snug text-primary transition-colors group-hover:text-tertiary sm:text-xl">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="mt-1.5 min-h-[56px] text-[11px] leading-relaxed text-on-surface-variant sm:min-h-[64px] sm:text-xs sm:leading-snug">
            {product.microDescription}
          </p>
        </div>
        <div className="border-t border-outline-variant/40 pt-2.5 sm:pt-3">
          <Link
            href={`/product/${product.slug}`}
            className="flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-on-primary shadow-sm transition-colors sm:hover:bg-brand-gold sm:hover:text-primary active:bg-primary sm:text-[10px] sm:tracking-[0.2em]"
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
