"use client";

import { Minus, Plus, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { menuCategories } from "../menu/menu-data";

interface OrderItem {
  id: string;
  name: string;
  price: string;
  desc: string;
  category: string;
}

const allItems: OrderItem[] = menuCategories.flatMap(
  (category, categoryIndex) =>
    category.items.map((item, itemIndex) => ({
      ...item,
      category: category.title,
      id: `${categoryIndex}-${itemIndex}`,
    })),
);

const filters = ["All", ...menuCategories.map((c) => c.title)];

function cleanLabel(label: string) {
  return label.replace(/ Menu$/i, "");
}

export function OrderOnline() {
  const { cart, addToCart, updateQty } = useCart();
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const qtyByName = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of cart) map.set(item.name, item.qty);
    return map;
  }, [cart]);

  const visibleItems = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();
    return allItems.filter((item) => {
      const matchesFilter =
        activeFilter === "All" || item.category === activeFilter;
      if (!matchesFilter) return false;
      if (!normalisedQuery) return true;
      return (
        item.name.toLowerCase().includes(normalisedQuery) ||
        item.desc.toLowerCase().includes(normalisedQuery)
      );
    });
  }, [activeFilter, query]);

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="bg-white">
      {/* Page title bar */}
      <section className="relative flex items-center justify-center min-h-[420px] pt-24">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/granny/granny_page-title_7.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 z-0 bg-black/65" />
        <div className="relative z-10 text-center px-4">
          <div className="font-script text-primary text-3xl md:text-4xl mb-1">
            Order Online
          </div>
          <h1 className="font-kaushan text-5xl md:text-6xl text-white capitalize mb-6 leading-tight">
            Build Your Order
          </h1>
          <ol className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase text-white/80">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="text-white/40">/</li>
            <li className="text-primary">order online</li>
          </ol>
        </div>
      </section>

      {/* Sticky toolbar: filters + search */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 -mx-1 px-1 overflow-x-auto">
              {filters.map((filter) => {
                const isActive = filter === activeFilter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-muted text-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {cleanLabel(filter)}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search dishes…"
                className="h-11 w-full rounded-full border border-input bg-white pl-10 pr-9 text-sm outline-none transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Items grid */}
      <section className="container mx-auto max-w-6xl px-4 py-14 pb-36">
        <p className="mb-8 text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-bold text-foreground">
            {visibleItems.length}
          </span>{" "}
          {visibleItems.length === 1 ? "dish" : "dishes"}
          {activeFilter !== "All" && (
            <>
              {" "}
              in{" "}
              <span className="font-bold text-foreground">
                {cleanLabel(activeFilter)}
              </span>
            </>
          )}
        </p>

        {visibleItems.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-kaushan text-3xl text-foreground mb-2">
              No dishes found
            </p>
            <p className="text-muted-foreground text-sm">
              Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item) => {
              const qty = qtyByName.get(item.name) ?? 0;
              return (
                <div
                  key={item.id}
                  className="flex flex-col border border-border bg-white p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-raleway text-base font-bold text-foreground">
                      {item.name}
                    </h3>
                    <span className="whitespace-nowrap font-raleway font-bold text-primary">
                      {item.price}
                    </span>
                  </div>
                  <p className="mt-2 mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {cleanLabel(item.category)}
                    </span>
                    {qty > 0 ? (
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          aria-label={`Remove one ${item.name}`}
                          onClick={() => updateQty(item.name, -1)}
                          className="flex h-8 w-8 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-5 text-center font-bold text-foreground">
                          {qty}
                        </span>
                        <button
                          type="button"
                          aria-label={`Add one ${item.name}`}
                          onClick={() => addToCart(item.name, item.price)}
                          className="flex h-8 w-8 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => addToCart(item.name, item.price)}
                        className="flex items-center gap-2 bg-ink px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Floating cart bar */}
      {totalCount > 0 && (
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
      )}
    </div>
  );
}
