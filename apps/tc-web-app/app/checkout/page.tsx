import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";

import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/checkout",
  title: "Checkout",
  description: "Complete your Tandoori Corner takeaway or home delivery order.",
  noIndex: true,
});

export default function CheckoutPage() {
  return <CheckoutClient />;
}
