"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const quote =
  "Once again, I feel compelled to write about our wonderful dining experience at Granny. My wife and I have often had wonderful meals. We have shared either meals or conversations about our meals at your restaurant with friends and family";

const testimonials = [
  { author: "- Todd Stephen", avatar: "/granny/granny_testimonial_1.png" },
  { author: "- David Casper", avatar: "/granny/granny_testimonial_2.png" },
];

export function GrannyTestimonial() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <section className="py-24 bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="flex justify-center space-x-1 mb-8 text-[#ffb400]">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-5 h-5 fill-current" />
          ))}
        </div>

        <blockquote className="font-kaushan text-2xl md:text-[34px] text-foreground leading-relaxed mb-10">
          &ldquo; {quote} &rdquo;
        </blockquote>

        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4">
            <Image
              src={current.avatar}
              alt={current.author}
              fill
              className="object-cover"
            />
          </div>
          <p className="font-raleway text-muted-foreground italic">
            {current.author}
          </p>
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              aria-label={`Testimonial ${idx + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                idx === active
                  ? "bg-ink"
                  : "border border-primary bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
