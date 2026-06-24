import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";

import { CheckoutClient } from "./CheckoutClient";
import { CheckoutHero } from "./parts/CheckoutHero";

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
