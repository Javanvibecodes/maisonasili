import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CartProvider } from '@/components/cart-provider';
import { CartDrawer } from '@/components/cart-drawer';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: {
    default: 'Maison Asili — Afro-Gourmet Product House',
    template: '%s — Maison Asili'
  },
  description:
    'An Afro-Gourmet product house rooted in Africa and born in Berlin. Heritage spice blends, botanical finishing salts and rare African teas for professional buyers and discerning tables.',
  icons: { icon: '/assets/img/brand-logo-gold.jpg' }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#210B36'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="stylesheet" href="/assets/css/fonts.css" />
      </head>
      <body className="bg-background font-body text-on-surface antialiased">
        <CartProvider>
          <SiteHeader />
          <div className="pt-20">{children}</div>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
