import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { legalPages } from '@/lib/catalog';

interface LegalPageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: LegalPageProps): Metadata {
  const page = legalPages.find((item) => item.slug === params.slug);
  if (!page) return { title: 'Not found' };
  return { title: page.title, description: page.intro };
}

export default function LegalPage({ params }: LegalPageProps) {
  const page = legalPages.find((item) => item.slug === params.slug);
  if (!page) notFound();

  return (
    <main className="w-full bg-background">
      <div className="mx-auto w-full max-w-4xl px-6 py-8 lg:px-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant"
        >
          <Link href="/" className="transition-colors hover:text-on-surface">
            Home
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="font-semibold text-on-surface">{page.title}</span>
        </nav>

        <h1 className="mb-5 font-headline text-4xl font-light tracking-tight text-on-surface sm:text-5xl">{page.title}</h1>
        <p className="max-w-2xl border-b border-outline-variant pb-8 text-sm font-light leading-relaxed text-on-surface-variant sm:text-base">
          {page.intro}
        </p>

        <div className="mt-10 flex flex-col gap-10">
          {page.sections.map((section) => (
            <section key={section.h}>
              <h2 className="mb-3 font-headline text-xl font-semibold text-on-surface">{section.h}</h2>
              <div className="flex flex-col gap-3 text-sm leading-relaxed text-on-surface-variant">
                {section.p.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-outline-variant pt-6 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          {legalPages
            .filter((item) => item.slug !== page.slug)
            .map((item) => (
              <Link key={item.slug} href={`/${item.slug}`} className="transition-colors hover:text-tertiary">
                {item.title}
              </Link>
            ))}
          <Link href="/contact" className="transition-colors hover:text-tertiary">
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}
