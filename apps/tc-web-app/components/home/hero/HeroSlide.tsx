import { ButtonLink } from "@/components/ui/button";
import type { Slide } from "./types";

interface HeroSlideProps {
  slide: Slide;
  isActive: boolean;
}

export function HeroSlide({ slide, isActive }: HeroSlideProps) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${
        isActive
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${slide.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-black/45" />

      {/* Centered Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto h-full pb-36">
        <span
          className={`font-script text-[#f9f9f9] text-3xl md:text-4xl mb-2 transition-all duration-700 delay-100 transform ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {slide.cursive}
        </span>
        <h1
          className={`font-kaushan text-5xl md:text-7xl text-white mb-6 capitalize leading-[1.15] transition-all duration-700 delay-200 transform ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {slide.heading}
        </h1>
        {slide.desc && (
          <p
            className={`font-raleway text-[#f9f9f9] text-base md:text-[17px] font-bold max-w-2xl transition-all duration-700 delay-300 transform ${
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {slide.desc}
          </p>
        )}
      </div>

      {/* Absolutely Positioned Buttons at Fixed Height */}
      <div
        className={`absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 transform ${
          isActive
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {slide.actions.map((action) =>
          action.variant === "outline" ? (
            <ButtonLink
              key={action.label}
              href={action.href}
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-primary hover:border-primary hover:text-white rounded-none px-10 py-6 text-xs tracking-widest uppercase font-bold font-raleway"
            >
              {action.label}
            </ButtonLink>
          ) : (
            <ButtonLink
              key={action.label}
              href={action.href}
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 rounded-none px-10 py-6 text-xs tracking-widest uppercase font-bold font-raleway"
            >
              {action.label}
            </ButtonLink>
          ),
        )}
      </div>
    </div>
  );
}
