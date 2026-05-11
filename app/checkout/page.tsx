import type { Metadata } from "next";

import { AppShell } from "@/components/layout/AppShell";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  description: "Complete your Tandoori Corner takeaway or home delivery order.",
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <AppShell>
      <CheckoutClient />
    </AppShell>
  );
}
