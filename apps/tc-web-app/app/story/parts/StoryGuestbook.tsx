"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const guestbook = [
  {
    text: "Unpretentious and wholesome — all our favourite dishes hit the right notes consistently. The Butter Chicken and Peshawari Naan are absolute perfection. We keep coming back every week!",
    author: "- ElaiNe Lin, Singapore",
    avatar: "/granny/granny_testimonial_1.png",
  },
  {
    text: "The Tandoori Chicken here is the best I have had outside of India. Succulent, perfectly spiced and smoky from the clay oven. The kebabs and naans are equally outstanding. A gem on Balestier Road.",
    author: "- Pravesh Gupta, India",
    avatar: "/granny/granny_testimonial_2.png",
  },
  {
    text: "We have been regulars for years. The Dal Makhani and Lamb Rogan Josh are consistently incredible. Friendly staff, great atmosphere and outstanding value for money.",
    author: "- John Arax, Singapore",
    avatar: "/granny/granny_testimonial_3.png",
  },
  {
    text: "Simply the finest North Indian food in Singapore. Chef Ramesh's recipes are the real deal — every dish carries the depth and warmth of authentic Indian cooking.",
    author: "- Anthony Kevin, Malaysia",
    avatar: "/granny/granny_testimonial_4.png",
  },
];

export function StoryGuestbook() {
  const [active, setActive] = useState(0);
  const current = guestbook[active];

  return (
    <section className="relative py-24 flex items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/granny/granny_background_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/70" />

      <div className="container relative z-10 px-4 max-w-3xl mx-auto text-center">
        <SectionHeading
          cursiveText="People talk"
          mainText="Our Guestbook"
          dark
        />

        <div className="mt-8">
          <div className="flex justify-center space-x-1 mb-8 text-[#ffb400]">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <blockquote className="font-kaushan text-2xl md:text-3xl text-white leading-relaxed mb-10">
            &ldquo; {current.text} &rdquo;
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3">
              <Image
                src={current.avatar}
                alt={current.author}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-raleway text-white/70 italic">
              {current.author}
            </p>
          </div>
          <div className="flex justify-center space-x-2 mt-8">
            {guestbook.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActive(idx)}
                aria-label={`Review ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  idx === active
                    ? "bg-primary"
                    : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
