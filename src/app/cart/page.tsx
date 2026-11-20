import type { Metadata } from 'next';
import { CartPageContent } from '@/components/cart-page';

export const metadata: Metadata = {
  title: 'Enquiry Selection',
  description:
    'Build your Maison Asili enquiry selection. We confirm availability, pricing, and collection or delivery options with you personally.'
};

export default function CartPage() {
  return (
    <main className="w-full bg-background">
      <CartPageContent />
    </main>
  );
}
