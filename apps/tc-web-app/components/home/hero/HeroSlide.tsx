import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import type { Slide } from "./types";

interface HeroSlideProps {
  isPageHeading: boolean;
  slide: Slide;
  isActive: boolean;
}

export function HeroSlide({ slide, isActive, isPageHeading }: HeroSlideProps) {
  const headingClassName = `mb-6 font-kaushan text-5xl capitalize leading-[1.15] text-white transition-[opacity,transform] delay-150 duration-300 ease-out motion-reduce:transform-none md:text-7xl ${
    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
  }`;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-out ${
        isActive
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Background Image Layer */}
      <div
        className={`absolute inset-0 z-0 transition-transform duration-[6000ms] ease-out motion-reduce:transition-none ${
          isActive ? "scale-105" : "scale-100"
        }`}
      >
        <Image
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          height={1080}
          loading={isPageHeading ? undefined : "lazy"}
          preload={isPageHeading}
          sizes="100vw"
          src={slide.image}
          width={1920}
        />
      </div>
      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-black/45" />

      {/* Centered Text Content */}
      <div className="relative z-10 flex h-full max-w-4xl flex-col items-center justify-center px-4 pb-[clamp(9rem,18vh,12rem)] text-center mx-auto">
        <span
          className={`mb-2 font-script text-3xl text-[#f9f9f9] transition-[opacity,transform] delay-100 duration-300 ease-out motion-reduce:transform-none md:text-4xl ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {slide.cursive}
        </span>
        {isPageHeading ? (
          <h1 className={headingClassName}>{slide.heading}</h1>
        ) : (
          <h2 className={headingClassName}>{slide.heading}</h2>
        )}
        {slide.desc && (
          <p
            className={`max-w-2xl font-raleway text-base font-bold text-[#f9f9f9] transition-[opacity,transform] delay-200 duration-300 ease-out motion-reduce:transform-none md:text-[17px] ${
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {slide.desc}
          </p>
        )}
      </div>

      {/* Absolutely Positioned Buttons at Fixed Height */}
      <div
        className={`absolute bottom-[clamp(4.75rem,10vh,6rem)] left-1/2 z-10 flex -translate-x-1/2 flex-col gap-4 transition-[opacity,transform] delay-200 duration-300 ease-out motion-reduce:transform-none sm:flex-row ${
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
