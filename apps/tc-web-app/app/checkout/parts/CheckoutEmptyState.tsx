type CheckoutEmptyStateProps = {
  onViewMenu: () => void;
};

export function CheckoutEmptyState({ onViewMenu }: CheckoutEmptyStateProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream pt-32 pb-40">
      <h2 className="mb-4 font-kaushan text-3xl text-ink">
        Your order is empty
      </h2>
      <p className="mb-8 font-light text-ink/50">
        Add some items from our menu to begin checkout.
      </p>
      <button
        type="button"
        onClick={onViewMenu}
        className="bg-brand-gold px-10 py-4 text-xs font-bold uppercase tracking-widest text-brand-dark transition-colors hover:bg-cream"
      >
        View Menu
      </button>
    </div>
  );
}
