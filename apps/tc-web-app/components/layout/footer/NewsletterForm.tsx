export function NewsletterForm() {
  return (
    <div className="flex w-full max-w-sm border border-white/15 rounded-full overflow-hidden">
      <input
        type="email"
        placeholder="Subscribe Our Newsletter"
        className="bg-transparent border-none outline-none text-sm px-6 py-3 w-full text-white placeholder:text-white/30"
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
