"use client";

import { Minus, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "@/component/cart-provider";

const menuItems = [
  {
    name: "Vegetable Samosa",
    category: "Starters",
    desc: "Crispy pastry filled with spiced potatoes and peas.",
    price: 8,
  },
  {
    name: "Tandoori Chicken",
    category: "Tandoori Specialties",
    desc: "Bone-in chicken marinated in yogurt and traditional spices.",
    price: 22,
  },
  {
    name: "Butter Chicken",
    category: "Curries",
    desc: "Roasted chicken simmered in creamy tomato gravy.",
    price: 24,
  },
  {
    name: "Lamb Rogan Josh",
    category: "Curries",
    desc: "Classic Kashmiri dish cooked with aromatic spices.",
    price: 26.5,
  },
  {
    name: "Garlic Naan",
    category: "Breads & Rice",
    desc: "Leavened flatbread topped with minced garlic and butter.",
    price: 5.5,
  },
  {
    name: "Chicken Biryani",
    category: "Breads & Rice",
    desc: "Aromatic basmati rice layered with spiced chicken and mint.",
    price: 22,
  },
];

const categories = [
  "All",
  "Starters",
  "Tandoori Specialties",
  "Curries",
  "Breads & Rice",
];

export function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart, cartItems, updateQuantity } = useCart();

  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query);
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-cream px-4 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-4 font-semibold text-brand text-sm uppercase tracking-[0.2em]">
            Order Online
          </p>
          <h1 className="font-serif text-4xl text-ink md:text-5xl">
            Our Full Menu
          </h1>
        </div>

        <div className="mb-10 flex flex-col items-center justify-between gap-5 md:flex-row">
          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            {categories.map((category) => (
              <button
                className={`rounded-full px-5 py-2.5 font-semibold text-sm transition-colors ${
                  activeCategory === category
                    ? "bg-brand text-white"
                    : "border border-ink/10 bg-white text-ink/70 hover:text-brand"
                }`}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          <label className="relative w-full md:w-72">
            <span className="sr-only">Search dishes</span>
            <Search
              className="-translate-y-1/2 absolute top-1/2 left-4 text-ink/40"
              size={18}
            />
            <input
              className="w-full rounded-full border border-ink/10 bg-white py-2.5 pr-4 pl-12 text-sm outline-none focus:ring-2 focus:ring-brand"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search dishes..."
              type="text"
              value={searchQuery}
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredItems.map((item) => {
            const cartItem = cartItems.find((entry) => entry.id === item.name);
            const quantityInCart = cartItem?.quantity ?? 0;

            return (
              <article
                className="rounded-card border border-ink/5 bg-white p-6 shadow-card"
                key={item.name}
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h2 className="font-serif text-2xl text-ink">{item.name}</h2>
                  <span className="font-semibold text-brand">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <p className="mb-6 text-ink/65 leading-relaxed">{item.desc}</p>

                {quantityInCart === 0 ? (
                  <button
                    className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-semibold text-ink text-sm transition-colors hover:bg-brand hover:text-white"
                    onClick={() =>
                      addToCart({ name: item.name, price: item.price }, 1)
                    }
                    type="button"
                  >
                    <Plus size={16} /> Add to Cart
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-4 rounded-full bg-ink px-3 py-2 text-white">
                    <button
                      onClick={() =>
                        updateQuantity(item.name, quantityInCart - 1)
                      }
                      type="button"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-4 text-center font-semibold">
                      {quantityInCart}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.name, quantityInCart + 1)
                      }
                      type="button"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
