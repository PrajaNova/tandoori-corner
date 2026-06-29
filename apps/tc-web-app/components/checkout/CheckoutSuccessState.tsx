import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

type CheckoutSuccessStateProps = {
  orderId?: string;
};

export function CheckoutSuccessState({ orderId }: CheckoutSuccessStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <motion.div
        initial={{ opacity: 0, transform: "scale(0.95)" }}
        animate={{ opacity: 1, transform: "scale(1)" }}
        className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-brand-gold/20"
      >
        <CheckCircle2 className="h-12 w-12 text-brand-gold" />
      </motion.div>
      <h2 className="mb-4 font-kaushan text-4xl text-ink">Order received</h2>
      <p className="mb-8 max-w-md text-center font-light text-ink/60">
        Your order has been created and Stripe payment has been initialized.
        We&apos;ll send a confirmation once payment is complete.
      </p>
      {orderId ? (
        <p className="text-xs font-bold uppercase tracking-widest text-ink/40">
          Order {orderId}
        </p>
      ) : null}
      <Link
        href="/account"
        className="mt-6 text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-ink"
      >
        View account
      </Link>
    </div>
  );
}
