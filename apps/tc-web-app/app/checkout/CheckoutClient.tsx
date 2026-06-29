"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { CheckoutEmptyState } from "@/components/checkout/CheckoutEmptyState";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutSuccessState } from "@/components/checkout/CheckoutSuccessState";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { useCart } from "@/hooks/use-cart";

export function CheckoutClient() {
  const router = useRouter();
  const { cart, clearCart, updateQty } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.09;
  const deliveryFee = 5.0;
  const total = subtotal + tax + deliveryFee;

  const handleCheckout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const form = new FormData(event.currentTarget);
    const firstName = String(form.get("firstName") ?? "").trim();
    const lastName = String(form.get("lastName") ?? "").trim();
    const mobile = String(form.get("mobile") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const address = String(form.get("address") ?? "").trim();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000"}/api/orders`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            customer: {
              name: `${firstName} ${lastName}`.trim(),
              phone: mobile.startsWith("+65") ? mobile : `+65${mobile}`,
              email,
            },
            fulfillment: {
              type: "delivery",
              address,
            },
            items: cart.map((item) => ({
              menuItemId: item.menuItemId,
              quantity: item.qty,
            })),
          }),
        },
      );
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          body.message ?? "We could not create your order. Please try again.",
        );
      }

      setOrderId(body.order?.id);
      clearCart();
      setIsSuccess(true);
    } catch (checkoutError) {
      setError((checkoutError as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && !isSuccess) {
    return <CheckoutEmptyState onViewMenu={() => router.push("/menu")} />;
  }

  if (isSuccess) {
    return <CheckoutSuccessState orderId={orderId} />;
  }

  return (
    <div className="container mx-auto max-w-6xl px-6 pt-16">
      <button
        type="button"
        onClick={() => router.push("/menu")}
        className="mb-12 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/50 transition-colors hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Menu
      </button>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
        <CheckoutForm
          error={error}
          isSubmitting={isSubmitting}
          onSubmit={handleCheckout}
        />
        <OrderSummary
          cart={cart}
          subtotal={subtotal}
          tax={tax}
          deliveryFee={deliveryFee}
          total={total}
          onRemoveItem={(menuItemId) => updateQty(menuItemId, -1)}
        />
      </div>
    </div>
  );
}
