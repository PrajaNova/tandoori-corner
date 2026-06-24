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
    <div className="min-h-screen bg-cream pb-40">
      <section className="relative flex items-center justify-center min-h-[340px] pt-24">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/granny/granny_page-title_7.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 z-0 bg-black/65" />
        <div className="relative z-10 text-center px-4">
          <span className="font-script text-primary text-3xl md:text-4xl mb-1 block">
            Almost yours
          </span>
          <h1 className="font-kaushan text-5xl md:text-6xl text-white capitalize mb-6 leading-tight">
            Checkout
          </h1>
          <ol className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase text-white/80">
            <li>
              <a href="/" className="hover:text-primary transition-colors">
                Home
              </a>
            </li>
            <li className="text-white/40">/</li>
            <li>
              <a href="/order" className="hover:text-primary transition-colors">
                Order
              </a>
            </li>
            <li className="text-white/40">/</li>
            <li className="text-primary">Checkout</li>
          </ol>
        </div>
      </section>
      <div className="container mx-auto max-w-6xl px-6 pt-16">
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
