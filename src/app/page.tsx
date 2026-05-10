const palette = [
  ["Brand", "bg-brand", "#ef800d"],
  ["Leaf", "bg-leaf", "#749c07"],
  ["Madison", "bg-madison", "#2d2e2e"],
  ["Curry", "bg-curry", "#eaa34c"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-section text-foreground">
      <section className="bg-madison text-white">
        <div className="mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-center gap-10 px-6 py-16 sm:px-10 lg:px-12">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-curry">
              North Indian Curry House
            </p>
            <h1 className="font-serif text-5xl leading-tight sm:text-7xl">
              Tandoori Corner
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              A warm restaurant theme built from the live Tandoori Corner color
              palette, Open Sans body text, and Merriweather display headings.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-card bg-brand px-7 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-lifted transition hover:bg-brand-hover hover:text-white"
            >
              View menu
            </a>
            <a
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-card border border-white px-7 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-charcoal"
            >
              Book a table
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
        <div className="rounded-card bg-white p-8 shadow-card">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-leaf">
            Tailwind theme
          </p>
          <h2 className="mt-3 font-serif text-display">Main brand tokens</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            Use classes like <code className="text-brand">bg-brand</code>,{" "}
            <code className="text-leaf">text-leaf</code>,{" "}
            <code className="text-madison">bg-madison</code>, and{" "}
            <code className="text-warm-brown">text-warm-brown</code> across the
            app.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {palette.map(([name, className, hex]) => (
            <div className="rounded-card bg-white p-4 shadow-card" key={name}>
              <div className={`mb-4 h-20 rounded-card ${className}`} />
              <p className="font-serif text-lg text-foreground">{name}</p>
              <p className="text-sm text-muted">{hex}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
