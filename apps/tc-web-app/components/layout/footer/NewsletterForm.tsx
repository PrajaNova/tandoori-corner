export function NewsletterForm() {
  return (
    <div className="flex w-full max-w-sm border border-white/15 rounded-full overflow-hidden">
      <input
        aria-label="Email address for newsletter"
        autoComplete="email"
        name="email"
        type="email"
        placeholder="Email address…"
        className="w-full border-none bg-transparent px-6 py-3 text-sm text-white outline-none placeholder:text-white/30 focus-visible:ring-2 focus-visible:ring-primary"
      />
      <button
        type="button"
        className="px-6 text-primary hover:text-white transition-colors"
        aria-label="Subscribe to newsletter"
      >
        →
      </button>
    </div>
  );
}
