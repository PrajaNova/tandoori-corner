import { ArrowRight, Sparkles, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

export function BuildYourOwnCard() {
  return (
    <Link
      href="/catering/build"
      className="group col-span-full flex flex-col items-center gap-6 overflow-hidden border-2 border-dashed border-primary/40 bg-ink p-7 text-white transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl sm:p-9 md:flex-row md:gap-8"
    >
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
        <UtensilsCrossed className="h-7 w-7" />
      </span>

      <div className="flex-1 text-center md:text-left">
        <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-primary">
          <Sparkles className="h-3 w-3" />
          Custom Menu
        </span>
        <h3 className="font-kaushan text-3xl sm:text-4xl">
          Build Your Own Feast
        </h3>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-white/75 md:mx-0">
          Browse the full catering menu, filter by course and veg / non-veg, and
          hand-pick every dish. We&apos;ll send a tailored quote for your guest
          count and date.
        </p>
      </div>

      <span className="inline-flex w-full shrink-0 items-center justify-center gap-2 bg-primary px-7 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors group-hover:bg-white group-hover:text-ink md:w-auto">
        Start Building
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
