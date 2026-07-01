export interface WelcomeCard {
  subtitle: string;
  title: string;
  image: string;
  imageAlt: string;
  description: string;
  linkHref: string;
  linkLabel: string;
}

export interface WelcomeFact {
  label: string;
  value: string;
}

export interface WelcomeHighlight {
  label: string;
  value: string;
}

export const welcomeContent = {
  cursiveText: "Hello dear",
  mainText: "Welcome To Tandoori Corner",
  description:
    "Established in 2008, Tandoori Corner is a North Indian curry house on Balestier Road. Guests visit for tandoori grills, curries, biryani, TCB Bar drinks and warm service.",
  answerBlock:
    "Tandoori Corner is a North Indian restaurant and TCB Bar at Balestier Plaza in Singapore. Since 2008, the Balestier kitchen has served tandoori grills, butter chicken, biryani, naan and classic curries for lunch and dinner. Guests can dine indoors, sit on the alfresco terrace, or order online for pickup and delivery. The team also hosts private events and prepares catering for birthdays, office meals, family gatherings and larger celebrations. The menu focuses on halal ingredients, clay-oven cooking, house spice blends, vegetarian choices and generous service. Popular orders include Tandoori Chicken, Butter Chicken, Lamb Seekh Kebab, Palak Paneer, Peshawari Naan and Chicken Biryani. For quick planning, guests can view the menu online, reserve a table, call or WhatsApp the restaurant, book TCB Bar for a private event, or choose a catering package by group size.",
  highlights: [
    {
      label: "Dine in",
      value: "Lunch, dinner, alfresco seating and TCB Bar drinks.",
    },
    {
      label: "Order online",
      value: "Pickup and delivery for curries, grills, biryani and breads.",
    },
    {
      label: "Events",
      value: "Private gatherings at TCB Bar with food and drinks.",
    },
    {
      label: "Catering",
      value: "North Indian party menus for homes, offices and celebrations.",
    },
  ] satisfies WelcomeHighlight[],
  facts: [
    {
      label: "Cuisine",
      value: "North Indian tandoori grills, curries and biryani",
    },
    {
      label: "Location",
      value: "Balestier Plaza, Singapore 329802",
    },
    {
      label: "Services",
      value: "Dine-in, delivery, catering and private events",
    },
  ] satisfies WelcomeFact[],
  cards: [
    {
      subtitle: "Spices from the heart",
      title: "Authentic Indian Recipes",
      image: "/granny/granny_banners_1.jpg",
      imageAlt: "North Indian curry and tandoori dishes at Tandoori Corner",
      description:
        "Every dish follows traditional North Indian recipes. The flavours are bold, aromatic and built around balanced spice.",
      linkHref: "/story",
      linkLabel: "Read More",
    },
    {
      subtitle: "Quality is everything",
      title: "Fresh Ingredients Daily",
      image: "/granny/granny_banners_2.jpg",
      imageAlt: "Fresh halal ingredients prepared for North Indian cooking",
      description:
        "We source halal meats and fresh vegetables daily. Our spice blends are prepared in-house for consistent flavour.",
      linkHref: "/story",
      linkLabel: "Read More",
    },
    {
      subtitle: "Masters of the tandoor",
      title: "Expert Chefs, Since 2008",
      image: "/granny/granny_banners_3.jpg",
      imageAlt: "Tandoori Corner chef preparing food in the kitchen",
      description:
        "Led by Chef Ramesh, the kitchen brings decades of North Indian cooking experience to each plate.",
      linkHref: "/story",
      linkLabel: "Read More",
    },
  ],
};
