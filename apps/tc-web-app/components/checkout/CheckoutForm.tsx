"use client";

import { ChevronRight, CreditCard, MapPin, User } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { FormField } from "@/components/common/forms/FormField";
import { checkoutDeliveryFields } from "@/data/checkout";

type CheckoutFormProps = {
  error?: string | null;
  isSubmitting?: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function CheckoutForm({
  error,
  isSubmitting = false,
  onSubmit,
}: CheckoutFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="lg:col-span-7">
      <div className="mb-10 border-b border-border pb-10">
        <div className="flex flex-col items-center justify-between gap-6 border border-border bg-card p-6 sm:flex-row">
          <div>
            <h3 className="mb-1 text-sm font-medium text-ink">
              Have an account?
            </h3>
            <p className="text-xs font-light text-ink/50">
              Log in for a faster checkout and to redeem points.
            </p>
          </div>
          <button
            type="button"
            className="flex shrink-0 items-center gap-2 border border-border bg-accent px-6 py-3 text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-accent"
          >
            <User className="h-4 w-4" /> Login Provider
          </button>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-12">
        <section>
          <h3 className="mb-6 flex items-center gap-3 font-kaushan text-2xl text-ink">
            <MapPin className="h-6 w-6 text-brand-gold" /> Delivery Details
          </h3>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {checkoutDeliveryFields.map((field) => (
                <div
                  key={field.id}
                  className={field.fullWidth ? "md:col-span-2" : ""}
                >
                  <FormField label={field.label} htmlFor={field.id} required>
                    {field.type === "tel" && field.id === "mobile" ? (
                      <div className="flex items-center">
                        <span className="border-b border-border pb-2 pr-2 text-ink/50">
                          +65
                        </span>
                        <input
                          required
                          autoComplete={field.autoComplete}
                          id={field.id}
                          inputMode={field.inputMode}
                          name={field.id}
                          type={field.type}
                          className="w-full border-b border-border bg-transparent pb-2 pl-2 text-ink transition-colors focus:border-brand-gold focus:outline-none"
                          placeholder={field.placeholder}
                        />
                      </div>
                    ) : (
                      <input
                        required
                        autoComplete={field.autoComplete}
                        id={field.id}
                        inputMode={field.inputMode}
                        name={field.id}
                        type={field.type}
                        className="w-full border-b border-border bg-transparent pb-2 text-ink transition-colors focus:border-brand-gold focus:outline-none"
                        placeholder={field.placeholder}
                        spellCheck={field.type === "email" ? false : undefined}
                      />
                    )}
                  </FormField>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border pt-6">
          <h3 className="mb-6 flex items-center gap-3 font-kaushan text-2xl text-ink">
            <CreditCard className="h-6 w-6 text-brand-gold" /> Payment Method
          </h3>

          <fieldset className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <legend className="sr-only">Payment Method</legend>
            <label className="cursor-pointer border border-brand-gold bg-brand-gold/10 p-4 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-gold">
              <input
                checked={paymentMethod === "card"}
                className="sr-only"
                name="paymentMethod"
                onChange={() => setPaymentMethod("card")}
                type="radio"
                value="card"
              />
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-ink">
                  Stripe card payment
                </span>
                <span className="h-4 w-4 rounded-full border-4 border-brand-gold" />
              </div>
              <CreditCard className="h-6 w-6 text-brand-gold/50" />
            </label>
            <label className="cursor-pointer border border-border bg-card p-4 transition-colors hover:border-primary hover:bg-primary/10 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-gold">
              <input
                checked={paymentMethod === "pay-at-counter"}
                className="sr-only"
                name="paymentMethod"
                onChange={() => setPaymentMethod("pay-at-counter")}
                type="radio"
                value="pay-at-counter"
              />
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-ink">
                  Pay at counter
                </span>
                <span
                  className={`h-4 w-4 rounded-full ${
                    paymentMethod === "pay-at-counter"
                      ? "border-4 border-brand-gold"
                      : "border border-border"
                  }`}
                />
              </div>
              <CreditCard className="h-6 w-6 text-ink/50" />
            </label>
          </fieldset>

          <p className="text-sm text-ink/60">
            Card details are handled by Stripe after your order is created.
          </p>
        </section>

        {error ? (
          <p className="border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-8 flex w-full items-center justify-center gap-3 bg-brand-gold px-10 py-5 text-xs font-bold uppercase tracking-widest text-brand-dark transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating Order" : "Place Order"}{" "}
          <ChevronRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
