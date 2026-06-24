export interface WelcomeCard {
  subtitle: string;
  title: string;
  image: string;
  description: string;
  linkHref: string;
  linkLabel: string;
}

export const welcomeContent = {
  cursiveText: "Hello dear",
  mainText: "Welcome To Tandoori Corner",
  description:
    "Established in 2008, Tandoori Corner is Singapore's favourite North Indian curry house, nestled along the heritage trail of Balestier Road. We combine the warmth of alfresco dining with bold, authentic flavours that keep our guests coming back for more.",
  cards: [
    {
      subtitle: "Spices from the heart",
      title: "Authentic Indian Recipes",
      image: "/granny/granny_banners_1.jpg",
      description:
        "Every dish at Tandoori Corner is crafted using traditional North Indian recipes handed down through generations — rich in spice, aroma, and soul.",
      linkHref: "/story",
      linkLabel: "Read More",
    },
    {
      subtitle: "Quality is everything",
      title: "Fresh Ingredients Daily",
      image: "/granny/granny_banners_2.jpg",
      description:
        "We source the finest halal meats and freshest vegetables daily. Our spice blends are prepared in-house to ensure every meal bursts with authentic flavour.",
      linkHref: "/story",
      linkLabel: "Read More",
    },
    {
      subtitle: "Masters of the tandoor",
      title: "Expert Chefs, Since 2008",
      image: "/granny/granny_banners_3.jpg",
      description:
        "Led by Chef Ramesh, who trained in five-star hotels across India, our culinary team brings decades of expertise to every plate we serve.",
      linkHref: "/story",
      linkLabel: "Read More",
    },
  ],
};
