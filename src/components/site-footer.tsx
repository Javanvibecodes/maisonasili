import Image from 'next/image';
import Link from 'next/link';
import { DemoForm } from '@/components/demo-form';
import { LanguageTrigger } from '@/components/language-panel';
import { SearchTrigger } from '@/components/search-trigger';

const socials = ['Instagram', 'Facebook', 'Pinterest', 'LinkedIn'];

export function SiteFooter() {
  return (
    <footer className="mt-24 w-full border-t border-brand-gold/25 bg-primary text-on-primary">
      <div className="mx-auto max-w-7xl px-6 pb-14 pt-20 lg:px-12">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="flex flex-col items-start pr-6 lg:col-span-2">
            <div className="mb-5 inline-flex bg-primary-container p-4 ring-1 ring-brand-gold/30">
              <Image
                src="/assets/img/img-59efbbe90f.jpg"
                alt="Maison Asili — Origin. Identity. Heritage."
                width={144}
                height={144}
                className="h-36 w-36 object-cover"
              />
            </div>
            <p className="mb-3 font-headline text-base italic text-brand-gold">
              Rooted in Africa. Born in Berlin. For the World.
            </p>
            <p className="max-w-sm text-xs leading-relaxed text-on-primary/70">
              Purveyors of exceptional Afro-Gourmet botanical treasures, heritage spice blends, hand-harvested salts
              and botanical teas curated for discerning culinary patrons.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:contents">
            <div className="flex flex-col">
              <h2 className="mb-5 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                Maison
              </h2>
              <ul className="flex flex-col gap-3 text-xs tracking-wide text-on-primary/70">
                <li>
                  <Link href="/heritage" className="transition-colors hover:text-brand-gold">
                    Our Heritage
                  </Link>
                </li>
                <li>
                  <Link href="/wholesale" className="transition-colors hover:text-brand-gold">
                    Wholesale &amp; Hospitality
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
                    Shopping Bag
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h2 className="mb-5 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                Follow
              </h2>
              <ul className="flex flex-col gap-3 text-xs tracking-wide text-on-primary/70">
                {socials.map((social) => (
                  <li key={social}>
                    <button
                      type="button"
                      title="Placeholder — official account to be linked"
                      className="cursor-not-allowed text-left text-on-primary/60"
                    >
                      {social}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[10px] leading-relaxed text-on-primary/60">
                Social channels are placeholders in this demonstration and will be connected to the official Maison
                Asili accounts.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:col-span-2">
            <h2 className="mb-5 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
              Gazette Privée
            </h2>
            <p className="mb-4 text-xs leading-relaxed text-on-primary/70">
              Receive invitations to rare harvest releases, seasonal drops, and culinary narratives.
            </p>
            <DemoForm kind="newsletter" className="flex flex-col gap-2" messageClassName="text-[11px] leading-relaxed text-brand-gold">
              <label className="sr-only" htmlFor="footer-newsletter-email">
                Email address
              </label>
              <input
                id="footer-newsletter-email"
                name="email"
                type="email"
                required
                placeholder="Your email address"
                className="w-full border border-brand-gold/30 bg-surface-container-lowest px-3 py-2.5 text-xs text-primary placeholder:text-outline focus:border-brand-gold focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-brand-gold py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition-colors hover:bg-on-primary"
              >
                Subscribe
              </button>
            </DemoForm>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-brand-gold/20 pt-8 text-[11px] uppercase tracking-wider text-on-primary/60 md:flex-row">
          <div>© 2026 Maison Asili • Berlin • Nairobi</div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <LanguageTrigger className="uppercase tracking-wider transition-colors hover:text-brand-gold">
              Language &amp; Translation
            </LanguageTrigger>
            <Link href="/privacy" className="transition-colors hover:text-brand-gold">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-brand-gold">
              Terms &amp; Conditions
            </Link>
            <Link href="/shipping" className="transition-colors hover:text-brand-gold">
              Shipping &amp; Returns
            </Link>
            <Link href="/impressum" className="transition-colors hover:text-brand-gold">
              Legal Notice / Impressum
            </Link>
          </div>
        </div>
        <p className="mt-6 text-center text-[10px] uppercase tracking-wider text-on-primary/60">
          Frontend demonstration storefront — catalogue, prices and checkout are illustrative only.
        </p>
      </div>
    </footer>
  );
}
