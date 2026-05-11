"use client";

import {
  Flame,
  Heart,
  Leaf,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Wheat,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { AppHeader } from "@/component/AppHeader";
import { Button } from "@/component/ui/button";
import { cn } from "@/lib/utils";

type Diet = "Vegetarian" | "Vegan" | "Gluten-Free" | "Nut-Free";

type MenuItem = {
  allergens: string[];
  category: string;
  description: string;
  diets: Diet[];
  id: string;
  image: string;
  isDecoy?: boolean;
  isSignature?: boolean;
  name: string;
  pairing: string;
  portion: string;
  price: number;
  spice: 1 | 2 | 3 | 4 | 5;
};

const categories = [
  {
    id: "snacks-drinks",
    label: "Snacks & Drinks",
    purpose: "Open appetite, cool the heat, and build the first add-on.",
  },
  {
    id: "tandoor",
    label: "Tandoor",
    purpose: "High-margin clay oven favourites with visible char and smoke.",
  },
  {
    id: "curries",
    label: "Curries",
    purpose: "Comfort-led mains built for naan, rice, and repeat orders.",
  },
  {
    id: "sabzi",
    label: "Sabzi",
    purpose: "Vegetarian depth without feeling like a compromise.",
  },
  {
    id: "rice-breads",
    label: "Rice & Breads",
    purpose: "Natural pairing engine for larger check averages.",
  },
  {
    id: "sweets",
    label: "Sweets",
    purpose: "A soft close that adds one more item before checkout.",
  },
];

const filters: Diet[] = ["Vegetarian", "Vegan", "Gluten-Free", "Nut-Free"];

const menuItems: MenuItem[] = [
  {
    allergens: ["Dairy", "Gluten"],
    category: "snacks-drinks",
    description:
      "Crisp wafers, cooling yoghurt, tamarind, potatoes, chickpeas, and spice for a sweet-tangy crunch.",
    diets: ["Vegetarian"],
    id: "papri-chaat",
    image: "/dish-papri-chaat.jpg",
    isSignature: true,
    name: "Papri Chaat",
    pairing: "Start here with a mango lassi nearby.",
    portion: "Serves 1-2",
    price: 10,
    spice: 2,
  },
  {
    allergens: ["Dairy"],
    category: "snacks-drinks",
    description:
      "Thick mango, chilled yoghurt, and a smooth finish that resets the palate between bites.",
    diets: ["Vegetarian", "Gluten-Free", "Nut-Free"],
    id: "mango-lassi",
    image: "/dish-mango-lassi.jpg",
    name: "Mango Lassi",
    pairing: "Best with vindaloo, kebabs, or anything fiery.",
    portion: "Single glass",
    price: 7,
    spice: 1,
  },
  {
    allergens: ["Shellfish", "Dairy"],
    category: "tandoor",
    description:
      "Fresh tiger prawns and fish tikka cooked in the clay oven with charred edges and warm spice.",
    diets: ["Gluten-Free"],
    id: "mixed-seafood-platter",
    image: "/tandoori-hero.jpg",
    isDecoy: true,
    isSignature: true,
    name: "Tandoori Mixed Seafood Platter",
    pairing: "Share first, then move into butter chicken and garlic naan.",
    portion: "Serves 2-3",
    price: 42,
    spice: 3,
  },
  {
    allergens: ["Dairy"],
    category: "tandoor",
    description:
      "Half chicken marinated in yoghurt and spices, roasted in the tandoor until smoky and deeply coloured.",
    diets: ["Gluten-Free", "Nut-Free"],
    id: "tandoori-chicken",
    image: "/tandoori-hero.jpg",
    isSignature: true,
    name: "Tandoori Chicken Half",
    pairing: "Order with mint chutney, biryani, and a cold beer at TCB.",
    portion: "Serves 1-2",
    price: 20,
    spice: 3,
  },
  {
    allergens: ["Dairy"],
    category: "tandoor",
    description:
      "Cottage cheese marinated with herbs and grilled until the edges blister and the centre stays soft.",
    diets: ["Vegetarian", "Gluten-Free", "Nut-Free"],
    id: "paneer-tikka",
    image: "/dish-palak-paneer.jpg",
    name: "Tandoori Paneer Tikka",
    pairing: "Pair with dal, garlic naan, and a mango lassi.",
    portion: "Serves 1-2",
    price: 19,
    spice: 2,
  },
  {
    allergens: ["Dairy"],
    category: "curries",
    description:
      "Tandoor-charred chicken tikka folded through velvety tomato butter sauce, slow and rich.",
    diets: ["Gluten-Free", "Nut-Free"],
    id: "butter-chicken",
    image: "/dish-butter-chicken.jpg",
    isSignature: true,
    name: "Yummy Butter Chicken",
    pairing: "Built to be mopped up with garlic naan.",
    portion: "Serves 2",
    price: 17,
    spice: 2,
  },
  {
    allergens: [],
    category: "curries",
    description:
      "Boneless chicken cubes cooked in a delicately spiced vindaloo sauce with a clean, rising heat.",
    diets: ["Gluten-Free", "Nut-Free"],
    id: "chicken-vindaloo",
    image: "/dish-butter-chicken.jpg",
    name: "Chicken Vindaloo",
    pairing: "Keep lassi close and add plain basmati rice.",
    portion: "Serves 2",
    price: 17,
    spice: 5,
  },
  {
    allergens: ["Dairy"],
    category: "curries",
    description:
      "Mutton chunks simmered with spinach, ginger, garlic, tomatoes, and spice until tender.",
    diets: ["Gluten-Free", "Nut-Free"],
    id: "saag-mutton",
    image: "/dish-palak-paneer.jpg",
    name: "Saag Mutton",
    pairing: "Excellent with tandoori paratha.",
    portion: "Serves 2",
    price: 18,
    spice: 3,
  },
  {
    allergens: ["Dairy"],
    category: "sabzi",
    description:
      "Soft paneer in deep-green spinach gravy lifted with ginger, garlic, and gentle North Indian heat.",
    diets: ["Vegetarian", "Gluten-Free", "Nut-Free"],
    id: "palak-paneer",
    image: "/dish-palak-paneer.jpg",
    isSignature: true,
    name: "Palak Paneer",
    pairing: "Scoop it with butter naan or layer it over rice.",
    portion: "Serves 2",
    price: 16,
    spice: 2,
  },
  {
    allergens: ["Dairy"],
    category: "sabzi",
    description:
      "Black lentils slow-cooked into a smoky, buttery dal with a plush finish.",
    diets: ["Vegetarian", "Gluten-Free"],
    id: "dal-makhani",
    image: "/dish-butter-chicken.jpg",
    name: "Dal Makhani",
    pairing: "Add jeera rice for comfort-food balance.",
    portion: "Serves 2",
    price: 15,
    spice: 2,
  },
  {
    allergens: [],
    category: "rice-breads",
    description:
      "Fragrant basmati layered with vegetables and warm spice for aroma first, comfort second.",
    diets: ["Vegetarian", "Vegan", "Nut-Free"],
    id: "veg-biryani",
    image: "/dish-veg-biryani.jpg",
    isSignature: true,
    name: "Veg Biryani",
    pairing: "Order with raita and a grilled tandoori starter.",
    portion: "Serves 1-2",
    price: 14,
    spice: 3,
  },
  {
    allergens: ["Gluten", "Dairy"],
    category: "rice-breads",
    description:
      "Tandoor-baked bread rubbed with fresh garlic and finished hot for tearing and dipping.",
    diets: ["Vegetarian", "Nut-Free"],
    id: "garlic-naan",
    image: "/tandoori-hero.jpg",
    name: "Garlic Naan",
    pairing: "Essential with butter chicken, dal makhani, or saag.",
    portion: "One bread",
    price: 6,
    spice: 1,
  },
  {
    allergens: ["Dairy", "Gluten", "Nuts"],
    category: "rice-breads",
    description:
      "Soft naan filled with dried fruit sweetness for a rich contrast to smoky curries.",
    diets: ["Vegetarian"],
    id: "peshawari-naan",
    image: "/tandoori-hero.jpg",
    name: "Peshawari Naan",
    pairing: "Best with mutton rogan josh or chicken masala.",
    portion: "One bread",
    price: 8,
    spice: 1,
  },
  {
    allergens: ["Dairy", "Gluten"],
    category: "sweets",
    description:
      "Warm syrup-soaked dumplings with a soft centre and enough sweetness to close the meal.",
    diets: ["Vegetarian"],
    id: "gulab-jamun",
    image: "/dish-gulab-jamun.jpg",
    isSignature: true,
    name: "Gulab Jamun",
    pairing: "Share after a spicy curry round.",
    portion: "Serves 1-2",
    price: 8,
    spice: 1,
  },
];

function formatPrice(price: number) {
  return `S$${price.toFixed(2)}`;
}

function SpiceScale({ level }: { level: MenuItem["spice"] }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${level} of 5 spice level`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const key = `spice-${index + 1}`;

        return (
          <Flame
            aria-hidden="true"
            className={cn(
              "size-3.5",
              index < level ? "fill-chili text-chili" : "text-muted-light",
            )}
            key={key}
          />
        );
      })}
    </span>
  );
}

function DietIcon({ diet }: { diet: Diet }) {
  const Icon =
    diet === "Vegetarian" || diet === "Vegan"
      ? Leaf
      : diet === "Gluten-Free"
        ? Wheat
        : Sparkles;

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-warm-brown">
      <Icon aria-hidden="true" className="size-3" />
      {diet}
    </span>
  );
}

function MenuCard({
  isInCart,
  isSaved,
  item,
  onAdd,
  onSave,
}: {
  isInCart: boolean;
  isSaved: boolean;
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  onSave: (id: string) => void;
}) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-card border bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lifted",
        item.isSignature ? "border-brand/35" : "border-line",
      )}
    >
      {item.isDecoy ? (
        <div className="absolute left-4 top-4 z-10 rounded-full bg-madison px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-curry">
          Premium platter
        </div>
      ) : null}
      {item.isSignature ? (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white">
          Chef pick
        </div>
      ) : null}

      <div
        className={cn(
          "grid gap-4 p-4 sm:grid-cols-[10rem_1fr]",
          item.isSignature && "lg:grid-cols-[minmax(18rem,0.9fr)_1fr] lg:p-6",
        )}
      >
        <div
          className={cn(
            "relative aspect-square overflow-hidden rounded-image bg-madison",
            item.isSignature && "lg:aspect-[4/3]",
          )}
        >
          <Image
            alt={item.name}
            className="object-cover transition duration-700 group-hover:scale-110"
            fill
            sizes={
              item.isSignature
                ? "(min-width: 1024px) 38vw, 42vw"
                : "(min-width: 1024px) 16vw, 34vw"
            }
            src={item.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-70" />
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-5">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-leaf">
                  {item.portion}
                </p>
                <h3 className="mt-1 font-serif text-2xl text-madison">
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
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-white text-muted hover:border-brand hover:text-brand",
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
              <span className="font-bold text-madison">
                {formatPrice(item.price)}
              </span>
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-warm-brown">
              {item.pairing}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <SpiceScale level={item.spice} />
              {item.diets.map((diet) => (
                <DietIcon diet={diet} key={diet} />
              ))}
              {item.allergens.length > 0 ? (
                <span className="rounded-full border border-line px-2 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-muted">
                  Contains {item.allergens.join(", ")}
                </span>
              ) : (
                <span className="rounded-full border border-line px-2 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-muted">
                  No major listed allergens
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                className="sm:flex-1"
                onClick={() => onAdd(item)}
                type="button"
                variant={isInCart ? "secondary" : "default"}
              >
                {isInCart ? (
                  <>
                    <Plus aria-hidden="true" />
                    Add another
                  </>
                ) : (
                  <>
                    <ShoppingBag aria-hidden="true" />
                    Add to Order
                  </>
                )}
              </Button>
              <Button asChild variant="outline">
                <a href="/#reserve">Plan dine-in</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function MenuPage() {
  const [activeFilters, setActiveFilters] = useState<Diet[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [wishlist, setWishlist] = useState<string[]>([]);

  const visibleItems = useMemo(() => {
    if (activeFilters.length === 0) {
      return menuItems;
    }

    return menuItems.filter((item) =>
      activeFilters.every((filter) => item.diets.includes(filter)),
    );
  }, [activeFilters]);

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, quantity]) => {
          const item = menuItems.find((menuItem) => menuItem.id === id);

          return item ? { item, quantity } : null;
        })
        .filter((entry): entry is { item: MenuItem; quantity: number } =>
          Boolean(entry),
        ),
    [cart],
  );

  const cartCount = cartItems.reduce((sum, entry) => sum + entry.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, entry) => sum + entry.quantity * entry.item.price,
    0,
  );

  function toggleFilter(filter: Diet) {
    setActiveFilters((current) =>
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter],
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
      const nextQuantity = (current[id] ?? 0) - 1;
      const next = { ...current };

      if (nextQuantity <= 0) {
        delete next[id];
      } else {
        next[id] = nextQuantity;
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
    <main className="min-h-screen bg-cream text-madison">
      <AppHeader />

      <section className="relative isolate overflow-hidden bg-madison px-6 pb-16 pt-48 text-white sm:px-10 lg:px-12">
        <Image
          alt="Tandoori Corner food spread"
          className="-z-20 object-cover opacity-45"
          fill
          priority
          src="/dish-butter-chicken.jpg"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-madison via-madison/88 to-madison/45" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_24rem] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-curry">
              Native interactive menu
            </p>
            <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-tight text-white md:text-7xl">
              No PDF. Just food worth scrolling for.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">
              Browse Tandoori Corner signatures by appetite, spice level,
              dietary needs, and pairing. Add dishes for takeaway or save a
              wishlist before your Balestier dine-in.
            </p>
          </div>
          <div className="rounded-card border border-white/15 bg-white/10 p-5 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-curry">
              Silent salesperson rules
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/75">
              <li>No price-shopping columns.</li>
              <li>Premium decoy items anchor each high-value category.</li>
              <li>Chef picks get eye-magnet cards and extra space.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-8 lg:px-12">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <a
                className="shrink-0 rounded-full border border-line bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-madison shadow-sm transition hover:border-brand hover:text-brand"
                href={`#${category.id}`}
                key={category.id}
              >
                {category.label}
              </a>
            ))}
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => {
              const isActive = activeFilters.includes(filter);

              return (
                <button
                  aria-pressed={isActive}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] transition",
                    isActive
                      ? "border-leaf bg-leaf text-white"
                      : "border-line bg-white text-muted hover:border-leaf hover:text-leaf",
                  )}
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  type="button"
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-12">
        <div className="mb-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand">
              Showing {visibleItems.length} dishes
            </p>
            <h2 className="mt-2 font-serif text-4xl">
              Start light, hit the tandoor, finish sweet.
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-card bg-white px-4 py-3 shadow-card">
            <Search aria-hidden="true" className="size-4 text-brand" />
            <span className="text-sm font-semibold text-muted">
              Filter instantly by diet and jump by category.
            </span>
          </div>
        </div>

        <div className="space-y-14 pb-32">
          {categories.map((category) => {
            const categoryItems = visibleItems.filter(
              (item) => item.category === category.id,
            );

            if (categoryItems.length === 0) {
              return null;
            }

            return (
              <section
                className="scroll-mt-36"
                id={category.id}
                key={category.id}
              >
                <div className="mb-6 flex flex-col gap-2 border-b border-line pb-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">
                      {category.purpose}
                    </p>
                    <h2 className="mt-2 font-serif text-4xl">
                      {category.label}
                    </h2>
                  </div>
                  <p className="text-sm font-semibold text-muted">
                    Prices are shown inside the description to keep attention on
                    appetite, not comparison.
                  </p>
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
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-curry">
              Sticky cart
            </p>
            <p className="font-serif text-xl text-white">
              {cartCount} item{cartCount === 1 ? "" : "s"} ·{" "}
              {formatPrice(cartTotal)}
            </p>
          </div>
          <Button asChild variant="gold">
            <a href="/#order">Checkout</a>
          </Button>
        </div>
        {cartItems.length > 0 ? (
          <div className="mt-3 max-h-32 space-y-2 overflow-auto border-t border-white/10 pt-3">
            {cartItems.map(({ item, quantity }) => (
              <div
                className="flex items-center justify-between gap-3 text-sm"
                key={item.id}
              >
                <span className="min-w-0 truncate">
                  {quantity} × {item.name}
                </span>
                <button
                  aria-label={`Remove one ${item.name}`}
                  className="inline-flex size-7 items-center justify-center rounded-full border border-white/20 text-white/75 transition hover:text-curry"
                  onClick={() => removeFromCart(item.id)}
                  type="button"
                >
                  <Minus aria-hidden="true" className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-white/55">
            Add a dish to build your takeaway plan.
          </p>
        )}
      </aside>
    </main>
  );
}
