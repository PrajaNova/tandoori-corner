"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";

interface SlideAction {
  label: string;
  href: string;
  variant?: "solid" | "outline";
}

interface Slide {
  image: string;
  cursive: string;
  heading: string;
  desc?: string;
  actions: SlideAction[];
}

const slides: Slide[] = [
  {
    image: "/granny/granny_sliders_slide-bg_3.jpg",
    cursive: "Since 2008",
    heading: "Authentic North Indian Cuisine",
    desc: "Tandoori Corner is a beloved North Indian curry house on Balestier Road, Singapore. Experience tandoor-fired perfection and time-honoured recipes from our master chefs.",
    actions: [
      { label: "View Menu", href: "/menu", variant: "solid" },
      { label: "Reserve Now", href: "/#reservation", variant: "outline" },
    ],
  },
  {
    image: "/granny/granny_sliders_slide-bg_4.jpg",
    cursive: "Expert Chefs",
    heading: "Tandoor-Fired Perfection",
    actions: [
      { label: "Reserve Now", href: "/#reservation", variant: "solid" },
    ],
  },
  {
    image: "/granny/granny_sliders_slide-bg_7.jpg",
    cursive: "Balestier Road, Singapore",
    heading: "Discover Our Flavours",
    desc: "From succulent Tandoori Chicken to rich Butter Chicken and freshly baked Peshawari Naan — every dish tells a story of passion and authentic spice.",
    actions: [{ label: "Explore Menu", href: "/menu", variant: "solid" }],
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative flex min-h-[700px] h-[700px] items-center justify-center overflow-hidden bg-ink group">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url('${activeSlide.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-black/45" />

      {/* Arrows (visible on hover) */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronLeft className="w-12 h-12" strokeWidth={1} />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronRight className="w-12 h-12" strokeWidth={1} />
      </button>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto"
        key={currentSlide}
      >
        <span className="font-script text-[#f9f9f9] text-3xl md:text-4xl mb-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {activeSlide.cursive}
        </span>
        <h1 className="font-kaushan text-5xl md:text-7xl text-white mb-6 capitalize leading-[1.15] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
          {activeSlide.heading}
        </h1>
        {activeSlide.desc && (
          <p className="font-raleway text-[#f9f9f9] text-base md:text-[17px] font-bold max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            {activeSlide.desc}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          {activeSlide.actions.map((action) =>
            action.variant === "outline" ? (
              <ButtonLink
                key={action.label}
                href={action.href}
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-ink rounded-none px-10 py-6 text-xs tracking-widest uppercase font-bold font-raleway"
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

      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, idx) => (
          <button
            type="button"
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              idx === currentSlide
                ? "bg-primary"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
