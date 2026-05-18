import { Minus, Plus, X } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import type { MenuItem } from "@/data/types";
import { fade, scaleIn } from "@/lib/motion";

type MenuItemDetailsDialogProps = {
  itemQtyByName: Record<string, number>;
  onAddToCart: (name: string, price: string) => void;
  onClose: () => void;
  onUpdateQty: (name: string, delta: number) => void;
  selectedItem: MenuItem;
};

function tagClassName(tag: string) {
  if (tag === "Vegetarian" || tag === "Vegan") {
    return "border-emerald-500/50 text-emerald-400 bg-emerald-500/10";
  }

  if (tag === "Signature") {
    return "border-brand-gold/50 text-brand-gold bg-brand-gold/10";
  }

  if (tag === "Spicy") {
    return "border-red-500/50 text-red-400 bg-red-500/10";
  }

  return "border-border text-ink/60 bg-accent";
}

export function MenuItemDetailsDialog({
  itemQtyByName,
  onAddToCart,
  onClose,
  onUpdateQty,
  selectedItem,
}: MenuItemDetailsDialogProps) {
  const selectedItemQty = itemQtyByName[selectedItem.name] ?? 0;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        {...fade}
        onClick={onClose}
        className="absolute inset-0 bg-cream/95 backdrop-blur-md"
      />

      <motion.div
        {...scaleIn}
        className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden border border-border bg-cream shadow-2xl md:flex-row"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 rounded-full bg-cream/70 p-2 text-ink backdrop-blur-md transition-colors hover:text-brand-gold"
        >
          <X className="h-5 w-5" />
        </button>

        {selectedItem.img ? (
          <div className="relative h-64 shrink-0 md:h-auto md:w-1/2">
            <Image
              fill
              src={selectedItem.img}
              alt={selectedItem.name}
              className="absolute inset-0 h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cream to-transparent opacity-60 md:bg-gradient-to-r" />
          </div>
        ) : null}

        <div className="flex w-full flex-1 flex-col overflow-y-auto p-8 md:p-12">
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedItem.tags.map((tag) => (
              <span
                key={tag}
                className={`border px-2 py-1 text-[9px] font-bold uppercase tracking-widest ${tagClassName(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="mb-2 font-space text-3xl font-bold leading-tight text-ink">
            {selectedItem.name}
          </h3>
          <p className="mb-6 text-2xl font-bold text-brand-gold">
            {selectedItem.price}
          </p>

          <p className="mb-8 border-l-2 border-brand-gold/50 py-1 pl-4 text-base font-light leading-relaxed text-ink/80">
            &quot;{selectedItem.desc}&quot;
          </p>

          <div className="flex-1 space-y-8">
            {selectedItem.ingredients && selectedItem.ingredients.length > 0 ? (
              <div>
                <h4 className="mb-3 border-b border-border pb-2 text-[10px] font-bold uppercase tracking-widest text-ink/40">
                  Key Ingredients
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="rounded-sm bg-accent px-3 py-1.5 text-sm text-ink/70"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {selectedItem.story ? (
              <div>
                <h4 className="mb-3 border-b border-border pb-2 text-[10px] font-bold uppercase tracking-widest text-ink/40">
                  The Chef&apos;s Thought
                </h4>
                <p className="text-sm font-light leading-relaxed text-ink/60 italic">
                  {selectedItem.story}
                </p>
              </div>
            ) : null}
          </div>

          <div className="mt-10 border-t border-border pt-6">
            {selectedItemQty > 0 ? (
              <div className="flex items-center justify-between gap-4 bg-accent px-4 py-3">
                <button
                  type="button"
                  onClick={() => onUpdateQty(selectedItem.name, -1)}
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
                    {selectedItemQty}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateQty(selectedItem.name, 1)}
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
                  onAddToCart(selectedItem.name, selectedItem.price)
                }
                className="flex w-full items-center justify-center gap-3 bg-brand-gold px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-dark transition-colors hover:bg-cream"
              >
                Add to Order <Plus className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
