import type { Metadata } from "next";

import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  description: "Complete your Tandoori Corner takeaway or home delivery order.",
  title: "Checkout",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
