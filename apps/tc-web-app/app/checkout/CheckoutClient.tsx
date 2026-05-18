"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { CheckoutEmptyState } from "./parts/CheckoutEmptyState";
import { CheckoutForm } from "./parts/CheckoutForm";
import { CheckoutSuccessState } from "./parts/CheckoutSuccessState";
import { OrderSummary } from "./parts/OrderSummary";

export function CheckoutClient() {
  const router = useRouter();
  const { cart, clearCart, updateQty } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const deliveryFee = 5.0;
  const total = subtotal + tax + deliveryFee;

  const handleCheckout = (event: FormEvent) => {
    event.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
      router.push("/");
    }, 4000);
  };

  if (cart.length === 0 && !isSuccess) {
    return <CheckoutEmptyState onViewMenu={() => router.push("/menu")} />;
  }

  if (isSuccess) {
    return <CheckoutSuccessState />;
  }

  return (
    <div className="min-h-screen bg-cream pt-28 pb-40">
      <div className="container mx-auto max-w-6xl px-6">
        <button
          type="button"
          onClick={() => router.push("/menu")}
          className="mb-12 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/50 transition-colors hover:text-brand-gold"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Menu
        </button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <CheckoutForm onSubmit={handleCheckout} />
          <OrderSummary
            cart={cart}
            subtotal={subtotal}
            tax={tax}
            deliveryFee={deliveryFee}
            total={total}
            onRemoveItem={(name) => updateQty(name, -1)}
          />
        </div>
      </div>
    </div>
  );
}
