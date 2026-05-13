import type { MenuCategory } from "@/data/types";

export const menuCategories: MenuCategory[] = [
  {
    title: "Chef's Signatures",
    subtitle: "The Master's Touch",
    icon: "chefHat",
    items: [
      {
        name: "The Tandoori Mixed Seafood Platter",
        desc: "Our most lavish offering. Jumbo prawns, tender chunks of fish, and calamari marinated for 24 hours in handcrafted spice blends. Fired inside a traditional clay oven to smoky perfection.",
        price: "$48.00",
        tags: ["Signature", "Sharing"],
        img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80",
        ingredients: [
          "Tiger Prawns",
          "Kingfish",
          "Calamari",
          "Kashmiri Chili",
          "Yogurt",
          "Ajwain (Carom Seeds)",
        ],
        story:
          "Inspired by the coastal bounties of India, this platter represents our Chef's dedication to mastering the delicate art of tandoor-cooking seafood without losing its natural sweetness.",
      },
      {
        name: "Reshmi Tandoori Chicken",
        desc: "Fall-apart tender chicken on the bone. The 24-hour yogurt and kashmiri chili marinade produces a vibrant color and a deep, velvety crust.",
        price: "$28.00",
        tags: ["Signature"],
        img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80",
        ingredients: [
          "Free-range Chicken",
          "Hung Curd",
          "Deggi Mirch",
          "Garam Masala",
          "Mustard Oil",
        ],
        story:
          "A recipe passed down through three generations. The secret lies in double-marination, ensuring the spices penetrate right to the bone.",
      },
    ],
  },
  {
    title: "The Curry Corner",
    subtitle: "Silken & Robust Gravies",
    icon: "flame",
    items: [
      {
        name: "OG Butter Chicken",
        desc: "Tandoor-charred chicken pieces submerged in a rich, 4-hour slow-cooked tomato gravy. Finished with cold butter and a swirl of cream. Mild and velvety.",
        price: "$22.00",
        tags: ["Bestseller"],
        img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80",
        ingredients: [
          "Chicken Tikka",
          "San Marzano Tomatoes",
          "White Butter",
          "Fenugreek Leaves",
          "Cashew Paste",
        ],
        story:
          "Our tribute to the original 1950s Delhi recipe. We never add sugar; the sweetness comes purely from slow-roasted tomatoes.",
      },
      {
        name: "Saag Mutton",
        desc: "Tender chunks of mutton in a deep-green spinach gravy. Ginger and garlic hit the palate before the gentle heat. The dish Chef learned from his mother.",
        price: "$24.00",
        tags: ["Heritage"],
        img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80",
        ingredients: [
          "New Zealand Mutton",
          "Fresh Pureed Spinach",
          "Garlic",
          "Ginger",
          "Green Chili",
        ],
        story:
          "A winter staple in Punjab, elevated for our dining room. The spinach is blanched for exactly 60 seconds to retain its vibrant emerald hue.",
      },
      {
        name: "Rogan Josh",
        desc: "A fiery, aromatic Kashmiri lamb curry. Slow-cooked until the meat yields to a spoon, swimming in a vibrant red gravy.",
        price: "$25.00",
        tags: ["Spicy"],
        img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80",
        ingredients: [
          "Lamb Braise",
          "Kashmiri Red Chilies",
          "Fennel Powder",
          "Dry Ginger",
          "Yogurt",
        ],
        story:
          "Authentic Kashmiri Rogan Josh never uses tomatoes or onions. We stay true to this ancient method, relying on fennel and ginger for body.",
      },
    ],
  },
  {
    title: "The Sabzi Corner",
    subtitle: "From The Fields",
    icon: "leaf",
    items: [
      {
        name: "Palak Paneer",
        desc: "Soft cottage cheese cubes enveloped in a vibrant, spiced spinach puree. A North Indian classic.",
        price: "$18.00",
        tags: ["Vegetarian"],
        img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80",
        ingredients: [
          "Homemade Paneer",
          "Fresh Spinach",
          "Fenugreek",
          "Garlic",
          "Heavy Cream",
        ],
        story:
          "We make our cottage cheese fresh every morning, ensuring it literally melts in your mouth against the robust spinach.",
      },
      {
        name: "Aloo Gobi",
        desc: "Cauliflower and potatoes wok-tossed with turmeric, cumin, and fresh coriander. Homestyle and comforting.",
        price: "$15.00",
        tags: ["Vegan", "Vegetarian"],
        img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80",
        ingredients: [
          "Cauliflower Florets",
          "Potatoes",
          "Cumin Seeds",
          "Turmeric",
          "Fresh Coriander",
        ],
        story:
          "A dry curry that relies entirely on the precise timing of spices hitting the hot oil to release their essential oils.",
      },
      {
        name: "Dal Makhani",
        desc: "Black lentils slow-cooked overnight with tomatoes, butter, and cream. The ultimate comfort food.",
        price: "$16.00",
        tags: ["Vegetarian", "Signature"],
        img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80",
        ingredients: [
          "Whole Black Lentils",
          "Kidney Beans",
          "Butter",
          "Tomato Puree",
          "Cream",
        ],
        story:
          "Cooked for a minimum of 18 hours on the residual heat of the cooling tandoor oven, developing a matchless smoky depth.",
      },
    ],
  },
  {
    title: "Breads & Rice",
    subtitle: "The Perfect Pairings",
    icon: "sparkles",
    items: [
      {
        name: "Garlic Naan",
        desc: "Crispy edges, fluffy center. Slathered with aromatic garlic butter straight from the Tandoor.",
        price: "$6.00",
        tags: ["Vegetarian"],
        img: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80",
        ingredients: [
          "Refined Flour",
          "Yogurt",
          "Garlic",
          "Butter",
          "Fresh Coriander",
        ],
        story:
          "Slapped against the 400-degree walls of our clay oven and baked in under two minutes for the perfect char.",
      },
      {
        name: "Mutton Biryani",
        desc: "Slow-steamed, fall-apart tender mutton buried in a mountain of saffron-scented, long-grain basmati. Perfectly charred, zero fluff.",
        price: "$24.00",
        tags: [],
        img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80",
        ingredients: [
          "Basmati Rice",
          "Marinated Mutton",
          "Saffron",
          "Rose Water",
          "Fried Onions",
          "Whole Spices",
        ],
        story:
          "Prepared in the traditional 'Dum' style, sealed with dough to lock in the steam and aromas of 15 different whole spices.",
      },
      {
        name: "Saffron Basmati Pulao",
        desc: "Fragrant, long-grain basmati rice cooked with whole spices and saffron threads.",
        price: "$9.00",
        tags: ["Vegetarian"],
        img: "https://images.unsplash.com/photo-1512132411229-c30391241dd8?auto=format&fit=crop&q=80",
        ingredients: [
          "Aged Basmati",
          "Kashmiri Saffron",
          "Cardamom",
          "Cloves",
          "Ghee",
        ],
        story:
          "We only use rice that has been aged for at least two years to ensure every grain remains distinct and fluffy.",
      },
    ],
  },
];
