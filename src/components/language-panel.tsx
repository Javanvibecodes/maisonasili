'use client';

import * as React from 'react';

export function openLanguagePanel() {
  window.dispatchEvent(new Event('maison-language-open'));
}

export function LanguageTrigger({
  className = '',
  children
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button type="button" onClick={openLanguagePanel} className={className}>
      {children ?? 'Language & Translation'}
    </button>
  );
}

const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });

function detectBrowserLanguage(): string {
  if (typeof navigator === 'undefined') return 'English';
  const code = navigator.languages?.[0] ?? navigator.language;
  if (!code) return 'English';
  try {
    const name = languageNames.of(code);
    return name ? `${name} (${code})` : code;
  } catch {
    return code;
  }
}

export function LanguagePanel() {
  const [open, setOpen] = React.useState(false);
  const [detected, setDetected] = React.useState('English');

  React.useEffect(() => {
    const handleOpen = () => {
      setDetected(detectBrowserLanguage());
      setOpen(true);
    };
    window.addEventListener('maison-language-open', handleOpen);
    return () => window.removeEventListener('maison-language-open', handleOpen);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[65]">
      <div className="absolute inset-0 bg-primary/65" onClick={() => setOpen(false)} aria-hidden="true" />
      <div className="relative flex min-h-full items-center justify-center p-5 sm:p-8">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="language-title"
          className="w-full max-w-lg border border-brand-gold/40 bg-surface-container-lowest p-6 shadow-2xl sm:p-9"
        >
          <div className="flex items-start justify-between gap-6 border-b border-outline-variant pb-5">
            <div className="flex items-start gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-surface-container text-tertiary">
                <span aria-hidden="true" className="material-symbols-outlined text-xl">translate</span>
              </span>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-tertiary">Language</span>
                <h2 id="language-title" className="mt-1 font-headline text-2xl font-semibold text-primary">
                  Read Maison Asili in your language
                </h2>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close language panel"
              className="p-1.5 text-on-surface transition-colors hover:text-tertiary"
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true" className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="border border-brand-gold/50 bg-surface-container-low px-4 py-3.5">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-tertiary">
                Website language
              </span>
              <strong className="font-headline text-lg text-primary">English</strong>
              <span className="mt-0.5 block text-[11px] text-on-surface-variant">Canonical source content</span>
            </div>
            <div className="border border-outline-variant bg-surface-container-low px-4 py-3.5">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-tertiary">
                Your browser prefers
              </span>
              <strong className="font-headline text-lg text-primary">{detected}</strong>
              <span className="mt-0.5 block text-[11px] text-on-surface-variant">
                Detected locally, never sent anywhere
              </span>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-on-surface-variant">
            This website is published in English. Your browser can translate it using its built-in translation feature.
          </p>

          <div className="mt-5 border-l-2 border-brand-gold bg-surface-container-low p-4">
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">How to translate</h3>
            <ul className="flex list-none flex-col gap-2 text-xs leading-relaxed text-on-surface-variant">
              <li>
                <strong className="text-primary">Chrome / Edge:</strong> right-click the page and choose “Translate
                to…”, or use the translate icon in the address bar.
              </li>
              <li>
                <strong className="text-primary">Safari:</strong> choose View → Translation.
              </li>
              <li>
                <strong className="text-primary">Firefox:</strong> use the translation icon in the address bar.
              </li>
            </ul>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xs text-[11px] leading-relaxed text-outline">
              Browser translation is controlled by your browser. Maison Asili does not force or automate the native
              translation prompt.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="whitespace-nowrap bg-primary px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-on-primary transition-colors hover:bg-brand-gold hover:text-primary"
            >
              Continue in English
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
