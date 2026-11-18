import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CartProvider } from '@/components/cart-provider';
import { CartDrawer } from '@/components/cart-drawer';
import { ScrollIndicator } from '@/components/scroll-indicator';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: {
    default: 'Maison Asili — Afro-Gourmet Product House',
    template: '%s — Maison Asili'
  },
  description:
    'An Afro-Gourmet product house rooted in Africa and born in Berlin. Heritage spice blends, botanical finishing salts, rare African teas and cold-pressed culinary oils for professional buyers and discerning tables.',
  icons: { icon: '/assets/img/logo.png' }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#380A36'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Preload critical Latin subset fonts to eliminate render-blocking round trips */}
        <link
          rel="preload"
          href="/assets/fonts/public-sans-6e68d19a.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/cormorant-abcaa8b4.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/assets/css/fonts.css" />
      </head>
      <body className="bg-background font-body text-on-surface antialiased">
        <CartProvider>
          <SiteHeader />
          <div className="pt-20">{children}</div>
          <SiteFooter />
          <ScrollIndicator />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
