"use client";

import { Button } from "@/components/ui/button";

export default function CheckoutError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 py-32 text-center">
      <h1 className="mb-4 font-kaushan text-4xl text-ink">Checkout paused</h1>
      <p className="mb-8 max-w-md text-sm leading-7 text-muted-foreground">
        We could not load the checkout flow. Your cart is still on this device;
        try again or return to the menu.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
