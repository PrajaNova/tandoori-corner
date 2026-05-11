import { CalendarCheck, GlassWater, MapPin, PawPrint } from "lucide-react";
import Image from "next/image";
import { Button } from "@/component/ui/button";

const proofPoints = [
  {
    icon: CalendarCheck,
    label: "Since 2008",
    copy: "A Balestier staple for North Indian flavours.",
  },
  {
    icon: PawPrint,
    label: "Pet-friendly alfresco",
    copy: "Outdoor dining with views over the heritage trail.",
  },
  {
    icon: GlassWater,
    label: "TCB bar",
    copy: "Stylish indoor bar for dates, groups, and private nights.",
  },
];

export function VibeStudio() {
  return (
    <section id="about" className="bg-cream text-madison">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">
              The vibe studio
            </p>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
              One address. Two ways to make the night yours.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {proofPoints.map((point) => {
              const Icon = point.icon;

              return (
                <article
                  className="rounded-card border border-line bg-white p-4 shadow-card"
                  key={point.label}
                >
                  <Icon aria-hidden="true" className="mb-4 size-5 text-brand" />
                  <h3 className="font-serif text-lg">{point.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {point.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div
          className="mt-10 grid overflow-hidden rounded-card bg-madison shadow-card lg:grid-cols-2"
          id="gallery"
        >
          <article className="relative min-h-[34rem] overflow-hidden">
            <Image
              alt="Tandoori Corner alfresco dining at Balestier"
              className="object-cover"
              fill
              priority={false}
              sizes="(min-width: 1024px) 50vw, 100vw"
              src="/tandoori-hero.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <p className="inline-flex rounded-full bg-leaf px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white">
                Day / casual
              </p>
              <h3 className="mt-4 font-serif text-4xl text-white">
                Paws & Plates.
              </h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/82">
                Enjoy pet-friendly alfresco dining above Balestier Road, with
                North Indian favourites, wine, and a relaxed balcony view.
              </p>
              <Button asChild className="mt-6" variant="gold">
                <a href="/reserve">Book an alfresco table</a>
              </Button>
            </div>
          </article>

          <article className="relative min-h-[34rem] overflow-hidden bg-ink">
            <Image
              alt="Tandoori Corner Bar private dining"
              className="object-cover opacity-82"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              src="/tandoori-tcb.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <p className="inline-flex rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white">
                Night / private
              </p>
              <h3 className="mt-4 font-serif text-4xl text-white">
                TCB: Your Private Bar.
              </h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/82">
                Intimate, stylish, and ready for your group. Book the indoor bar
                for private events, wine pairing, cocktails, and celebrations.
              </p>
              <Button asChild className="mt-6" variant="outline">
                <a href="/tcb">Plan a private event</a>
              </Button>
            </div>
          </article>
        </div>

        <div className="mt-6 grid gap-4 rounded-card bg-white p-5 shadow-card md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex gap-3">
            <MapPin aria-hidden="true" className="mt-1 size-5 text-brand" />
            <div>
              <h3 className="font-serif text-xl">
                Discover Balestier's hidden gem.
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Balestier Plaza gives you a convenient base, with plenty of
                parking and a direct path to alfresco dining.
              </p>
            </div>
          </div>
          <Button asChild variant="secondary">
            <a
              href="https://www.google.com/maps/search/?api=1&query=400+Balestier+Road+%2301-12+Balestier+Plaza+Singapore+329802"
              rel="noreferrer"
              target="_blank"
            >
              Open map
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
