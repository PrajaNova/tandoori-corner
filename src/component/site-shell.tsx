"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/component/cart-provider";
import { Footer } from "@/component/footer";
import { Navbar } from "@/component/navbar";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-cream font-sans selection:bg-brand selection:text-cream">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
