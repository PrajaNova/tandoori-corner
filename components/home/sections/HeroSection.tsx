import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative flex items-start justify-center overflow-hidden bg-ink pt-28 pb-10 text-cream sm:pt-32 sm:pb-20 md:h-[90vh] md:items-center md:py-0">
      <div className="absolute inset-0">
        <Image
          fill
          priority
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80"
          alt=""
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(44,38,33,0.18)_0%,rgba(44,38,33,0.56)_48%,rgba(44,38,33,0.88)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/30 to-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/65" />
        <div className="absolute inset-0 bg-gradient-to-tr from-tandoori/20 via-transparent to-sage/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6 md:mt-10">
        <div>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 mb-5 sm:mb-8">
            <Badge
              className="max-w-full bg-accent text-ink shadow-xl backdrop-blur-md"
              variant="outline"
            >
              <div className="flex text-brand-gold">
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" opacity={0.5} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">
                4.5 on Google
              </span>
            </Badge>
            <Badge
              className="max-w-full bg-accent text-ink shadow-xl backdrop-blur-md"
              variant="outline"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-widest">
                TripAdvisor Excellence
              </span>
            </Badge>
          </div>

          <span className="text-brand-gold font-sans tracking-[0.22em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-4 sm:mb-6 block font-medium">
            Inside Tandoori Corner
          </span>
          <h1 className="font-space text-[1.95rem] sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 leading-[1.08] sm:leading-[1.1]">
            Elevated Indian <br className="sm:hidden" />
            Dining &amp; <br />{" "}
            <span className="italic font-light">Evening Cocktails.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-cream/70 mb-7 sm:mb-10 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the acclaimed flavors of our 15-year heritage, now served
            in the lush alfresco balcony or inside the exclusive TCB Bar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <ButtonLink
              href="/menu"
              className="w-full group text-sm sm:w-auto"
              size="lg"
            >
              Explore The Menu{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </ButtonLink>
            <ButtonLink
              href="/experience"
              className="w-full border-cream/70 text-sm text-cream hover:bg-cream hover:text-ink sm:w-auto"
              size="lg"
              variant="outline"
            >
              Reserve Alfresco
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
