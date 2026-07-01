export interface HighlightData {
  id: string;
  cursive: string;
  heading: string;
  description: string;
  price: string;
  ctaHref: string;
  ctaLabel?: string;
  imagePosition: "left" | "right";
  images: { src: string; alt: string }[];
  paddingClass: string;
}

export const highlightsContent: HighlightData[] = [
  {
    id: "butter-chicken",
    cursive: "Must try",
    heading: "Butter Chicken",
    description:
      "Our Butter Chicken is a Singapore favourite. Tender chicken tikka simmers in tomato-cream sauce with fenugreek, cardamom and house butter. Pair it with Peshawari Naan from the clay tandoor.",
    price: "S$18.00 per portion",
    ctaHref: "/checkout",
    imagePosition: "right",
    paddingClass: "pt-24 pb-0",
    images: [
      {
        src: "/granny/granny_banners_11.jpg",
        alt: "Butter chicken curry in a creamy tomato sauce",
      },
      {
        src: "/granny/granny_banners_12.jpg",
        alt: "Butter chicken served with fresh naan for dipping",
      },
    ],
  },
  {
    id: "tandoori-chicken",
    cursive: "From the clay oven",
    heading: "Tandoori Chicken",
    description:
      "Whole chicken marinates for 24 hours. Yoghurt, ginger, garlic and our signature spice blend build the flavour. It is fired in the clay tandoor until smoky and juicy.",
    price: "S$22.00 per portion",
    ctaHref: "/checkout",
    imagePosition: "left",
    paddingClass: "pt-24 pb-24",
    images: [
      {
        src: "/granny/granny_banners_6.jpg",
        alt: "Whole tandoori chicken grilled in the clay oven",
      },
      {
        src: "/granny/granny_banners_7.jpg",
        alt: "Smoky tandoori chicken with North Indian spices",
      },
    ],
  },
];
