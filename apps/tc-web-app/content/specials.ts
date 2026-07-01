export interface SpecialItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

export const specialsContent = {
  cursiveText: "Chef's selection",
  mainText: "Our Signature Dishes",
  backgroundImage: "/granny/granny_background_8.webp",
  items: [
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
  ],
};
