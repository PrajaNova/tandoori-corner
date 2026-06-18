import React from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

const specials = [
  {
    name: "Grilled Fillet",
    description:
      "Pork fillet, ginger, garlic, honey, pepper & canola oil, Pork fillet, ginger.",
    price: "$26.95",
    image: "/granny/granny_specials_1.jpg",
  },
  {
    name: "Alder Grilled Seafood Paella",
    description:
      "Monkfish, onion, paella rice,smoked paprika, Monkfish, onion, paella rice, garlic.",
    price: "$40.95",
    image: "/granny/granny_specials_2.jpg",
  },
  {
    name: "Chicken Breast",
    description: "Paupiette of chicken, blue cheese, rosemary & beans.",
    price: "$26.95",
    image: "/granny/granny_specials_3.jpg",
  },
  {
    name: "Sea Trout",
    description:
      "Roast trout, English asparagus, watercress & watercress & royals.",
    price: "$44.95",
    image: "/granny/granny_specials_4.jpg",
  },
  {
    name: "Smoked Paprika Hummus",
    description:
      "Red peppers, roasted garlic, lemon slices, olives & mint.Red peppers.",
    price: "$13.95",
    image: "/granny/granny_specials_5.jpg",
  },
  {
    name: "Roasted Steak Roulade",
    description:
      "Mint parsley with apple cider vinegar, salt & spices, parsley with apple cider.",
    price: "$29.95",
    image: "/granny/granny_specials_6.jpg",
  },
];

export function GrannySpecials() {
  return (
    <section className="relative py-24">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/granny/granny_background_8.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/70" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          cursiveText="What's for lunch?"
          mainText="Check Our Daily Specials"
          dark
        />

        <div className="bg-white p-8 md:p-14 max-w-5xl mx-auto shadow-2xl mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {specials.map((item) => (
              <div key={item.name} className="flex items-start space-x-5">
                <div className="relative w-[88px] h-[88px] shrink-0 overflow-hidden rounded">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-raleway font-bold text-base text-foreground">
                      {item.name}
                    </h3>
                    <span className="font-raleway font-bold text-primary">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
