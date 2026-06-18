import React from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Dish {
  name: string;
  desc: string;
  price: string;
}

const columns: { image: string; items: Dish[] }[] = [
  {
    image: "/granny/granny_menu_simple-banner_1.jpg",
    items: [
      {
        name: "Chicken Breast",
        price: "$33.95",
        desc: "Paupiette of chicken, blue cheese, rosemary & beans.",
      },
      {
        name: "Salmon Steak",
        price: "$41.95",
        desc: "Salmon, butter, lemon juice, onion, garlic & salad.",
      },
      {
        name: "Chicken Crispy",
        price: "$33.95",
        desc: "Smoked quail, crispy egg, spelt, girolles, parsley.",
      },
      {
        name: "Grilled Fillet",
        price: "$26.95",
        desc: "Baguette, basil, arugula, olives, cherry-tomatoes.",
      },
      {
        name: "Roasted Steak Roulade",
        price: "$29.95",
        desc: "Mint parsley with apple cider vinegar, salt & spices.",
      },
      {
        name: "Sea Trout",
        price: "$44.95",
        desc: "Roast trout, English asparagus, watercress & royals.",
      },
    ],
  },
  {
    image: "/granny/granny_menu_simple-banner_2.jpg",
    items: [
      {
        name: "Alder Grilled Seafood Paella",
        price: "$40.95",
        desc: "Monkfish, onion, paella rice, garlic & smoked paprika.",
      },
      {
        name: "Cordon Bleu",
        price: "$19.95",
        desc: "chicken breasts, ham, pepper & Swiss cheese.",
      },
      {
        name: "Smoked Paprika Hummus",
        price: "$13.95",
        desc: "Red peppers, roasted garlic, lemon slices, olives .",
      },
      {
        name: "Beef/Pork Ribs",
        price: "$35.95",
        desc: "Beef ribs, ginger, garlic, honey, pepper & canola oil.",
      },
      {
        name: "Creamy Smoked Salmon",
        price: "$44.95",
        desc: "Smoked salmon, leek, potato soup & chives.",
      },
      {
        name: "Boerewors",
        price: "$29.95",
        desc: "Meat, vinger, plass wors spice & some thick.",
      },
    ],
  },
  {
    image: "/granny/granny_menu_simple-banner_3.jpg",
    items: [
      {
        name: "Traditional pancakes",
        price: "$8.95",
        desc: "Milk, eggs, strawberries, butter & maple syrup.",
      },
      {
        name: "American Brunch",
        price: "$14.95",
        desc: "Applewood smoked bacon, tomatoes & green onions.",
      },
      {
        name: "Cannoli with cream cheese",
        price: "$15.95",
        desc: "Smoked quail, crispy egg, spelt, girolles, parsley.",
      },
      {
        name: "Chocolate Cherry Cake",
        price: "$9.95",
        desc: "Vanilla, milk, dark chocolate, cherries, eggs, butter.",
      },
      {
        name: "Pain au chocolat",
        price: "$3.95",
        desc: "Homemade croissant contain a bar of dark chocolate.",
      },
      {
        name: "Tarte Tatin",
        price: "$5.95",
        desc: "Caramelised apple tart, vanilla ice cream.",
      },
    ],
  },
];

const tabs = ["Lunch", "Dinner", "Dessert", "Drinks"];

export function GrannyMenuPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading cursiveText="Taste life" mainText="Discover Our Menu" />

        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          Everyone has taste, even if they don&apos;t realize it. Even if
          you&apos;re not a great chef, there&apos;s nothing to stop you
          understanding the difference between what tastes good and what
          doesn&apos;t.
        </p>

        <div className="flex justify-center flex-wrap gap-x-10 gap-y-2 mb-14">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              className={`font-script text-2xl transition-colors ${
                idx === 0
                  ? "text-primary border-b border-primary pb-1"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12 mb-16">
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden mb-8">
                <Image
                  src={col.image}
                  alt={`Menu category ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-6">
                {col.items.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-raleway font-bold text-base text-foreground">
                        {item.name}
                      </h3>
                      <span className="font-raleway font-bold text-primary">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <ButtonLink
            href="/menu"
            size="lg"
            className="bg-ink text-white hover:bg-primary rounded-none px-10 py-6 text-xs tracking-widest uppercase font-bold"
          >
            Discover Full Menu
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
