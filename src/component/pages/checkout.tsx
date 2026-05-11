"use client";

import { ArrowLeft, CreditCard, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/component/cart-provider";

export function CheckoutPage() {
  const { cartItems, updateQuantity, removeFromCart, totalAmount, clearCart } =
    useCart();

  const tax = totalAmount * 0.08;
  const deliveryFee = cartItems.length > 0 ? 5 : 0;
  const finalTotal = totalAmount + tax + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4 pt-32 pb-24 text-center">
        <div className="max-w-lg rounded-card border border-black/5 bg-white p-10 shadow-card">
          <Trash2 className="mx-auto mb-6 text-ink/25" size={44} />
          <h1 className="mb-4 font-serif text-3xl text-ink">
            Your Cart is Empty
          </h1>
          <p className="mb-8 text-ink/65">
            Explore the menu and add dishes to begin your order.
          </p>
          <Link
            className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3 font-semibold text-white"
            href="/menu"
          >
            <ArrowLeft size={18} /> Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-4 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-10 font-serif text-4xl text-ink md:text-5xl">
          Checkout
        </h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="rounded-card border border-black/5 bg-white p-6 shadow-card">
            <h2 className="mb-6 font-bold text-ink/50 text-sm uppercase tracking-widest">
              Your Order
            </h2>
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  className="flex flex-col gap-4 border-black/5 border-b pb-5 last:border-0 sm:flex-row sm:items-center sm:justify-between"
                  key={item.id}
                >
                  <div>
                    <h3 className="font-serif text-2xl text-ink">
                      {item.name}
                    </h3>
                    <p className="font-semibold text-brand">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      type="button"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      type="button"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => removeFromCart(item.id)}
                      type="button"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-card border border-black/5 bg-white p-6 shadow-card">
            <h2 className="mb-6 font-bold text-ink/50 text-sm uppercase tracking-widest">
              Order Summary
            </h2>
            <div className="space-y-4 text-ink/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-black/10 border-t pt-5 font-serif text-2xl text-ink">
                <span>Total</span>
                <span className="text-brand">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-brand py-4 font-bold text-white uppercase tracking-wide"
              onClick={clearCart}
              type="button"
            >
              <CreditCard size={20} /> Place Order
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
