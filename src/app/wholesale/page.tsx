import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { DemoForm } from '@/components/demo-form';
import { assetPath, media } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Wholesale & Hospitality',
  description:
    'Heritage spice blends, botanical finishing salts and rare African teas for delicatessens, restaurants, hotels and corporate gifting.'
};

const segments = [
  ['storefront', 'Delicatessens', 'Shelf-ready provisions with an editorial story your customers can repeat.'],
  ['shopping_basket', 'Gourmet Food Shops', 'Curated ranges across spice, salt and tea categories.'],
  ['hotel', 'Hotels & Breakfast', 'Consistent formats for room, breakfast and minibar service.'],
  ['restaurant', 'Restaurants', 'Finishing salts, spice blends and teas for the pass and the plate.'],
  ['local_cafe', 'Cafés', 'Single-origin African tea service with retail caddies to take home.'],
  ['redeem', 'Corporate Gifting', 'Considered gifts for clients, teams and diplomatic occasions.'],
  ['handshake', 'Selected Retail Partners', 'Long-term collaborations with stores that share our standards.']
];

const inputClass =
  'border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-tertiary focus:outline-none';
const labelClass = 'text-[11px] font-semibold uppercase tracking-[0.2em] text-on-surface';

export default function WholesalePage() {
  return (
    <main className="w-full bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant"
        >
          <Link href="/" className="transition-colors hover:text-on-surface">
            Home
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="font-semibold text-on-surface">Wholesale &amp; Hospitality</span>
        </nav>

        <section className="grid grid-cols-1 items-center gap-10 py-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h1 className="mb-6 font-headline text-4xl font-light leading-[1.08] tracking-tight text-on-surface sm:text-5xl lg:text-6xl">
              Exceptional Ingredients for Exceptional Tables
            </h1>
            <p className="mb-6 text-sm font-light leading-relaxed text-on-surface-variant sm:text-base">
              Maison Asili supplies the ingredients that make a menu memorable: heritage spice blends, botanical
              finishing salts and rare African teas for rooms that care about every detail on the plate.
            </p>
            <p className="mb-8 text-xs font-light leading-relaxed text-on-surface-variant sm:text-sm">
              Whether you run a delicatessen, a restaurant, a hotel breakfast service or a corporate gifting programme,
              tell us what you are building and we will prepare a proposal for you.
            </p>
            <a
              href="#enquiry"
              className="inline-flex items-center gap-2 bg-on-surface px-8 py-3.5 text-xs font-medium uppercase tracking-[0.22em] text-surface-container-lowest transition-colors hover:bg-primary"
            >
              Start an enquiry
              <span aria-hidden="true" className="material-symbols-outlined text-sm">
                south_east
              </span>
            </a>
          </div>
          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-container shadow-sm sm:aspect-[3/2] lg:aspect-[4/5]">
              <Image
                src={assetPath(media.hero)}
                alt="Maison Asili provisions staged for a professional kitchen"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-16 border-t border-outline-variant pt-12">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="font-headline text-3xl font-light tracking-tight text-on-surface">
                Partnerships built around the table
              </h2>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-on-surface-variant">
              Commercial terms, minimum volumes and trade pricing are deliberately not stated here — they will be
              agreed individually with each partner.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px border border-outline-variant bg-outline-variant sm:grid-cols-2 lg:grid-cols-4">
            {segments.map(([icon, title, body]) => (
              <div key={title} className="flex flex-col gap-3 bg-surface-container-lowest p-6">
                <span aria-hidden="true" className="material-symbols-outlined text-2xl text-tertiary">
                  {icon}
                </span>
                <h3 className="font-headline text-lg font-semibold text-on-surface">{title}</h3>
                <p className="text-xs leading-relaxed text-on-surface-variant">{body}</p>
              </div>
            ))}
            <div className="flex flex-col justify-between gap-3 bg-charcoal p-6">
              <div className="flex flex-col gap-3">
                <span aria-hidden="true" className="material-symbols-outlined text-2xl text-brand-gold">
                  mail
                </span>
                <h3 className="font-headline text-lg font-semibold text-white">Talk to us directly</h3>
                <p className="text-xs leading-relaxed text-white/70">
                  Buyer enquiries:{' '}
                  <a href="mailto:info@maisonasili.com" className="text-brand-gold transition-colors hover:text-white">
                    info@maisonasili.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 scroll-mt-32" id="enquiry">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="mb-5 font-headline text-3xl font-light tracking-tight text-on-surface">
                Tell us about your business
              </h2>
              <p className="mb-6 text-sm font-light leading-relaxed text-on-surface-variant">
                Share a few details and we will prepare an overview of formats, ranges and next steps for your business
                type.
              </p>
              <div className="border border-outline-variant bg-tertiary-container p-5">
                <p className="text-xs leading-relaxed text-on-tertiary-container">
                  <strong>Demonstration form:</strong> your enquiry is validated in the browser and shown as a
                  confirmation only — nothing is sent to Maison Asili yet.
                </p>
              </div>
            </div>

            <div className="border border-outline-variant bg-surface-container-lowest p-6 sm:p-8 lg:col-span-8">
              <DemoForm kind="wholesale" className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className={labelClass}>
                      Full name <span className="text-tertiary">*</span>
                    </span>
                    <input name="name" type="text" required placeholder="Your full name" className={inputClass} />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className={labelClass}>
                      Business name <span className="text-tertiary">*</span>
                    </span>
                    <input name="business" type="text" required placeholder="Company or venue" className={inputClass} />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className={labelClass}>
                      Email <span className="text-tertiary">*</span>
                    </span>
                    <input name="email" type="email" required placeholder="you@business.com" className={inputClass} />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className={labelClass}>
                      Phone{' '}
                      <span className="font-normal normal-case tracking-normal text-on-surface-variant">(optional)</span>
                    </span>
                    <input name="phone" type="tel" placeholder="+49 …" className={inputClass} />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className={labelClass}>
                      Business type <span className="text-tertiary">*</span>
                    </span>
                    <select name="type" required defaultValue="" className={inputClass}>
                      <option value="">Please select</option>
                      <option>Delicatessen</option>
                      <option>Gourmet food shop</option>
                      <option>Hotel</option>
                      <option>Restaurant</option>
                      <option>Café</option>
                      <option>Corporate gifting</option>
                      <option>Selected retail partner</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className={labelClass}>
                      Country <span className="text-tertiary">*</span>
                    </span>
                    <input name="country" type="text" required placeholder="Country of operation" className={inputClass} />
                  </label>
                </div>

                <fieldset className="flex flex-col gap-3">
                  <legend className={`${labelClass} mb-1`}>
                    Product interests <span className="text-tertiary">*</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {['Spice blends', 'Salts', 'Teas', 'Gift ranges'].map((interest, index) => (
                      <label
                        key={interest}
                        className="inline-flex cursor-pointer items-center gap-2 border border-outline-variant px-4 py-2.5 transition-colors hover:border-tertiary"
                      >
                        <input
                          type="checkbox"
                          name="interests"
                          value={interest}
                          required={index === 0}
                          className="accent-tertiary"
                        />
                        <span className="text-xs text-on-surface">{interest}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="flex flex-col gap-2">
                  <span className={labelClass}>
                    Estimated order volume{' '}
                    <span className="font-normal normal-case tracking-normal text-on-surface-variant">(optional)</span>
                  </span>
                  <select name="volume" className={inputClass} defaultValue="">
                    <option value="">Not sure yet</option>
                    <option>Trial order</option>
                    <option>Monthly recurring</option>
                    <option>Seasonal programme</option>
                    <option>One-off event or gifting</option>
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className={labelClass}>
                    Message <span className="text-tertiary">*</span>
                  </span>
                  <textarea
                    name="message"
                    required
                    placeholder="Tell us about your business, your guests and what you are looking for."
                    className={`${inputClass} min-h-[140px] resize-y`}
                  />
                </label>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    className="bg-on-surface px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-surface-container-lowest transition-colors hover:bg-primary"
                  >
                    Submit Enquiry
                  </button>
                  <span className="text-[11px] text-on-surface-variant">
                    or write to{' '}
                    <a href="mailto:info@maisonasili.com" className="text-tertiary transition-colors hover:text-on-surface">
                      info@maisonasili.com
                    </a>
                  </span>
                </div>
              </DemoForm>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
