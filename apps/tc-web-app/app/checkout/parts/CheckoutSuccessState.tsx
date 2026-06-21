import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export function CheckoutSuccessState() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center pt-32 pb-40">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-brand-gold/20"
      >
        <CheckCircle2 className="h-12 w-12 text-brand-gold" />
      </motion.div>
      <h2 className="mb-4 font-kaushan text-4xl text-ink">Order Confirmed!</h2>
      <p className="mb-8 max-w-md text-center font-light text-ink/60">
        Your order has been successfully placed. We&apos;ve sent a confirmation
        to your mobile number. Your food will arrive in approximately 45
        minutes.
      </p>
    </div>
  );
}
