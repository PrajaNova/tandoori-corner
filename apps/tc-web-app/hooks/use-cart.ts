"use client";

import { useCallback, useEffect, useState } from "react";

import { type CartItem, parseMenuPrice } from "@/lib/cart";

const CART_STORAGE_KEY = "tandoori-corner-cart";

function readCart() {
  try {
    const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!rawCart) return [];

    const parsed = JSON.parse(rawCart);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is CartItem =>
        typeof item?.menuItemId === "string" &&
        typeof item?.name === "string" &&
        typeof item?.price === "number" &&
        typeof item?.qty === "number",
    );
  } catch {
    return [];
  }
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(readCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  const addToCart = useCallback(
    (menuItemId: string, name: string, priceStr: string) => {
      const price = parseMenuPrice(priceStr);

      setCart((currentCart) => {
        const existing = currentCart.find(
          (item) => item.menuItemId === menuItemId,
        );
        if (existing) {
          return currentCart.map((item) =>
            item.menuItemId === menuItemId
              ? { ...item, qty: item.qty + 1 }
              : item,
          );
        }

        return [...currentCart, { menuItemId, name, price, qty: 1 }];
      });
    },
    [],
  );

  const updateQty = useCallback((menuItemId: string, delta: number) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.menuItemId === menuItemId
            ? { ...item, qty: item.qty + delta }
            : item,
        )
        .filter((item) => item.qty > 0),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  return {
    addToCart,
    cart,
    clearCart,
    updateQty,
  };
}
