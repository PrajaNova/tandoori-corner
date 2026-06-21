import React from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

const specials = [
  {
    name: "Tandoori Chicken",
    description:
      "Tender chicken marinated overnight in yoghurt, fresh ginger, garlic & aromatic spices, charred in the tandoor.",
    price: "S$22.00",
    image: "/granny/granny_specials_1.jpg",
  },
  {
    name: "Butter Chicken",
    description:
      "Succulent chicken in a velvety tomato-cream sauce with fenugreek, cardamom & house butter — our all-time bestseller.",
    price: "S$18.00",
    image: "/granny/granny_specials_2.jpg",
  },
  {
    name: "Lamb Seekh Kebab",
    description:
      "Minced lamb blended with green chilli, fresh coriander & warming spices, grilled on skewers in the clay oven.",
    price: "S$20.00",
    image: "/granny/granny_specials_3.jpg",
  },
  {
    name: "Palak Paneer",
    description:
      "Creamy spinach curry with house-made cottage cheese, cumin-tempered ghee & a hint of fresh cream.",
    price: "S$16.00",
    image: "/granny/granny_specials_4.jpg",
  },
  {
    name: "Peshawari Naan",
    description:
      "Tandoor-baked flatbread stuffed with coconut, almonds & sultanas — the perfect partner to any curry.",
    price: "S$6.00",
    image: "/granny/granny_specials_5.jpg",
  },
  {
    name: "Chicken Biryani",
    description:
      "Fragrant basmati rice slow-cooked with saffron-marinated chicken, caramelised onions & whole spices.",
    price: "S$18.00",
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
          cursiveText="Chef's selection"
          mainText="Our Signature Dishes"
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
                    sizes="88px"
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
