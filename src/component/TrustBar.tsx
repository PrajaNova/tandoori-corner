import { CalendarDays, PawPrint, Star, Trophy } from "lucide-react";

const trustItems = [
  {
    label: "4.5 Google Rating",
    detail: "1,200+ reviews",
    icon: Star,
  },
  {
    label: "TripAdvisor",
    detail: "Excellence Award",
    icon: Trophy,
  },
  {
    label: "Since 2008",
    detail: "Balestier staple",
    icon: CalendarDays,
  },
  {
    label: "Pet-Friendly",
    detail: "Alfresco dining",
    icon: PawPrint,
  },
];

export function TrustBar() {
  return (
    <section id="trust" className="bg-cream text-madison">
      <div className="mx-auto grid max-w-7xl gap-4 px-6 py-6 sm:px-10 md:grid-cols-4 lg:px-12">
        {trustItems.map((item) => {
          const Icon = item.icon;

          return (
            <div className="flex items-center gap-3" key={item.label}>
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-serif text-lg font-bold leading-tight">
                  {item.label}
                </span>
                <span className="block text-sm text-muted">{item.detail}</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
