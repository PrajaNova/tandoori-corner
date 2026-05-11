"use client";

import {
  Flame,
  Heart,
  Leaf,
  Minus,
  Search,
  ShoppingBag,
  Wheat,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { AppHeader } from "@/component/AppHeader";
import { MobileActionStrip } from "@/component/MobileActionStrip";
import { Button } from "@/component/ui/button";
import { cn } from "@/lib/utils";
import {
  type DietTag,
  formatPrice,
  type MenuItem,
  menuCategories,
  menuItems,
} from "./site-data";

const dietFilters: DietTag[] = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Nut-free",
];

const priceFilters = [
  { label: "Under S$12", max: 12 },
  { label: "S$12-S$20", max: 20, min: 12 },
  { label: "Premium", min: 20 },
];

const portionFilters = ["Single", "Serves 1-2", "Serves 2", "Serves 2-3"];

function SpiceScale({ level }: { level: MenuItem["spice"] }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${level} of 5 spice level`}
    >
      {["one", "two", "three", "four", "five"].map((key, index) => (
        <Flame
          aria-hidden="true"
          className={cn(
            "size-3.5",
            index < level ? "fill-chili text-chili" : "text-white/20",
          )}
          key={key}
        />
      ))}
    </span>
  );
}

function DietBadge({ diet }: { diet: DietTag }) {
  const Icon = diet === "Gluten-free" ? Wheat : Leaf;

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/7 px-2 py-1 text-[0.68rem] font-black uppercase tracking-[0.08em] text-muted">
      <Icon aria-hidden="true" className="size-3 text-brand" />
      {diet}
    </span>
  );
}

function MenuCard({
  isInCart,
  isSaved,
  item,
  onAdd,
  onRemove,
  onSave,
}: {
  isInCart: boolean;
  isSaved: boolean;
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  onRemove: (id: string) => void;
  onSave: (id: string) => void;
}) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-card border bg-white/7 text-white shadow-lifted transition hover:-translate-y-1",
        item.isSignature ? "border-brand/45" : "border-white/10",
      )}
    >
      <div className="grid gap-4 p-3 sm:grid-cols-[9rem_1fr] lg:p-4">
        <div className="relative aspect-square overflow-hidden rounded-card bg-charcoal">
          <Image
            alt={item.name}
            className="object-cover transition duration-700 group-hover:scale-110"
            fill
            sizes="(min-width: 1024px) 14vw, 38vw"
            src={item.image}
          />
          {item.isSignature ? (
            <span className="absolute left-2 top-2 rounded-full bg-brand px-2 py-1 text-[0.65rem] font-black uppercase tracking-[0.08em] text-madison">
              Eye magnet
            </span>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-4">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-brand">
                  {item.portion}
                </p>
                <h3 className="mt-1 font-serif text-2xl text-white">
                  {item.name}
                </h3>
              </div>
              <button
                aria-label={
                  isSaved
                    ? `Remove ${item.name} from wishlist`
                    : `Save ${item.name} to wishlist`
                }
                className={cn(
                  "inline-flex size-10 shrink-0 items-center justify-center rounded-full border transition",
                  isSaved
                    ? "border-brand bg-brand text-madison"
                    : "border-white/15 bg-madison text-muted hover:border-brand hover:text-brand",
                )}
                onClick={() => onSave(item.id)}
                type="button"
              >
                <Heart
                  aria-hidden="true"
                  className={cn("size-4", isSaved && "fill-current")}
                />
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              {item.description}{" "}
              <span className="font-black text-white">
                {formatPrice(item.price)}
              </span>
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-brand">
              {item.pairing}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <SpiceScale level={item.spice} />
              {item.diets.map((diet) => (
                <DietBadge diet={diet} key={diet} />
              ))}
              <span className="rounded-full border border-white/10 px-2 py-1 text-[0.68rem] font-black uppercase tracking-[0.08em] text-muted">
                {item.allergens.length > 0
                  ? `Contains ${item.allergens.join(", ")}`
                  : "No major listed allergens"}
              </span>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                className="sm:flex-1"
                data-gtm-event="add_to_order"
                onClick={() => onAdd(item)}
                type="button"
                variant={isInCart ? "secondary" : "gold"}
              >
                <ShoppingBag aria-hidden="true" />
                {isInCart ? "Add another" : "Add to Order"}
              </Button>
              {isInCart ? (
                <Button
                  aria-label={`Remove one ${item.name}`}
                  onClick={() => onRemove(item.id)}
                  type="button"
                  variant="outline"
                >
                  <Minus aria-hidden="true" />
                  Remove
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function MenuPage() {
  const [activeDiets, setActiveDiets] = useState<DietTag[]>([]);
  const [activePrice, setActivePrice] = useState<string>("all");
  const [activePortion, setActivePortion] = useState<string>("all");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [wishlist, setWishlist] = useState<string[]>([]);

  const visibleItems = useMemo(
    () =>
      menuItems.filter((item) => {
        const dietMatch =
          activeDiets.length === 0 ||
          activeDiets.every((diet) => item.diets.includes(diet));
        const priceFilter = priceFilters.find(
          (filter) => filter.label === activePrice,
        );
        const priceMatch =
          !priceFilter ||
          ((priceFilter.min === undefined || item.price >= priceFilter.min) &&
            (priceFilter.max === undefined || item.price < priceFilter.max));
        const portionMatch =
          activePortion === "all" || item.portion === activePortion;

        return dietMatch && priceMatch && portionMatch;
      }),
    [activeDiets, activePortion, activePrice],
  );

  const cartItems = Object.entries(cart)
    .map(([id, quantity]) => {
      const item = menuItems.find((menuItem) => menuItem.id === id);

      return item ? { item, quantity } : null;
    })
    .filter((entry): entry is { item: MenuItem; quantity: number } =>
      Boolean(entry),
    );
  const cartTotal = cartItems.reduce(
    (sum, entry) => sum + entry.quantity * entry.item.price,
    0,
  );
  const cartCount = cartItems.reduce((sum, entry) => sum + entry.quantity, 0);

  function toggleDiet(diet: DietTag) {
    setActiveDiets((current) =>
      current.includes(diet)
        ? current.filter((item) => item !== diet)
        : [...current, diet],
    );
  }

  function addToCart(item: MenuItem) {
    setCart((current) => ({
      ...current,
      [item.id]: (current[item.id] ?? 0) + 1,
    }));
  }

  function removeFromCart(id: string) {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] ?? 0) - 1;

      if (quantity <= 0) {
        delete next[id];
      } else {
        next[id] = quantity;
      }

      return next;
    });
  }

  function toggleWishlist(id: string) {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <main className="min-h-screen bg-madison pb-28 text-white">
      <AppHeader />

      <section className="relative isolate overflow-hidden px-4 pb-16 pt-48 sm:px-8 lg:px-12">
        <Image
          alt="Tandoori Corner food spread"
          className="-z-20 object-cover opacity-35"
          fill
          priority
          src="/dish-butter-chicken.jpg"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-madison via-madison/90 to-madison/55" />
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
            Native interactive menu
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-[2.25rem] leading-[1.04] text-white md:text-[3.5rem]">
            No PDFs. Search, filter, and build the meal.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted md:text-lg">
            Prices sit inside each dish story, signatures get extra visual
            weight, and filters help diners move fast on mobile.
          </p>
        </div>
      </section>

      <section className="sticky top-0 z-40 border-y border-white/10 bg-madison/95 backdrop-blur">
        <div className="mx-auto max-w-7xl space-y-3 px-4 py-4 sm:px-8 lg:px-12">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {menuCategories.map((category) => (
              <a
                className="shrink-0 rounded-full border border-white/10 bg-white/7 px-4 py-2 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:border-brand hover:text-brand"
                href={`#${category.id}`}
                key={category.id}
              >
                {category.label}
              </a>
            ))}
          </div>
          <div className="grid gap-2 lg:grid-cols-[1fr_auto_auto]">
            <div className="flex gap-2 overflow-x-auto">
              {dietFilters.map((filter) => {
                const isActive = activeDiets.includes(filter);

                return (
                  <button
                    aria-pressed={isActive}
                    className={cn(
                      "shrink-0 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.1em] transition",
                      isActive
                        ? "border-brand bg-brand text-madison"
                        : "border-white/10 bg-white/7 text-muted hover:border-brand hover:text-brand",
                    )}
                    key={filter}
                    onClick={() => toggleDiet(filter)}
                    type="button"
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
            <select
              aria-label="Filter by price"
              className="h-10 rounded-card border border-white/10 bg-white/7 px-3 text-sm font-bold text-white"
              onChange={(event) => setActivePrice(event.target.value)}
              value={activePrice}
            >
              <option value="all">All prices</option>
              {priceFilters.map((filter) => (
                <option key={filter.label}>{filter.label}</option>
              ))}
            </select>
            <select
              aria-label="Filter by portion"
              className="h-10 rounded-card border border-white/10 bg-white/7 px-3 text-sm font-bold text-white"
              onChange={(event) => setActivePortion(event.target.value)}
              value={activePortion}
            >
              <option value="all">All portions</option>
              {portionFilters.map((portion) => (
                <option key={portion}>{portion}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:px-12">
        <div className="mb-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand">
              Showing {visibleItems.length} dishes
            </p>
            <h2 className="mt-2 font-serif text-3xl text-white md:text-5xl">
              Start light, hit the tandoor, finish sweet.
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-card border border-white/10 bg-white/7 px-4 py-3">
            <Search aria-hidden="true" className="size-4 text-brand" />
            <span className="text-sm font-semibold text-muted">
              Dietary, price, and portion filters are instant.
            </span>
          </div>
        </div>

        <div className="space-y-14">
          {menuCategories.map((category) => {
            const categoryItems = visibleItems.filter(
              (item) => item.category === category.id,
            );

            if (categoryItems.length === 0) {
              return null;
            }

            return (
              <section
                className="scroll-mt-44"
                id={category.id}
                key={category.id}
              >
                <div className="mb-6 border-b border-white/10 pb-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-brand">
                    {category.purpose}
                  </p>
                  <h2 className="mt-2 font-serif text-3xl text-white">
                    {category.label}
                  </h2>
                </div>
                <div className="grid gap-5 lg:grid-cols-2">
                  {categoryItems.map((item) => (
                    <div
                      className={cn(item.isSignature && "lg:col-span-2")}
                      key={item.id}
                    >
                      <MenuCard
                        isInCart={Boolean(cart[item.id])}
                        isSaved={wishlist.includes(item.id)}
                        item={item}
                        onAdd={addToCart}
                        onRemove={removeFromCart}
                        onSave={toggleWishlist}
                      />
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-madison p-3 text-white shadow-lifted md:left-auto md:right-5 md:bottom-5 md:w-96 md:rounded-card md:border">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.12em] text-brand">
              Sticky cart
            </p>
            <p className="font-serif text-xl text-white">
              {cartCount} item{cartCount === 1 ? "" : "s"} ·{" "}
              {formatPrice(cartTotal)}
            </p>
          </div>
          <Button asChild variant="gold">
            <a data-gtm-event="checkout_start" href="/reserve">
              Checkout
            </a>
          </Button>
        </div>
      </aside>
      <MobileActionStrip />
    </main>
  );
}
