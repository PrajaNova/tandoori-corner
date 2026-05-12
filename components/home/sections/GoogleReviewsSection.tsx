"use client";

import { ChefHat, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const googleReviews = [
  {
    author: "Fab N",
    excerpt: "Every dish was well balanced and the service was great.",
    source: "Google review",
  },
  {
    author: "Abhyasa Home Yoga",
    excerpt: "Very delicious and excellent service!",
    source: "Google review",
  },
  {
    author: "Kiku C",
    excerpt: "The food is awesome.",
    source: "Google review",
  },
];

export function GoogleReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeReview = googleReviews[activeIndex];

  useEffect(() => {
    const loop = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % googleReviews.length);
    }, 5200);

    return () => window.clearInterval(loop);
  }, []);

  return (
    <section
      aria-label="Google guest reviews"
      className="relative isolate overflow-hidden bg-ink py-24 text-center text-cream sm:py-28 md:py-36"
    >
      <Image
        fill
        src="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&q=80"
        alt=""
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/78" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/45 to-ink/90" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/55" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6">
        <div className="mb-7 flex flex-col items-center gap-3">
          <ChefHat className="h-9 w-9 text-cream" strokeWidth={1.5} />
          <div className="flex items-center gap-1 text-brand-gold">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="h-4 w-4 fill-current"
                strokeWidth={1.8}
              />
            ))}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-cream/70">
            4.4 on Google Reviews
          </p>
        </div>

        <div className="relative mx-auto min-h-44 max-w-4xl sm:min-h-40">
          <AnimatePresence mode="wait">
            <motion.figure
              key={activeReview.author}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-x-0 top-0"
            >
              <blockquote className="font-script text-4xl leading-tight text-cream drop-shadow-sm sm:text-5xl md:text-6xl">
                &ldquo;{activeReview.excerpt}&rdquo;
              </blockquote>
              <figcaption className="mt-7 text-sm font-medium text-brand-gold">
                - {activeReview.author}
                <span className="ml-2 text-xs uppercase tracking-widest text-cream/55">
                  {activeReview.source}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {googleReviews.map((review, index) => (
            <button
              key={review.author}
              type="button"
              aria-label={`Show review from ${review.author}`}
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === index
                  ? "w-8 bg-brand-gold"
                  : "w-2.5 bg-cream/40 hover:bg-cream/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
