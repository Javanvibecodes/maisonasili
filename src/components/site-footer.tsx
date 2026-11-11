import Image from 'next/image';
import Link from 'next/link';
import { SearchTrigger } from '@/components/search-trigger';

export function SiteFooter() {
  return (
    <footer className="relative z-30 w-full border-t border-brand-gold/25 bg-primary text-on-primary">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-12 sm:px-8 sm:pb-14 sm:pt-16 lg:px-12 lg:pt-20">
        <div className="mb-10 grid grid-cols-1 gap-8 sm:mb-16 sm:gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="flex flex-col items-start sm:pr-6 lg:col-span-2">
            <div className="mb-4 inline-flex bg-primary-container p-3 ring-1 ring-brand-gold/30 sm:mb-5 sm:p-4">
              <Image
                src="/assets/img/img-59efbbe90f.jpg"
                alt="Maison Asili — Origin. Identity. Heritage."
                width={144}
                height={144}
                className="h-24 w-24 object-cover sm:h-32 sm:w-32 lg:h-36 lg:w-36"
              />
            </div>
            <p className="mb-2 font-headline text-sm italic text-brand-gold sm:mb-3 sm:text-base">
              Rooted in Africa. Born in Berlin. For the World.
            </p>
            <p className="max-w-sm text-[11px] leading-relaxed text-on-primary/70 sm:text-xs">
              Purveyors of exceptional Afro-Gourmet botanical treasures, heritage spice blends, hand-harvested salts
              and botanical teas curated for discerning culinary patrons.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:contents">
            <div className="flex flex-col">
              <h2 className="mb-4 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold sm:mb-5">
                Maison
              </h2>
              <ul className="flex flex-col gap-2.5 text-xs tracking-wide text-on-primary/70 sm:gap-3">
                <li>
                  <Link href="/shop" className="transition-colors hover:text-brand-gold">
                    The Collection
                  </Link>
                </li>
                <li>
                  <Link href="/heritage" className="transition-colors hover:text-brand-gold">
                    Our Heritage
                  </Link>
                </li>
                <li>
                  <Link href="/wholesale" className="transition-colors hover:text-brand-gold">
                    Wholesale
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition-colors hover:text-brand-gold">
                    Contact
                  </Link>
                </li>
                <li>
                  <SearchTrigger className="text-left transition-colors hover:text-brand-gold">Search</SearchTrigger>
                </li>
                <li>
                  <Link href="/cart" className="transition-colors hover:text-brand-gold">
                    Order Cart
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h2 className="mb-4 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold sm:mb-5">
                Trade
              </h2>
              <ul className="flex flex-col gap-2.5 text-xs tracking-wide text-on-primary/70 sm:gap-3">
                <li>
                  <Link href="/wholesale" className="transition-colors hover:text-brand-gold">
                    Wholesale &amp; Hospitality
                  </Link>
                </li>
                <li>
                  <a href="mailto:info@maisonasili.com" className="break-all transition-colors hover:text-brand-gold">
                    info@maisonasili.com
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="transition-colors hover:text-brand-gold">
                    Press &amp; Collaborations
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col lg:col-span-2">
            <h2 className="mb-3 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold sm:mb-5">
              Trade Enquiries
            </h2>
            <p className="mb-4 text-xs leading-relaxed text-on-primary/70">
              For wholesale, hospitality and corporate gifting enquiries, tell us about your business and we will
              prepare a proposal.
            </p>
            <Link
              href="/wholesale"
              className="inline-flex w-fit items-center gap-2 rounded-sm bg-brand-gold px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-charcoal transition-colors hover:bg-on-primary"
            >
              Start an Enquiry
              <span aria-hidden="true" className="material-symbols-outlined text-sm">
                north_east
              </span>
            </Link>
            <p className="mt-3 text-[10px] leading-relaxed text-on-primary/60 sm:mt-4 sm:text-[11px]">
              Trade pricing and availability are provided on request.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-brand-gold/20 pt-6 text-[10px] uppercase tracking-wider text-on-primary/60 sm:pt-8 sm:text-[11px] md:flex-row">
          <div>© 2026 Maison Asili • Berlin • Nairobi</div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-brand-gold">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-brand-gold">
              Terms &amp; Conditions
            </Link>
            <Link href="/shipping" className="transition-colors hover:text-brand-gold">
              Shipping &amp; Fulfilment
            </Link>
            <Link href="/impressum" className="transition-colors hover:text-brand-gold">
              Legal Notice / Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
