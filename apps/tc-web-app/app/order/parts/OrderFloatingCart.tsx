"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";

export function OrderFloatingCart() {
  const { cart } = useCart();
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (totalCount === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink text-white">
      <div className="container mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <span className="text-sm">
            <span className="font-bold">{totalCount}</span>{" "}
            {totalCount === 1 ? "item" : "items"}
            <span className="mx-2 text-white/30">·</span>
            <span className="font-bold text-primary">
              ${totalPrice.toFixed(2)}
            </span>
          </span>
        </div>
        <Link
          href="/checkout"
          className="bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-ink"
        >
          View Cart &amp; Checkout
        </Link>
      </div>
    </div>
  );
}
