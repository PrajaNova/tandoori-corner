"use client";

import {
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { MenuCategoryNav } from "@/components/menu/MenuCategoryNav";
import { MenuItemList } from "@/components/menu/MenuItemList";
import { menuCategories } from "@/data/menu";
import type { MenuItem } from "@/data/types";
import { useCart } from "@/hooks/use-cart";

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
    <div className="pt-20 pb-32 sm:pt-24 sm:pb-40 bg-cream min-h-screen relative">
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
          <p className="mx-auto max-w-2xl text-sm font-light leading-7 text-ink/60 sm:text-base">
            Explore smoky tandoor plates, slow-cooked curries, vegetarian
            favourites, breads, and rice from our North Indian kitchen.
          </p>

          <div className="mt-8 flex flex-col gap-4 text-left lg:flex-row lg:items-end lg:justify-between">
            <div className="w-full lg:max-w-sm">
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Search className="h-4 w-4 text-ink/35 transition-colors group-focus-within:text-brand-gold" />
                </div>
                <input
                  type="text"
                  className="block h-10 w-full border border-border bg-cream pl-10 pr-9 text-sm text-ink placeholder-muted-foreground/45 transition-colors focus:border-brand-gold focus:outline-none"
                  placeholder="Search our menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-ink/40 transition-colors hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <MenuCategoryNav
              categories={menuCategories}
              activeTitle={activeCategoryTitle}
              onChange={setActiveCategoryTitle}
              onFilterClear={() => setSearchQuery("")}
            />
          </div>
        </div>

        {/* Active Category */}
        <div>
          {filteredItems.length === 0 ? (
            <div className="text-center text-ink/50 py-20 border border-border">
              <p className="text-lg mb-2">
                No items found matching "{searchQuery}"
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-brand-gold text-xs uppercase tracking-widest font-bold hover:text-ink transition-colors"
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
                activeCategory={activeCategory}
                itemQtyByName={itemQtyByName}
                onOpenItem={setSelectedItem}
                onAddToCart={addToCart}
                onIncrementItem={(name) => updateQty(name, 1)}
                onDecrementItem={(name) => updateQty(name, -1)}
              />
            </motion.div>
          )}
        </div>

        {/* Sticky CTAs / Bottom Ordering */}
        <div className="mt-32 w-full bg-brand-surface p-10 border border-border text-center">
          <h3 className="font-space text-2xl text-ink mb-4">
            Ready to taste the heritage?
          </h3>
          <p className="text-ink/50 text-sm mb-8 font-light">
            Order directly for island-wide home delivery or reserve a table.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => {
                if (cart.length > 0) setIsCartExpanded(true);
              }}
              className="bg-brand-gold text-brand-dark px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-brand-gold-muted transition-colors"
            >
              Order Delivery
            </button>
            <button
              type="button"
              onClick={() => router.push("/experience")}
              className="bg-transparent border border-border text-ink px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-cream hover:text-brand-dark transition-colors"
            >
              Reserve Table
            </button>
          </div>
        </div>
      </div>

      {/* Item Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-cream/95 backdrop-blur-md"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-cream border border-border shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 text-ink hover:text-brand-gold bg-cream/70 backdrop-blur-md rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {selectedItem.img && (
                <div className="md:w-1/2 h-64 md:h-auto shrink-0 relative">
                  <Image
                    fill
                    src={selectedItem.img}
                    alt={selectedItem.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-cream to-transparent opacity-60"></div>
                </div>
              )}

              <div className="flex-1 p-8 md:p-12 overflow-y-auto w-full flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedItem.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`text-[9px] uppercase tracking-widest px-2 py-1 border font-bold ${
                        tag === "Vegetarian" || tag === "Vegan"
                          ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10"
                          : tag === "Signature"
                            ? "border-brand-gold/50 text-brand-gold bg-brand-gold/10"
                            : tag === "Spicy"
                              ? "border-red-500/50 text-red-400 bg-red-500/10"
                              : "border-border text-ink/60 bg-accent"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-space text-3xl font-bold mb-2 text-ink leading-tight">
                  {selectedItem.name}
                </h3>
                <p className="text-brand-gold font-bold text-2xl mb-6">
                  {selectedItem.price}
                </p>

                <p className="text-ink/80 leading-relaxed mb-8 font-light text-base border-l-2 border-brand-gold/50 pl-4 py-1">
                  &quot;{selectedItem.desc}&quot;
                </p>

                <div className="space-y-8 flex-1">
                  {selectedItem.ingredients &&
                    selectedItem.ingredients.length > 0 && (
                      <div>
                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink/40 mb-3 border-b border-border pb-2">
                          Key Ingredients
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.ingredients.map((ingredient, i) => (
                            <span
                              key={i}
                              className="text-sm text-ink/70 bg-accent px-3 py-1.5 rounded-sm"
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {selectedItem.story && (
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink/40 mb-3 border-b border-border pb-2">
                        The Chef's Thought
                      </h4>
                      <p className="text-sm text-ink/60 leading-relaxed font-light italic">
                        {selectedItem.story}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-10 pt-6 border-t border-border">
                  {itemQtyByName[selectedItem.name] > 0 ? (
                    <div className="flex items-center justify-between gap-4 bg-accent px-4 py-3">
                      <button
                        type="button"
                        onClick={() => updateQty(selectedItem.name, -1)}
                        className="flex h-11 w-11 items-center justify-center bg-card text-ink transition-colors hover:bg-brand-gold hover:text-brand-dark"
                        aria-label={`Remove one ${selectedItem.name}`}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <div className="text-center">
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-ink/50">
                          In your order
                        </span>
                        <span className="font-space text-2xl text-ink">
                          {itemQtyByName[selectedItem.name]}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateQty(selectedItem.name, 1)}
                        className="flex h-11 w-11 items-center justify-center bg-card text-ink transition-colors hover:bg-brand-gold hover:text-brand-dark"
                        aria-label={`Add one ${selectedItem.name}`}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        addToCart(selectedItem.name, selectedItem.price)
                      }
                      className="w-full bg-brand-gold text-brand-dark px-6 py-4 flex items-center justify-center gap-3 text-xs uppercase tracking-widest font-bold hover:bg-cream transition-colors"
                    >
                      Add to Order <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Cart Bar */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 inset-x-0 z-50 bg-cream/95 backdrop-blur-xl border-t border-brand-gold/30 shadow-[0_-16px_40px_rgba(44,38,33,0.14)]"
          >
            {isCartExpanded && (
              <div className="container mx-auto px-6 py-6 border-b border-border max-h-[60vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-space text-2xl text-ink">Your Order</h3>
                  <button
                    type="button"
                    onClick={() => setIsCartExpanded(false)}
                    className="text-ink/50 hover:text-ink transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <h4 className="text-ink text-sm font-medium">
                          {item.name}
                        </h4>
                        <span className="text-ink/50 text-[10px] uppercase tracking-widest">
                          ${item.price.toFixed(2)} each
                        </span>
                      </div>
                      <div className="flex items-center gap-4 bg-accent rounded-full px-3 py-1">
                        <button
                          type="button"
                          onClick={() => updateQty(item.name, -1)}
                          className="text-ink hover:text-brand-gold transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-ink font-sans text-sm w-4 text-center">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.name, 1)}
                          className="text-ink hover:text-brand-gold transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="w-20 text-right text-brand-gold font-medium">
                        ${(item.price * item.qty).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
                  <span className="text-ink/50 uppercase tracking-widest text-xs font-bold">
                    Subtotal
                  </span>
                  <span className="text-brand-gold font-space text-2xl font-bold">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <div
              className="container mx-auto px-6 h-20 md:h-24 flex items-center justify-between cursor-pointer"
              onClick={() => setIsCartExpanded(!isCartExpanded)}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-brand-gold" />
                  <span className="absolute -top-2 -right-2 bg-card text-brand-dark w-5 h-5 rounded-full text-[10px] sm:text-xs font-bold flex items-center justify-center">
                    {activeItemCount}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <span className="block text-[10px] uppercase tracking-widest text-ink/50 font-bold mb-1">
                    Total Order
                  </span>
                  <span className="block text-xl font-space font-bold text-ink leading-none">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-ink/50 hover:text-ink transition-colors hidden sm:block">
                  {isCartExpanded ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronUp className="w-5 h-5" />
                  )}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/checkout");
                  }}
                  className="bg-brand-gold text-brand-dark px-8 py-3 sm:px-10 sm:py-4 text-[10px] sm:text-xs uppercase tracking-widest font-bold hover:bg-cream transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
