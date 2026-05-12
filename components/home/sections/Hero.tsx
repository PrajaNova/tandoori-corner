import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import RatingStar from "@/components/ui/ratingStart";

export function Hero() {
  return (
    <section className="relative flex items-start justify-center overflow-hidden bg-ink pt-28 pb-10 text-cream sm:pt-32 sm:pb-20 md:h-[90vh] md:items-center md:py-0">
      <div className="absolute inset-0">
        <Image
          fill
          priority
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80"
          alt="Hero background image of a vibrant Indian dish with rich colors and textures, showcasing the essence of Tandoori Corner's culinary artistry."
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hero-vignette" />
      </div>
      <div className="relative z-1 mx-auto max-w-5xl px-5 text-center sm:px-6 md:mt-10">
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 mb-5 sm:mb-8">
          <Badge
            className="max-w-full bg-accent text-ink shadow-xl backdrop-blur-md"
            variant="outline"
          >
            <RatingStar rating={4.5} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              on Google
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
        <div>
          <h1 className="font-space text-[1.95rem] sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 leading-[1.08] sm:leading-[1.1]">
            Elevated Indian <br className="sm:hidden" />
            Dining &amp; <br />{" "}
            <span className="italic font-light">Evening Cocktails</span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-cream/90 mb-7 sm:mb-10 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Enjoy our 15-year heritage flavors at the TCB Bar or our alfresco
            balcony
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <ButtonLink
              href="/menu"
              className="w-full group text-sm sm:w-auto"
              size="lg"
              encIcon={
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              }
            >
              Explore The Menu
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
