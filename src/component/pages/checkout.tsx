"use client";

import { ArrowLeft, CreditCard, Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useCart } from "@/component/cart-provider";

export function CheckoutPage() {
  const { cartItems, updateQuantity, removeFromCart, totalAmount, clearCart } =
    useCart();

  const handleCheckout = () => {
    alert(
      "Thank you for your order. Payment integration can be connected next.",
    );
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-4 pt-40 pb-32 text-center">
        <div className="w-full max-w-lg rounded-card border border-black/5 bg-white p-12 shadow-card">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-cream">
            <Trash2 className="text-ink/20" size={40} />
          </div>
          <h2 className="mb-4 font-serif text-3xl text-ink">
            Your Cart is Empty
          </h2>
          <p className="mb-8 text-ink/60">
            Explore our menu and add North Indian dishes to your order.
          </p>
          <Link
            className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3 font-medium text-white tracking-wide transition-colors hover:bg-tandoori-dark"
            href="/menu"
          >
            <ArrowLeft size={18} /> Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const tax = totalAmount * 0.08;
  const deliveryFee = 5.0;
  const finalTotal = totalAmount + tax + deliveryFee;

  return (
    <div className="min-h-screen bg-cream px-4 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-12 font-serif text-4xl text-ink md:text-5xl">
          Checkout
        </h1>

        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="w-full lg:w-2/3">
            <div className="overflow-hidden rounded-card border border-black/5 bg-white shadow-card">
              <div className="border-black/5 border-b p-6 md:p-8">
                <h2 className="font-bold text-ink/50 text-sm uppercase tracking-widest">
                  Your Order
                </h2>
              </div>
              <div className="space-y-6 p-6 md:p-8">
                {cartItems.map((item) => (
                  <motion.div
                    className="flex flex-col items-start justify-between gap-4 border-black/5 border-b pb-6 last:border-0 last:pb-0 sm:flex-row sm:items-center"
                    key={item.id}
                    layout
                  >
                    <div className="flex-1">
                      <h3 className="font-serif text-ink text-xl">
                        {item.name}
                      </h3>
                      <p className="font-medium text-brand">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-4 rounded-full border border-ink/10 bg-cream px-4 py-2 text-ink">
                        <button
                          className="transition-colors hover:text-brand"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          type="button"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-4 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          className="transition-colors hover:text-brand"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          type="button"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="w-20 text-right font-medium text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>

                      <button
                        className="p-2 text-ink/30 transition-colors hover:text-red-500"
                        onClick={() => removeFromCart(item.id)}
                        type="button"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <Link
              className="mt-8 inline-flex items-center gap-2 font-medium text-ink/60 transition-colors hover:text-brand"
              href="/menu"
            >
              <ArrowLeft size={18} /> Continue Shopping
            </Link>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="sticky top-32 rounded-card border border-black/5 bg-white p-6 shadow-card md:p-8">
              <h2 className="mb-6 border-black/5 border-b pb-4 font-bold text-ink/50 text-sm uppercase tracking-widest">
                Order Summary
              </h2>

              <div className="mb-8 space-y-4 text-ink/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-ink">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span className="font-medium text-ink">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-ink">
                    ${deliveryFee.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 mb-8 flex items-end justify-between border-black/10 border-t pt-6">
                <span className="font-serif text-xl">Total</span>
                <span className="font-serif text-3xl text-brand">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              <div className="mb-8 space-y-4">
                <input
                  className="w-full rounded-xl border border-ink/5 bg-cream px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  placeholder="Full Name"
                  type="text"
                />
                <input
                  className="w-full rounded-xl border border-ink/5 bg-cream px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  placeholder="Delivery Address"
                  type="text"
                />
                <input
                  className="w-full rounded-xl border border-ink/5 bg-cream px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  placeholder="Phone Number"
                  type="text"
                />
              </div>

              <button
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-brand py-4 font-bold text-white uppercase tracking-wide shadow-brand/30 shadow-lg transition-colors hover:bg-tandoori-dark"
                onClick={handleCheckout}
                type="button"
              >
                <CreditCard size={20} /> Place Order - ${finalTotal.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
