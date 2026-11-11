import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="w-full bg-background">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center">
        <h1 className="mb-4 font-headline text-4xl font-light tracking-tight text-on-surface sm:text-5xl">
          This page is not in the pantry
        </h1>
        <p className="mb-8 max-w-lg text-sm leading-relaxed text-on-surface-variant">
          The page you are looking for has been moved, renamed or never existed. Return to the collection and continue
          exploring.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="bg-primary px-7 py-3.5 text-xs font-medium uppercase tracking-[0.22em] text-on-primary transition-colors hover:bg-tertiary"
          >
            Explore the Shop
          </Link>
          <Link
            href="/"
            className="border border-outline-variant px-7 py-3.5 text-xs font-medium uppercase tracking-[0.22em] text-on-surface transition-colors hover:border-tertiary hover:text-tertiary"
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
