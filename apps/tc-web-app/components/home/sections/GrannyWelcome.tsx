import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

const cards = [
  {
    subtitle: "Spices from the heart",
    title: "Authentic Indian Recipes",
    image: "/granny/granny_banners_1.jpg",
    description:
      "Every dish at Tandoori Corner is crafted using traditional North Indian recipes handed down through generations — rich in spice, aroma, and soul.",
  },
  {
    subtitle: "Quality is everything",
    title: "Fresh Ingredients Daily",
    image: "/granny/granny_banners_2.jpg",
    description:
      "We source the finest halal meats and freshest vegetables daily. Our spice blends are prepared in-house to ensure every meal bursts with authentic flavour.",
  },
  {
    subtitle: "Masters of the tandoor",
    title: "Expert Chefs, Since 2008",
    image: "/granny/granny_banners_3.jpg",
    description:
      "Led by Chef Ramesh, who trained in five-star hotels across India, our culinary team brings decades of expertise to every plate we serve.",
  },
];

export function GrannyWelcome() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading cursiveText="Hello dear" mainText="Welcome To Tandoori Corner" />

        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed">
          Established in 2008, Tandoori Corner is Singapore&apos;s favourite North Indian curry house, nestled along the heritage trail of Balestier Road. We combine the warmth of alfresco dining with bold, authentic flavours that keep our guests coming back for more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-center text-center"
            >
              <div className="w-full aspect-[4/3] relative mb-7 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <span className="font-script text-primary text-2xl mb-1">
                {card.subtitle}
              </span>
              <h3 className="font-raleway text-lg font-bold uppercase tracking-wide mb-4">
                {card.title}
              </h3>
              <p className="text-muted-foreground px-4 mb-6 text-sm leading-relaxed">
                {card.description}
              </p>
              <Link
                href="/story"
                className="font-raleway text-xs font-bold tracking-widest uppercase text-foreground hover:text-primary transition-colors"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
