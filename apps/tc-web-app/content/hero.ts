import type { Slide } from "@/components/home/hero/types";

export const slides: Slide[] = [
  {
    image: "/granny/granny_sliders_slide-bg_3.jpg",
    cursive: "Since 2008",
    heading: "Authentic North Indian Cuisine",
    desc: "Tandoori Corner is a beloved North Indian curry house on Balestier Road, Singapore. Experience tandoor-fired perfection and time-honoured recipes from our master chefs.",
    actions: [
      { label: "View Menu", href: "/menu", variant: "solid" },
      { label: "Reserve Now", href: "/#reservation", variant: "outline" },
    ],
  },
  {
    image: "/granny/granny_sliders_slide-bg_4.jpg",
    cursive: "Expert Chefs",
    heading: "Tandoor-Fired Perfection",
    actions: [
      { label: "Reserve Now", href: "/#reservation", variant: "solid" },
    ],
  },
  {
    image: "/granny/granny_sliders_slide-bg_7.jpg",
    cursive: "Balestier Road, Singapore",
    heading: "Discover Our Flavours",
    desc: "From succulent Tandoori Chicken to rich Butter Chicken and freshly baked Peshawari Naan — every dish tells a story of passion and authentic spice.",
    actions: [{ label: "Explore Menu", href: "/menu", variant: "solid" }],
  },
];
