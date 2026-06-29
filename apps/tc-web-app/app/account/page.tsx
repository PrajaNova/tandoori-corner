import type { Metadata } from "next";
import { AccountClient } from "./AccountClient";

export const metadata: Metadata = {
  title: "Account | Tandoori Corner",
  description:
    "View your Tandoori Corner orders, bookings, and event enquiries.",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <main className="bg-cream">
      <section className="container mx-auto max-w-5xl px-6 py-20">
        <p className="font-script text-3xl text-brand-gold">Account</p>
        <h1 className="mt-2 font-kaushan text-5xl text-ink">
          Your Tandoori Corner history
        </h1>
        <p className="mt-5 max-w-2xl leading-relaxed text-ink/65">
          Sign in with a one-time code to see orders, bookings, and private
          event enquiries linked to your email or WhatsApp number.
        </p>
        <div className="mt-10">
          <AccountClient />
        </div>
      </section>
    </main>
  );
}
