"use client";

import { Minus, Plus, Search, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { menuCategories } from "@/app/menu/menu-data";
import { MenuBook } from "@/components/menu/MenuBook";
import { useCart } from "@/hooks/use-cart";

interface OrderItem {
  id: string;
  name: string;
  price: string;
  desc: string;
  category: string;
  image: string;
}

const categoryImages: Record<string, string[]> = {
  "Breakfast Menu": [
    "/granny/granny_menu_simple-banner_1.jpg",
    "/granny/granny_menu_simple-banner_2.jpg",
    "/granny/granny_banners_11.jpg",
  ],
  "Lunch Menu": [
    "/granny/granny_specials_4.jpg",
    "/granny/granny_specials_5.jpg",
    "/granny/granny_banners_1.jpg",
    "/granny/granny_banners_12.jpg",
  ],
  "Dinner Menu": [
    "/granny/granny_specials_1.jpg",
    "/granny/granny_specials_2.jpg",
    "/granny/granny_specials_3.jpg",
    "/granny/granny_specials_6.jpg",
    "/granny/granny_banners_2.jpg",
    "/granny/granny_banners_3.jpg",
  ],
  "Dessert Menu": [
    "/granny/granny_banners_6.jpg",
    "/granny/granny_banners_7.jpg",
  ],
  "Drinks Menu": [
    "/granny/granny_background_12.jpg",
    "/granny/granny_background_13.jpg",
  ],
};

const allItems: OrderItem[] = menuCategories.flatMap(
  (category, categoryIndex) =>
    category.items.map((item, itemIndex) => {
      const images = categoryImages[category.title] || [
        "/granny/granny_specials_1.jpg",
      ];
      const image = images[itemIndex % images.length];
      return {
        ...item,
        category: category.title,
        id: `${categoryIndex}-${itemIndex}`,
        image,
      };
    }),
);

const filters = ["All", ...menuCategories.map((c) => c.title)];

function cleanLabel(label: string) {
  return label.replace(/ Menu$/i, "");
}

export function OrderCatalog() {
  const { cart, addToCart, updateQty } = useCart();
  const [viewMode, setViewMode] = useState<"grid" | "book">("book");
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

  return (
    <>
      {/* Sticky toolbar: view mode switcher + filters + search */}
      <div
        id="menu-catalog"
        className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-border shadow-sm"
      >
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* View Switcher Toggle & Filters container */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Toggle Switch */}
              <div className="flex items-center gap-1 border border-border p-1 rounded-full bg-muted shadow-inner">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  List
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("book")}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    viewMode === "book"
                      ? "bg-[#1e1c1a] text-white shadow-sm"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  Booklet
                </button>
              </div>

              {/* Filter pills - only visible in Grid view */}
              {viewMode === "grid" && (
                <div className="flex flex-wrap gap-2 overflow-x-auto">
                  {filters.map((filter) => {
                    const isActive = filter === activeFilter;
                    return (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setActiveFilter(filter)}
                        className={`whitespace-nowrap rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
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
              )}
            </div>

            {/* Search - only visible in Grid view */}
            {viewMode === "grid" && (
              <div className="relative w-full md:w-72 shrink-0">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search dishes…"
                  className="h-10 w-full rounded-full border border-input bg-white pl-10 pr-9 text-sm outline-none transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {viewMode === "book" ? (
        <MenuBook />
      ) : (
        /* Items grid */
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
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {visibleItems.map((item) => {
                const qty = qtyByName.get(item.name) ?? 0;
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 sm:gap-5 border border-border bg-white p-4 sm:p-5 transition-shadow hover:shadow-lg rounded-lg"
                  >
                    {/* Item Image */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 96px, 112px"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>

                    {/* Item Details & Actions */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-baseline justify-between gap-3 mb-1">
                          <h3 className="font-raleway text-sm sm:text-base font-bold text-foreground truncate md:whitespace-normal">
                            {item.name}
                          </h3>
                          <span className="font-raleway text-sm sm:text-base font-bold text-primary shrink-0">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3">
                          {item.desc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-black/5">
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          {cleanLabel(item.category)}
                        </span>
                        {qty > 0 ? (
                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              aria-label={`Remove one ${item.name}`}
                              onClick={() => updateQty(item.name, -1)}
                              className="flex h-8 w-8 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary rounded cursor-pointer"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-5 text-center font-bold text-foreground text-sm">
                              {qty}
                            </span>
                            <button
                              type="button"
                              aria-label={`Add one ${item.name}`}
                              onClick={() => addToCart(item.name, item.price)}
                              className="flex h-8 w-8 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary rounded cursor-pointer"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => addToCart(item.name, item.price)}
                            className="flex items-center gap-1.5 bg-ink text-white hover:bg-primary px-4 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest transition-colors rounded cursor-pointer"
                          >
                            <Plus className="h-3.5 w-3.5" /> Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
    </>
  );
}
