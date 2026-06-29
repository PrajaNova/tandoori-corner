import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { CateringPackage } from "@/data/catering";

const accentBand: Record<CateringPackage["accent"], string> = {
  dark: "bg-ink",
  mid: "bg-[#3a2f23]",
  light: "bg-primary",
};

export function OptionCard({ pkg }: { pkg: CateringPackage }) {
  const includedFeatures = pkg.features.filter((f) => f.included).slice(0, 5);

  return (
    <Link
      href={`/catering/${pkg.id}`}
      className="group motion-card-lift flex flex-col overflow-hidden border border-border bg-white transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-primary/45 hover:shadow-xl"
    >
      <div
        className={`relative px-6 py-7 text-center text-white ${accentBand[pkg.accent]}`}
      >
        {pkg.badge ? (
          <span className="absolute right-3 top-3 rounded-full bg-white/15 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white">
            {pkg.badge}
          </span>
        ) : null}
        <h3 className="font-kaushan text-3xl">{pkg.name}</h3>
        <p className="mt-1 text-[11px] font-light uppercase tracking-[0.22em] text-white/75">
          {pkg.tagline}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-end justify-between border-b border-border pb-4">
          <div>
            <span className="font-raleway text-3xl font-bold text-foreground">
              {pkg.pricePerHead}
            </span>
            <span className="ml-1 text-xs text-muted-foreground">/ guest</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Min {pkg.minGuests} pax
          </span>
        </div>

        <ul className="flex-1 space-y-2.5">
          {includedFeatures.map((feature) => (
            <li
              key={feature.label}
              className="flex items-center gap-2.5 text-sm text-foreground/80"
            >
              <Check className="h-4 w-4 shrink-0 text-primary" />
              <span className="leading-tight">{feature.label}</span>
            </li>
          ))}
        </ul>

        <span className="mt-6 inline-flex items-center justify-center gap-2 bg-ink px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-colors group-hover:bg-primary">
          View Menu
          <ArrowRight className="h-4 w-4 motion-icon-nudge" />
        </span>
      </div>
    </Link>
  );
}
