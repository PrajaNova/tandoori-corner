import Link from "next/link";

export function OrderHero() {
  return (
    <section className="relative flex items-center justify-center min-h-[520px] pt-28 pb-20 text-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/granny/granny_page-title_7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
      {/* Subtle orange/amber glow at the bottom of hero representing the warm tandoor clay-oven */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-transparent to-transparent z-0 opacity-10" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        {/* Premium Gold Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-[9px] font-bold uppercase tracking-[0.25em] text-primary mb-6 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Tandoori Corner Singapore
        </div>

        {/* Cursive Subtitle */}
        <span className="font-script text-primary text-3xl md:text-5xl block mb-2 drop-shadow-md">
          Fresh Indian Flavours Delivered
        </span>

        {/* Main Heading */}
        <h1 className="font-kaushan text-4xl md:text-6xl text-white capitalize mb-4 leading-tight tracking-wide drop-shadow-lg">
          Order Indian Feast
        </h1>

        {/* Description */}
        <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6 font-raleway max-w-2xl mx-auto font-light">
          Select from our signature slow-charred grills, rich silken curries,
          and freshly baked tandoor breads. Fast self-pickup or hot, prompt
          island-wide delivery.
        </p>

        {/* Breadcrumbs */}
        <ol className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase text-white/80">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li className="text-white/40">/</li>
          <li>
            <Link
              href="/order"
              className="text-primary hover:text-primary transition-colors"
            >
              Order Online
            </Link>
          </li>
        </ol>
      </div>
    </section>
  );
}
