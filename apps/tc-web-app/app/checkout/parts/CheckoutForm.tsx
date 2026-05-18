import { Apple, ChevronRight, CreditCard, MapPin, User } from "lucide-react";
import type { FormEvent } from "react";
import { FormField } from "@/components/common/forms/FormField";
import { checkoutDeliveryFields, checkoutPaymentFields } from "@/data/checkout";

type CheckoutFormProps = {
  onSubmit: (event: FormEvent) => void;
};

export function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  return (
    <div className="lg:col-span-7">
      <div className="mb-10 border-b border-border pb-10">
        <h1 className="mb-6 font-space text-4xl text-ink">Checkout</h1>

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
          <h3 className="mb-6 flex items-center gap-3 font-space text-2xl text-ink">
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
                          id={field.id}
                          type={field.type}
                          className="w-full border-b border-border bg-transparent pb-2 pl-2 text-ink transition-colors focus:border-brand-gold focus:outline-none"
                          placeholder={field.placeholder}
                        />
                      </div>
                    ) : (
                      <input
                        required
                        id={field.id}
                        type={field.type}
                        className="w-full border-b border-border bg-transparent pb-2 text-ink transition-colors focus:border-brand-gold focus:outline-none"
                        placeholder={field.placeholder}
                      />
                    )}
                  </FormField>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border pt-6">
          <h3 className="mb-6 flex items-center gap-3 font-space text-2xl text-ink">
            <CreditCard className="h-6 w-6 text-brand-gold" /> Payment Method
          </h3>

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="cursor-pointer border border-brand-gold bg-brand-gold/10 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-ink">
                  Credit Card
                </span>
                <div className="h-4 w-4 rounded-full border-4 border-brand-gold" />
              </div>
              <CreditCard className="h-6 w-6 text-brand-gold/50" />
            </div>
            <div className="cursor-pointer border border-border bg-card p-4 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-ink">Apple Pay</span>
                <div className="h-4 w-4 rounded-full border border-border" />
              </div>
              <Apple className="h-6 w-6 text-ink/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {checkoutPaymentFields.map((field) => (
              <div key={field.id}>
                <FormField label={field.label} htmlFor={field.id} required>
                  <input
                    required
                    id={field.id}
                    type={field.type}
                    className="w-full border-b border-border bg-transparent pb-2 font-sans text-ink transition-colors focus:border-brand-gold focus:outline-none"
                    placeholder={field.placeholder}
                  />
                </FormField>
              </div>
            ))}
          </div>
        </section>

        <button
          type="submit"
          className="mt-8 flex w-full items-center justify-center gap-3 bg-brand-gold px-10 py-5 text-xs font-bold uppercase tracking-widest text-brand-dark transition-colors hover:bg-cream"
        >
          Place Order <ChevronRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
