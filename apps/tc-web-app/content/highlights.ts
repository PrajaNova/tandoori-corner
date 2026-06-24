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
      "Our legendary Butter Chicken is a Singapore favourite. Tender chicken tikka simmered in a velvety tomato-cream sauce infused with fenugreek, cardamom and our house butter. Rich, indulgent and utterly satisfying — best paired with a Peshawari Naan fresh from our clay tandoor oven.",
    price: "S$18.00 per portion",
    ctaHref: "/checkout",
    imagePosition: "right",
    paddingClass: "pt-24 pb-0",
    images: [
      {
        src: "/granny/granny_banners_11.jpg",
        alt: "Butter Chicken",
      },
      {
        src: "/granny/granny_banners_12.jpg",
        alt: "Butter Chicken served with naan",
      },
    ],
  },
  {
    id: "tandoori-chicken",
    cursive: "From the clay oven",
    heading: "Tandoori Chicken",
    description:
      "Whole chicken marinated for 24 hours in yoghurt, fresh ginger, garlic and our signature spice blend, then fired at high heat in our traditional clay tandoor. Gloriously smoky, juicy and deeply flavoured — a dish that has defined Tandoori Corner since day one.",
    price: "S$22.00 per portion",
    ctaHref: "/checkout",
    imagePosition: "left",
    paddingClass: "pt-24 pb-24",
    images: [
      {
        src: "/granny/granny_banners_6.jpg",
        alt: "Tandoori Chicken",
      },
      {
        src: "/granny/granny_banners_7.jpg",
        alt: "Tandoori Chicken from the clay oven",
      },
    ],
  },
];
