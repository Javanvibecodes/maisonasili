import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CartProvider } from '@/components/cart-provider';
import { CartDrawer } from '@/components/cart-drawer';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: {
    default: 'Maison Asili — Afro-Gourmet Luxury',
    template: '%s — Maison Asili'
  },
  description:
    'Purveyors of exceptional Afro-Gourmet botanical treasures, heritage spice blends, hand-harvested salts and botanical teas. Rooted in Africa. Born in Berlin.',
  icons: { icon: '/assets/img/placeholder.svg' }
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
