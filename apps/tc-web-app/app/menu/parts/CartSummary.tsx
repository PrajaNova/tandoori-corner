import {
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import type { CartItem } from "@/lib/cart";

type CartSummaryProps = {
  activeItemCount: number;
  cart: CartItem[];
  isCartExpanded: boolean;
  onCheckout: () => void;
  onToggleExpanded: () => void;
  onUpdateQty: (name: string, delta: number) => void;
  totalAmount: number;
};

export function CartSummary({
  activeItemCount,
  cart,
  isCartExpanded,
  onCheckout,
  onToggleExpanded,
  onUpdateQty,
  totalAmount,
}: CartSummaryProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-gold/30 bg-cream/95 shadow-[0_-16px_40px_rgba(44,38,33,0.14)] backdrop-blur-xl"
    >
      {isCartExpanded ? (
        <div className="container mx-auto max-h-[60vh] overflow-y-auto border-b border-border px-6 py-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-space text-2xl text-ink">Your Order</h3>
            <button
              type="button"
              onClick={onToggleExpanded}
              className="text-ink/50 transition-colors hover:text-ink"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-ink">{item.name}</h4>
                  <span className="text-[10px] uppercase tracking-widest text-ink/50">
                    ${item.price.toFixed(2)} each
                  </span>
                </div>
                <div className="flex items-center gap-4 rounded-full bg-accent px-3 py-1">
                  <button
                    type="button"
                    onClick={() => onUpdateQty(item.name, -1)}
                    className="text-ink transition-colors hover:text-brand-gold"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-4 text-center font-sans text-sm text-ink">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateQty(item.name, 1)}
                    className="text-ink transition-colors hover:text-brand-gold"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <div className="w-20 text-right font-medium text-brand-gold">
                  ${(item.price * item.qty).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            <span className="text-xs font-bold uppercase tracking-widest text-ink/50">
              Subtotal
            </span>
            <span className="font-space text-2xl font-bold text-brand-gold">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      ) : null}

      <div
        className="container mx-auto flex h-20 cursor-pointer items-center justify-between px-6 md:h-24"
        onClick={onToggleExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <ShoppingBag className="h-6 w-6 text-brand-gold sm:h-8 sm:w-8" />
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-card text-[10px] font-bold text-brand-dark sm:text-xs">
              {activeItemCount}
            </span>
          </div>
          <div className="hidden sm:block">
            <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-ink/50">
              Total Order
            </span>
            <span className="block font-space text-xl leading-none font-bold text-ink">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <span className="hidden text-ink/50 transition-colors hover:text-ink sm:block">
            {isCartExpanded ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronUp className="h-5 w-5" />
            )}
          </span>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onCheckout();
            }}
            className="bg-brand-gold px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-brand-dark transition-colors hover:bg-cream sm:px-10 sm:py-4 sm:text-xs"
          >
            Checkout
          </button>
        </div>
      </div>
    </motion.div>
  );
}
