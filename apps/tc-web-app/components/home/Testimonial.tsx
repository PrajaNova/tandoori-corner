"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { testimonialContent } from "@/content/testimonial";

export function Testimonial() {
  const [active, setActive] = useState(0);
  const current = testimonialContent[active];

  return (
    <section className="py-24 bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="flex justify-center space-x-1 mb-8 text-[#ffb400]">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-5 h-5 fill-current" />
          ))}
        </div>

        <blockquote className="font-kaushan text-2xl md:text-[34px] text-foreground leading-relaxed mb-10">
          &ldquo; {current.quote} &rdquo;
        </blockquote>

        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4">
            <Image
              src={current.avatar}
              alt={`Review by ${current.author.replace(/^-\s*/, "")}`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <p className="font-raleway text-muted-foreground italic">
            {current.author}
          </p>
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          {testimonialContent.map((_, idx) => (
            <Button
              key={idx}
              onClick={() => setActive(idx)}
              variant="ghost"
              className={`w-2.5 h-2.5 p-0 rounded-full min-w-0 min-h-0 border cursor-pointer transition-colors ${
                idx === active
                  ? "bg-ink border-ink hover:bg-ink"
                  : "border-primary bg-transparent hover:bg-primary/20"
              }`}
              aria-label={`Testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
