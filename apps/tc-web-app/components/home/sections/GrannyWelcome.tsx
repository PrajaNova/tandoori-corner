import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

const cards = [
  {
    subtitle: "Start eating better",
    title: "Daily New Fresh Menus",
    image: "/granny/granny_banners_1.jpg",
    description:
      "Granny help you treat yourself with a different meal everyday, thanks to our daily changing menus and our awesome creative chefs!",
  },
  {
    subtitle: "Quality is the heart",
    title: "Fresh Ingredient, Tasty Meals",
    image: "/granny/granny_banners_2.jpg",
    description:
      "Who said healthy food can't also be delicious? Granny creative chefs use fresh and seasonal ingredients to make affordable.",
  },
  {
    subtitle: "Hot & ready to serve",
    title: "Creative & Talented Chefs",
    image: "/granny/granny_banners_3.jpg",
    description:
      "Granny have offered a team of culinary professionals that make delectable dishes at memorable events for both private clientele.",
  },
];

export function GrannyWelcome() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading cursiveText="Hello dear" mainText="Welcome To Granny" />

        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed">
          Granny was the first retaurant to open in Egypt, the resturant was
          designed with the history in mind we have created a soft industrial
          dining room, combined with an open kitchen, coffee take out bar and on
          site coffee roastery.
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
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <span className="font-script text-primary text-2xl mb-1">
                {card.subtitle}
              </span>
              <h4 className="font-raleway text-lg font-bold uppercase tracking-wide mb-4">
                {card.title}
              </h4>
              <p className="text-muted-foreground px-4 mb-6 text-sm leading-relaxed">
                {card.description}
              </p>
              <Link
                href="/about"
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
