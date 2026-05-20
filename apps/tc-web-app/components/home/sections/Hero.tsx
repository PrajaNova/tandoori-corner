import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import RatingStar from "@/components/ui/ratingStart";
import { heroCopy } from "@/data/home";

const heroPoster =
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80";

export function Hero() {
  return (
    <section className="relative flex items-start justify-center overflow-hidden bg-ink pt-28 pb-10 text-cream sm:pt-32 sm:pb-20 md:h-[90vh] md:items-center md:py-0">
      <div className="absolute inset-0">
        <Image
          fill
          priority
          src={heroPoster}
          alt=""
          aria-hidden="true"
          className="object-cover md:hidden"
          sizes="(max-width: 767px) 100vw, 0px"
        />
        <video
          aria-hidden="true"
          autoPlay
          className="hidden h-full w-full object-cover md:block"
          loop
          muted
          poster={heroPoster}
          playsInline
          preload="metadata"
          tabIndex={-1}
        >
          <source
            media="(min-width: 768px)"
            src="/hero_intro.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-hero-vignette" />
      </div>
      <div className="relative z-1 mx-auto max-w-5xl px-5 text-center sm:px-6 md:mt-10">
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 mb-5 sm:mb-8">
          <Badge
            className="max-w-full text-cream/90 shadow-xl backdrop-blur-md"
            variant="outline"
          >
            <RatingStar rating={4.5} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              on Google
            </span>
          </Badge>
          <Badge
            className="max-w-full text-cream/90 shadow-xl backdrop-blur-md"
            variant="outline"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-widest">
              TripAdvisor Excellence
            </span>
          </Badge>
        </div>
        <div>
          <h1 className="font-space text-[2rem] sm:text-5xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-[1.08] sm:leading-[1.1]">
            {heroCopy.title}
          </h1>
          <p className="text-sm sm:text-base md:text-md text-cream/90 mb-7 sm:mb-10 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            {heroCopy.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <ButtonLink
              href={heroCopy.ctaPrimary.href}
              className="w-full group text-sm sm:w-auto"
              size="lg"
              encIcon={
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              }
            >
              {heroCopy.ctaPrimary.label}
            </ButtonLink>
            <ButtonLink
              href={heroCopy.ctaSecondary.href}
              className="w-full border-cream/70 text-sm text-cream hover:bg-cream hover:text-ink sm:w-auto"
              size="lg"
              variant="outline"
            >
              {heroCopy.ctaSecondary.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
