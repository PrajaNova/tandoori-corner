import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { CateringPackage } from "@/data/catering";

const accentBand: Record<CateringPackage["accent"], string> = {
  dark: "bg-brand-dark",
  mid: "bg-primary-dark",
  light: "bg-primary",
};

export function OptionCard({ pkg }: { pkg: CateringPackage }) {
  const includedFeatures = pkg.features.filter((f) => f.included).slice(0, 5);

  return (
    <Link
      href={`/catering/${pkg.id}`}
      className="group flex flex-col overflow-hidden rounded-card border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:border-primary/45 hover:shadow-card-hover"
    >
      <div
        className={`relative px-6 py-7 text-center text-cream ${accentBand[pkg.accent]}`}
      >
        {pkg.badge ? (
          <span className="absolute right-3 top-3 rounded-full bg-cream/15 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-cream">
            {pkg.badge}
          </span>
        ) : null}
        <h3 className="font-space text-2xl font-bold uppercase tracking-[0.12em]">
          {pkg.name}
        </h3>
        <p className="mt-1 text-[11px] font-light uppercase tracking-[0.22em] text-cream/75">
          {pkg.tagline}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-end justify-between border-b border-border pb-4">
          <div>
            <span className="font-space text-3xl font-bold text-ink">
              {pkg.pricePerHead}
            </span>
            <span className="ml-1 text-xs text-ink/50">/ guest</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink/45">
            Min {pkg.minGuests} pax
          </span>
        </div>

        <ul className="flex-1 space-y-2.5">
          {includedFeatures.map((feature) => (
            <li
              key={feature.label}
              className="flex items-center gap-2.5 text-sm text-ink/80"
            >
              <Check className="h-4 w-4 shrink-0 text-brand-gold" />
              <span className="leading-tight">{feature.label}</span>
            </li>
          ))}
        </ul>

        <span className="mt-6 inline-flex items-center justify-center gap-2 bg-brand-gold px-6 py-3 text-xs font-bold uppercase tracking-widest text-brand-dark transition-colors group-hover:bg-brand-dark group-hover:text-cream">
          View Menu
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
