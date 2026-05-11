"use client";

import {
  Apple,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  MapPin,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCart } from "@/components/cart/use-cart";

export function CheckoutClient() {
  const router = useRouter();
  const { cart, clearCart, updateQty } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const deliveryFee = 5.0;
  const total = subtotal + tax + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
      router.push("/");
    }, 4000);
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="pt-32 pb-40 min-h-screen bg-cream flex flex-col items-center justify-center">
        <h2 className="font-space text-3xl text-ink mb-4">
          Your order is empty
        </h2>
        <p className="text-ink/50 mb-8 font-light">
          Add some items from our menu to begin checkout.
        </p>
        <button
          type="button"
          onClick={() => router.push("/menu")}
          className="bg-brand-gold text-brand-dark px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-cream transition-colors"
        >
          View Menu
        </button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="pt-32 pb-40 min-h-[80vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-brand-gold/20 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-brand-gold" />
        </motion.div>
        <h2 className="font-space text-4xl text-ink mb-4">Order Confirmed!</h2>
        <p className="text-ink/60 mb-8 font-light text-center max-w-md">
          Your order has been successfully placed. We've sent a confirmation to
          your mobile number. Your food will arrive in approximately 45 minutes.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-40 bg-cream min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <button
          type="button"
          onClick={() => router.push("/menu")}
          className="flex items-center gap-2 text-ink/50 hover:text-brand-gold text-xs uppercase tracking-widest font-bold transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Menu
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <div className="mb-10 pb-10 border-b border-border">
              <h1 className="font-space text-4xl text-ink mb-6">Checkout</h1>

              <div className="bg-card border border-border p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-ink text-sm font-medium mb-1">
                    Have an account?
                  </h3>
                  <p className="text-ink/50 text-xs font-light">
                    Log in for a faster checkout and to redeem points.
                  </p>
                </div>
                <button
                  type="button"
                  className="shrink-0 bg-accent hover:bg-accent border border-border text-ink px-6 py-3 text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2"
                >
                  <User className="w-4 h-4" /> Login Provider
                </button>
              </div>
            </div>

            <form onSubmit={handleCheckout} className="space-y-12">
              {/* Contact & Delivery */}
              <section>
                <h3 className="font-space text-2xl text-ink mb-6 flex items-center gap-3">
                  <MapPin className="text-brand-gold w-6 h-6" /> Delivery
                  Details
                </h3>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-ink/50 mb-2 font-bold">
                        First Name
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full bg-transparent border-b border-border pb-2 text-ink focus:border-brand-gold focus:outline-none transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-ink/50 mb-2 font-bold">
                        Last Name
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full bg-transparent border-b border-border pb-2 text-ink focus:border-brand-gold focus:outline-none transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-ink/50 mb-2 font-bold">
                      Delivery Address
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-transparent border-b border-border pb-2 text-ink focus:border-brand-gold focus:outline-none transition-colors"
                      placeholder="123 Balestier Road, #05-12"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-ink/50 mb-2 font-bold">
                        Mobile Number
                      </label>
                      <div className="flex items-center">
                        <span className="text-ink/50 border-b border-border pb-2 pr-2">
                          +65
                        </span>
                        <input
                          required
                          type="tel"
                          className="w-full bg-transparent border-b border-border pb-2 text-ink focus:border-brand-gold focus:outline-none transition-colors pl-2"
                          placeholder="8123 4567"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-ink/50 mb-2 font-bold">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        className="w-full bg-transparent border-b border-border pb-2 text-ink focus:border-brand-gold focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment Info */}
              <section className="pt-6 border-t border-border">
                <h3 className="font-space text-2xl text-ink mb-6 flex items-center gap-3">
                  <CreditCard className="text-brand-gold w-6 h-6" /> Payment
                  Method
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="border border-brand-gold bg-brand-gold/10 p-4 cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-ink text-sm font-medium">
                        Credit Card
                      </span>
                      <div className="w-4 h-4 rounded-full border-4 border-brand-gold"></div>
                    </div>
                    <CreditCard className="w-6 h-6 text-brand-gold/50" />
                  </div>
                  <div className="border border-border bg-card hover:border-primary hover:bg-primary hover:text-primary-foreground p-4 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-ink text-sm font-medium">
                        Apple Pay
                      </span>
                      <div className="w-4 h-4 rounded-full border border-border"></div>
                    </div>
                    <Apple className="w-6 h-6 text-ink/50" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-ink/50 mb-2 font-bold">
                      Card Number
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-transparent border-b border-border pb-2 text-ink font-mono focus:border-brand-gold focus:outline-none transition-colors"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-ink/50 mb-2 font-bold">
                        Expiry Date
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full bg-transparent border-b border-border pb-2 text-ink font-mono focus:border-brand-gold focus:outline-none transition-colors"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-ink/50 mb-2 font-bold">
                        CVC
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full bg-transparent border-b border-border pb-2 text-ink font-mono focus:border-brand-gold focus:outline-none transition-colors"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <button
                type="submit"
                className="w-full bg-brand-gold text-brand-dark px-10 py-5 text-xs uppercase tracking-widest font-bold hover:bg-cream transition-colors mt-8 flex items-center justify-center gap-3"
              >
                Place Order <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-card border border-border p-8 sticky top-32">
              <h3 className="font-space text-2xl text-ink mb-6">
                Order Summary
              </h3>

              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 bg-accent rounded flex items-center justify-center text-brand-gold font-mono text-xs shrink-0 mt-1">
                      {item.qty}x
                    </div>
                    <div className="flex-1">
                      <h4 className="text-ink text-sm font-medium mb-1">
                        {item.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => updateQty(item.name, -1)}
                        className="text-ink/40 hover:text-red-400 text-[10px] uppercase tracking-widest transition-colors font-bold"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="text-ink font-medium shrink-0">
                      ${(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-border text-sm">
                <div className="flex justify-between items-center text-ink/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-ink/70">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-ink/70">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-ink pt-4 border-t border-border mt-4 mb-2">
                  <span className="text-lg font-space font-bold">Total</span>
                  <span className="text-2xl font-space font-bold text-brand-gold">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
