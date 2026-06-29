"use client";

import { useEffect, useState } from "react";
import { slides } from "@/content/hero";
import { HeroArrows } from "./hero/HeroArrows";
import { HeroDots } from "./hero/HeroDots";
import { HeroSlide } from "./hero/HeroSlide";

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

  return (
    <section className="relative flex h-[100svh] min-h-[620px] max-h-[820px] items-center justify-center overflow-hidden bg-ink group md:min-h-[700px]">
      {/* Slides Container */}
      {slides.map((slide, idx) => (
        <HeroSlide
          key={idx}
          slide={slide}
          isActive={idx === currentSlide}
          isPageHeading={idx === 0}
        />
      ))}

      {/* Manual Control: Left & Right Arrows */}
      <HeroArrows onPrev={prevSlide} onNext={nextSlide} />

      {/* Manual Control: Dots indicator */}
      <HeroDots
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onChange={setCurrentSlide}
      />
    </section>
  );
}
