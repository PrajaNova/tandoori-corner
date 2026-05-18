"use client";

import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { MenuItemList } from "@/components/menu/MenuItemList";
import { menuCategories } from "@/data/menu";
import type { MenuItem } from "@/data/types";
import { useCart } from "@/hooks/use-cart";
import { CartSummary } from "./parts/CartSummary";
import { MenuFilters } from "./parts/MenuFilters";

const MenuItemDetailsDialog = dynamic(
  () =>
    import("./parts/MenuItemDetailsDialog").then(
      (module) => module.MenuItemDetailsDialog,
    ),
  { ssr: false },
);

export function MenuClient() {
  const router = useRouter();
  const { addToCart, cart, updateQty } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryTitle, setActiveCategoryTitle] =
    useState("Chef's Signatures");
  const [isCartExpanded, setIsCartExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const activeCategory =
    menuCategories.find((category) => category.title === activeCategoryTitle) ??
    menuCategories[0];

  const filteredItems = useMemo(() => {
    if (!searchQuery) return activeCategory.items;

    const query = searchQuery.toLowerCase();
    return activeCategory.items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }, [activeCategory.items, searchQuery]);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  const itemQtyByName = useMemo(() => {
    const map: Record<string, number> = {};

    cart.forEach((item) => {
      map[item.name] = item.qty;
    });

    return map;
  }, [cart]);

  const activeItemCount = cart.reduce((count, item) => count + item.qty, 0);

  return (
    <div className="relative min-h-screen bg-cream pt-20 pb-32 sm:pt-24 sm:pb-40">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-8 text-center">
          <p className="mb-1 font-script text-3xl leading-none text-brand-gold sm:text-4xl">
            Taste life
          </p>
          <h1 className="font-space text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
            Discover Our Menu
          </h1>
          <div
            aria-hidden="true"
            className="my-4 flex items-center justify-center gap-2 text-brand-gold"
          >
            <span className="h-px w-7 bg-current" />
            <span className="font-script text-3xl leading-none">TC</span>
            <span className="h-px w-7 bg-current" />
          </div>
          <p className="mx-auto max-w-2xl text-sm leading-7 font-light text-ink/60 sm:text-base">
            Explore smoky tandoor plates, slow-cooked curries, vegetarian
            favourites, breads, and rice from our North Indian kitchen.
          </p>

          <MenuFilters
            categories={menuCategories}
            activeCategoryTitle={activeCategoryTitle}
            searchQuery={searchQuery}
            onCategoryChange={setActiveCategoryTitle}
            onSearchChange={setSearchQuery}
          />
        </div>

        {filteredItems.length === 0 ? (
          <div className="border border-border py-20 text-center text-ink/50">
            <p className="mb-2 text-lg">
              No items found matching &quot;{searchQuery}&quot;
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold uppercase tracking-widest text-brand-gold transition-colors hover:text-ink"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            key={activeCategory.title}
            className="relative"
          >
            <MenuItemList
              activeCategory={{ ...activeCategory, items: filteredItems }}
              itemQtyByName={itemQtyByName}
              onOpenItem={setSelectedItem}
              onAddToCart={addToCart}
              onIncrementItem={(name) => updateQty(name, 1)}
              onDecrementItem={(name) => updateQty(name, -1)}
            />
          </motion.div>
        )}

        <div className="mt-32 w-full border border-border bg-brand-surface p-10 text-center">
          <h3 className="mb-4 font-space text-2xl text-ink">
            Ready to taste the heritage?
          </h3>
          <p className="mb-8 text-sm font-light text-ink/50">
            Order directly for island-wide home delivery or reserve a table.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                if (cart.length > 0) setIsCartExpanded(true);
              }}
              className="bg-brand-gold px-10 py-4 text-xs font-bold uppercase tracking-widest text-brand-dark transition-colors hover:bg-brand-gold-muted"
            >
              Order Delivery
            </button>
            <button
              type="button"
              onClick={() => router.push("/experience")}
              className="border border-border bg-transparent px-10 py-4 text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-cream hover:text-brand-dark"
            >
              Reserve Table
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem ? (
          <MenuItemDetailsDialog
            selectedItem={selectedItem}
            itemQtyByName={itemQtyByName}
            onAddToCart={addToCart}
            onClose={() => setSelectedItem(null)}
            onUpdateQty={updateQty}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {cart.length > 0 ? (
          <CartSummary
            cart={cart}
            activeItemCount={activeItemCount}
            totalAmount={totalAmount}
            isCartExpanded={isCartExpanded}
            onCheckout={() => router.push("/checkout")}
            onToggleExpanded={() =>
              setIsCartExpanded((currentValue) => !currentValue)
            }
            onUpdateQty={updateQty}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
