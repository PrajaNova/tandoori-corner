"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";

export function HeaderCart() {
  const { cart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = mounted ? cart.reduce((sum, item) => sum + item.qty, 0) : 0;

  return (
    <Link
      href="/checkout"
      aria-label="View cart"
      className="relative flex h-11 w-11 items-center justify-center text-white transition-colors hover:text-primary"
    >
      <ShoppingBag className="w-5 h-5" />
      {cartCount > 0 && (
        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white animate-in scale-in duration-300">
          {cartCount}
        </span>
      )}
    </Link>
  );
}
