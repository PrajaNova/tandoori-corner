import type { Metadata } from "next";
import { CheckoutHero } from "@/components/checkout/CheckoutHero";
import { buildPageMetadata } from "@/lib/seo";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/checkout",
  title: "Checkout",
  description: "Complete your Tandoori Corner takeaway or home delivery order.",
  noIndex: true,
});

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-cream pb-40">
      <CheckoutHero />
      <CheckoutClient />
    </div>
  );
}
