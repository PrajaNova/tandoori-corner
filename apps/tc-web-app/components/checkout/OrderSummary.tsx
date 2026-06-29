import type { CartItem } from "@/lib/cart";

type OrderSummaryProps = {
  cart: CartItem[];
  deliveryFee: number;
  onRemoveItem: (menuItemId: string) => void;
  subtotal: number;
  tax: number;
  total: number;
};

export function OrderSummary({
  cart,
  deliveryFee,
  onRemoveItem,
  subtotal,
  tax,
  total,
}: OrderSummaryProps) {
  return (
    <div className="lg:col-span-5">
      <div className="sticky top-32 border border-border bg-card p-8">
        <h3 className="mb-6 font-kaushan text-2xl text-ink">Order Summary</h3>

        <div className="custom-scrollbar mb-8 max-h-[40vh] space-y-6 overflow-y-auto pr-2">
          {cart.map((item) => (
            <div key={item.name} className="flex items-start gap-4">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded bg-accent font-sans text-xs text-brand-gold">
                {item.qty}x
              </div>
              <div className="flex-1">
                <h4 className="mb-1 text-sm font-medium text-ink">
                  {item.name}
                </h4>
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.menuItemId)}
                  className="text-[10px] font-bold uppercase tracking-widest text-ink/40 transition-colors hover:text-red-400"
                >
                  Remove
                </button>
              </div>
              <div className="shrink-0 font-medium text-ink">
                ${(item.price * item.qty).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 border-t border-border pt-6 text-sm">
          <div className="flex items-center justify-between text-ink/70">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-ink/70">
            <span>GST (9%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-ink/70">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>

          <div className="mt-4 mb-2 flex items-center justify-between border-t border-border pt-4 text-ink">
            <span className="font-raleway text-lg font-bold">Total</span>
            <span className="font-raleway text-2xl font-bold text-brand-gold">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
