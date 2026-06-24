"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { testimonialContent } from "@/content/testimonial";

export function Testimonial() {
  const [startIndex, setStartIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const items = testimonialContent.items;
  const length = items.length;

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, length]);

  // Get current 3 items to show
  const visibleItems = [
    items[startIndex],
    items[(startIndex + 1) % length],
    items[(startIndex + 2) % length],
  ];

  return (
    <section
      className="relative py-24 flex flex-col items-center justify-center overflow-hidden min-h-[550px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${testimonialContent.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 bg-black/75 z-0" />

      <div className="w-full px-6 md:px-16 lg:px-20 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="font-script text-primary text-3xl md:text-4xl block mb-2">
            Reviews
          </span>
          <h2 className="font-kaushan text-4xl md:text-5xl text-white capitalize leading-tight">
            Guest Testimonials
          </h2>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <span className="h-px w-12 bg-primary/40 block" />
            <span className="text-primary text-sm">✦ ✦</span>
            <span className="h-px w-12 bg-primary/40 block" />
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative px-4 md:px-12">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleItems.map((item, idx) => {
              // We hide items responsively so only 1 shows on mobile, 2 on tablet, 3 on desktop
              const responsiveClasses =
                idx === 0
                  ? "block"
                  : idx === 1
                    ? "hidden md:flex"
                    : "hidden lg:flex";

              return (
                <div
                  key={item.author}
                  className={`${responsiveClasses} flex flex-col justify-between bg-white/90 backdrop-blur-md border border-white/20 p-8 rounded-lg shadow-xl hover:bg-white/95 transition-all duration-300 h-full transform hover:-translate-y-1`}
                >
                  <div>
                    {/* Stars */}
                    <div className="flex space-x-1 mb-5 text-[#ffb400]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    {/* Quote */}
                    <blockquote className="font-raleway text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-6 italic min-h-[100px] block">
                      &ldquo; {item.quote} &rdquo;
                    </blockquote>
                  </div>

                  {/* Reviewer info */}
                  <div className="flex items-center pt-4 border-t border-black/5 mt-auto">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-black/10 flex-shrink-0 mr-4">
                      <Image
                        src={item.avatar}
                        alt={`Review by ${item.author.replace(/^-\s*/, "")}`}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-raleway text-xs md:text-sm font-bold uppercase tracking-wider text-ink">
                        {item.author.replace(/^-\s*/, "")}
                      </p>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-widest mt-0.5">
                        Verified Guest
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
