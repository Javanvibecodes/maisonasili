import type { Metadata } from 'next';
import { CartPageContent } from '@/components/cart-page';

export const metadata: Metadata = {
  title: 'Shopping Bag',
  description: 'Your Maison Asili shopping bag — saved locally in this browser.'
};

export default function CartPage() {
  return (
    <main className="w-full bg-background">
      <CartPageContent />
    </main>
  );
}
