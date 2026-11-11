'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/components/cart-provider';
import { SearchOverlay } from '@/components/search-overlay';

const navLinks = [
  { href: '/heritage', label: 'Our Heritage' },
  { href: '/wholesale', label: 'Wholesale' },
  { href: '/contact', label: 'Contact' }
];

const collectionLinks = [
  { href: '/collections/spices', label: 'Spice Blends', note: 'Heritage blends, rubs and seasonings', icon: 'grain' },
  { href: '/collections/salts', label: 'Salts', note: 'Botanical salt blends and finishing salts', icon: 'spa' },
  { href: '/collections/tea', label: 'Botanical Teas', note: 'Rare leaves, flowers and infusions', icon: 'emoji_food_beverage' }
];

function openSearch() {
  window.dispatchEvent(new Event('maison-search-open'));
}

export function SiteHeader() {
  const pathname = usePathname();
  const { count, openDrawer } = useCart();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collectionsOpen, setCollectionsOpen] = React.useState(false);

  const currentPath = pathname ?? '/';

  React.useEffect(() => {
    setMobileOpen(false);
    setCollectionsOpen(false);
  }, [currentPath]);

  const isActive = (href: string) => currentPath === href || currentPath.startsWith(`${href}/`);

  return (
    <>
      <header
        id="site-header"
        className="fixed top-0 left-0 right-0 z-50 w-full border-b border-brand-gold/25 bg-primary text-on-primary"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:px-12">
          <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="Maison Asili — home">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-container ring-1 ring-brand-gold/60">
              <Image
                src="/assets/img/img-59efbbe90f.jpg"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 scale-110 object-cover"
                priority
              />
            </span>
            <span className="text-[13px] font-medium uppercase leading-none tracking-[0.28em] text-on-primary transition-colors group-hover:text-brand-gold sm:text-[14px]">
              Maison Asili
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.2em] lg:flex">
            {navLinks.slice(0, 1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-1 transition-colors hover:text-brand-gold ${isActive(link.href) ? 'text-brand-gold' : 'text-on-primary/85'}`}
              >
                {link.label}
              </Link>
            ))}

            <div className="relative">
              <button
                type="button"
                aria-expanded={collectionsOpen}
                aria-controls="collections-menu"
                onClick={() => setCollectionsOpen((open) => !open)}
                className={`flex items-center gap-1.5 py-1 transition-colors hover:text-brand-gold ${
                  currentPath.startsWith('/collections') ? 'text-brand-gold' : 'text-on-primary/85'
                }`}
              >
                Collections
                <span aria-hidden="true" className="material-symbols-outlined text-sm">
                  expand_more
                </span>
              </button>
              <div
                id="collections-menu"
                className={`absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-4 ${collectionsOpen ? 'block' : 'hidden'}`}
              >
                <div className="rounded-sm border border-outline-variant bg-surface-container-lowest p-2 text-on-surface shadow-xl">
                  {collectionLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-start gap-3.5 p-3 transition-colors hover:bg-surface-container"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-surface-container text-tertiary">
                        <span aria-hidden="true" className="material-symbols-outlined text-base">
                          {item.icon}
                        </span>
                      </span>
                      <span className="flex flex-col">
                        <span className="text-xs font-semibold uppercase tracking-wider text-on-surface transition-colors group-hover:text-tertiary">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-on-surface-variant">{item.note}</span>
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/shop"
                    className="mt-1 flex items-center justify-between border-t border-outline-variant px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-on-surface transition-colors hover:text-tertiary"
                  >
                    View the full collection
                    <span aria-hidden="true" className="material-symbols-outlined text-sm">
                      north_east
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-1 transition-colors hover:text-brand-gold ${isActive(link.href) ? 'text-brand-gold' : 'text-on-primary/85'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-4 sm:gap-5">
            <button
              type="button"
              aria-label="Search the collection"
              onClick={openSearch}
              className="flex items-center text-on-primary transition-colors hover:text-brand-gold"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                search
              </span>
            </button>
            <button
              type="button"
              aria-label={`Order cart${count > 0 ? `, ${count} ${count === 1 ? 'item' : 'items'}` : ''}`}
              onClick={openDrawer}
              className="relative flex items-center text-on-primary transition-colors hover:text-brand-gold"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                shopping_bag
              </span>
              <span
                aria-hidden="true"
                className={`absolute -right-2 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-brand-gold text-[9px] font-bold leading-none text-charcoal transition-opacity ${
                  count > 0 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {count}
              </span>
            </button>
            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
              className="flex items-center text-on-primary transition-colors hover:text-brand-gold lg:hidden"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[26px]">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Navigation Menu */}
        <div className={`${mobileOpen ? 'block' : 'hidden'} max-h-[85vh] overflow-y-auto border-t border-brand-gold/20 bg-primary text-on-primary shadow-2xl lg:hidden`}>
          <nav aria-label="Mobile Navigation" className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-6 text-[12px] uppercase tracking-[0.18em]">
            <Link
              href="/"
              className="border-b border-brand-gold/15 py-3 font-semibold text-on-primary/95 transition-colors hover:text-brand-gold"
            >
              Home
            </Link>
            <span className="pb-1 pt-4 text-[10px] font-semibold tracking-[0.3em] text-brand-gold">Collections</span>
            {collectionLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between border-b border-brand-gold/15 py-2.5 text-on-primary/85 transition-colors hover:text-brand-gold"
              >
                <span>{item.label}</span>
                <span className="text-[10px] lowercase tracking-normal text-on-primary/50">{item.note}</span>
              </Link>
            ))}
            <Link
              href="/shop"
              className="border-b border-brand-gold/15 py-2.5 font-medium text-brand-gold transition-colors hover:text-white"
            >
              All Provisions &rarr;
            </Link>

            <span className="pb-1 pt-4 text-[10px] font-semibold tracking-[0.3em] text-brand-gold">Maison</span>
            <Link href="/heritage" className="border-b border-brand-gold/15 py-2.5 text-on-primary/85 transition-colors hover:text-brand-gold">
              Our Heritage
            </Link>
            <Link href="/wholesale" className="border-b border-brand-gold/15 py-2.5 text-on-primary/85 transition-colors hover:text-brand-gold">
              Wholesale
            </Link>
            <Link href="/contact" className="border-b border-brand-gold/15 py-2.5 text-on-primary/85 transition-colors hover:text-brand-gold">
              Contact
            </Link>
            <Link href="/cart" className="border-b border-brand-gold/15 py-2.5 text-on-primary/85 transition-colors hover:text-brand-gold">
              Order Cart {count > 0 ? `(${count})` : ''}
            </Link>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={openSearch}
                className="flex-1 bg-brand-gold py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal shadow-md transition-colors hover:bg-surface-container-lowest"
              >
                Search the collection
              </button>
              <Link
                href="/cart"
                className="flex-1 border border-brand-gold/40 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-on-primary transition-colors hover:border-brand-gold hover:text-brand-gold"
              >
                View order cart
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <SearchOverlay />
    </>
  );
}
