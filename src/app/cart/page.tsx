import type { Metadata } from 'next';
import { CartPageContent } from '@/components/cart-page';

export const metadata: Metadata = {
  title: 'Order Cart',
  description:
    'Build a wholesale order request for Maison Asili. Trade pricing and availability are confirmed after your request is reviewed.'
};

export default function CartPage() {
  return (
    <main className="w-full bg-background">
      <CartPageContent />
    </main>
  );
}
