import Image from "next/image";
import { Button } from "@/component/ui/button";

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[90svh] items-center overflow-hidden bg-madison text-white">
      <Image
        src="/tandoori-hero.jpg"
        alt="Tandoori Corner alfresco dining at Balestier"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-madison/35 via-madison/45 to-madison/90" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 pb-16 pt-44 text-center sm:px-10 lg:px-12">
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-bold text-white/90">
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
            ***** 4.5 on Google · 1,200+ reviews
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
            TripAdvisor Excellence Award
          </span>
        </div>

        <h1 className="mt-7 max-w-5xl font-serif text-5xl leading-[1.02] text-white sm:text-6xl lg:text-7xl">
          Authentic North Indian. Balestier. Since 2008.
        </h1>

        <p className="mt-6 hidden max-w-3xl text-xl leading-8 text-white/82 sm:block">
          Casual alfresco dining — pet friendly — with a bar next door.
        </p>
        <p className="mt-5 max-w-xs text-lg leading-7 text-white/82 sm:hidden">
          Alfresco · Pet Friendly · Bar next door
        </p>

        <div className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="default" variant="gold" className="h-14 px-9">
            <a href="/#reserve">Book Your Table</a>
          </Button>
          <Button
            asChild
            size="default"
            variant="heroOutline"
            className="h-14 px-9"
          >
            <a href="/#menu">Explore the Menu</a>
          </Button>
        </div>

        <a
          href="/#events"
          className="mt-6 text-sm font-semibold text-white/85 transition hover:text-curry"
        >
          Planning a private event? Book TCB -&gt;
        </a>

        <a
          href="/#trust"
          className="absolute bottom-6 text-xs font-bold uppercase tracking-[0.18em] text-white/70 transition hover:text-curry"
        >
          Explore
        </a>
      </div>
    </section>
  );
}
