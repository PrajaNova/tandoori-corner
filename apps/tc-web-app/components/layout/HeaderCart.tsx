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
      className="relative text-white hover:text-primary transition-colors flex items-center justify-center p-2"
    >
      <ShoppingBag className="w-5 h-5" />
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-primary text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center text-white animate-in scale-in duration-300">
          {cartCount}
        </span>
      )}
    </Link>
  );
}
