"use client";

import { Flame, Leaf, Minus, Plus, Search } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { useCart } from "@/component/cart-provider";

const menuItemsData = [
  {
    name: "Vegetable Samosa",
    category: "Starters",
    desc: "Crispy pastry filled with spiced potatoes and peas.",
    price: 8.0,
    veg: true,
  },
  {
    name: "Onion Bhaji",
    category: "Starters",
    desc: "Sliced onion fritters in a seasoned chickpea batter.",
    price: 9.5,
    veg: true,
  },
  {
    name: "Chicken Tikka Chaat",
    category: "Starters",
    desc: "Tangy tossed salad with chunks of roasted chicken.",
    price: 14.0,
    spicy: true,
  },
  {
    name: "Paneer Pakora",
    category: "Starters",
    desc: "Cottage cheese coated in gram flour batter and fried.",
    price: 12.5,
    veg: true,
  },
  {
    name: "Tandoori Chicken",
    category: "Tandoori Specialties",
    desc: "Bone-in chicken marinated in yogurt and traditional spices.",
    price: 22.0,
  },
  {
    name: "Seekh Kebab",
    category: "Tandoori Specialties",
    desc: "Minced lamb skewers flavored with garlic, ginger, and coriander.",
    price: 24.0,
    spicy: true,
  },
  {
    name: "Fish Tikka",
    category: "Tandoori Specialties",
    desc: "Fresh fish chunks marinated in ajwain, yogurt, and mustard oil.",
    price: 26.0,
  },
  {
    name: "Paneer Tikka",
    category: "Tandoori Specialties",
    desc: "Cubes of cottage cheese marinated with capsicum and onions.",
    price: 18.5,
    veg: true,
  },
  {
    name: "Butter Chicken",
    category: "Curries",
    desc: "Tender roasted chicken simmered in creamy tomato gravy.",
    price: 24.0,
  },
  {
    name: "Lamb Rogan Josh",
    category: "Curries",
    desc: "Classic Kashmiri dish cooked with aromatic spices and saffron.",
    price: 26.5,
    spicy: true,
  },
  {
    name: "Palak Paneer",
    category: "Curries",
    desc: "Fresh spinach puree cooked with cottage cheese and cream.",
    price: 19.0,
    veg: true,
  },
  {
    name: "Dal Makhani",
    category: "Curries",
    desc: "Black lentils slow-cooked with tomatoes, butter, and cream.",
    price: 16.5,
    veg: true,
  },
  {
    name: "Garlic Naan",
    category: "Breads & Rice",
    desc: "Leavened flatbread topped with minced garlic and butter.",
    price: 5.5,
    veg: true,
  },
  {
    name: "Cheese Naan",
    category: "Breads & Rice",
    desc: "Stuffed with melted cheddar and mozzarella.",
    price: 7.0,
    veg: true,
  },
  {
    name: "Saffron Basmati Rice",
    category: "Breads & Rice",
    desc: "Fragrant long-grain rice infused with saffron.",
    price: 8.5,
    veg: true,
  },
  {
    name: "Chicken Biryani",
    category: "Breads & Rice",
    desc: "Aromatic basmati rice layered with spiced chicken and mint.",
    price: 22.0,
  },
];

export function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart, cartItems, updateQuantity } = useCart();

  const categories = [
    "All",
    "Starters",
    "Tandoori Specialties",
    "Curries",
    "Breads & Rice",
  ];

  const filteredItems = useMemo(
    () =>
      menuItemsData.filter((item) => {
        const lowerSearch = searchQuery.toLowerCase();
        const matchesSearch =
          item.name.toLowerCase().includes(lowerSearch) ||
          item.desc.toLowerCase().includes(lowerSearch);
        const matchesCategory =
          activeCategory === "All" || item.category === activeCategory;

        return matchesSearch && matchesCategory;
      }),
    [searchQuery, activeCategory],
  );

  return (
    <div className="min-h-screen bg-cream px-4 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-4 block font-semibold text-brand text-sm uppercase tracking-[0.2em]">
            Order Online
          </span>
          <h1 className="font-serif text-4xl text-ink md:text-5xl">
            Our Full Menu
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink/60">
            Explore our North Indian dishes and add them to your cart for pickup
            or delivery.
          </p>
        </div>

        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            {categories.map((category) => (
              <button
                className={`rounded-full px-5 py-2.5 font-medium text-sm transition-all ${
                  activeCategory === category
                    ? "bg-brand text-white shadow-md"
                    : "border border-ink/10 bg-white text-ink/70 hover:border-brand/50 hover:text-brand"
                }`}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              className="w-full rounded-full border border-ink/10 bg-white py-2.5 pr-4 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search dishes..."
              type="text"
              value={searchQuery}
            />
            <Search
              className="-translate-y-1/2 absolute top-1/2 left-4 text-ink/40"
              size={18}
            />
          </div>
        </div>

        <motion.div
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2"
          initial={{ opacity: 0 }}
        >
          {filteredItems.map((item) => {
            const cartItem = cartItems.find((entry) => entry.id === item.name);
            const quantityInCart = cartItem ? cartItem.quantity : 0;

            return (
              <div
                className="flex flex-col justify-between rounded-card border border-ink/5 bg-white p-6 transition-shadow hover:shadow-card"
                key={item.name}
              >
                <div>
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="flex items-center gap-2 font-serif text-ink text-xl">
                      {item.name}
                      {"veg" in item && item.veg ? (
                        <span title="Vegetarian">
                          <Leaf className="text-leaf" size={16} />
                        </span>
                      ) : null}
                      {"spicy" in item && item.spicy ? (
                        <span title="Spicy">
                          <Flame className="text-red-500" size={16} />
                        </span>
                      ) : null}
                    </h3>
                    <span className="font-medium text-brand text-lg">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="mb-6 text-ink/60 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center justify-end">
                  {quantityInCart === 0 ? (
                    <button
                      className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-semibold text-ink text-sm transition-colors hover:bg-brand hover:text-white"
                      onClick={() =>
                        addToCart({ name: item.name, price: item.price }, 1)
                      }
                      type="button"
                    >
                      <Plus size={16} /> Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center gap-4 rounded-full bg-ink px-2 py-1 text-white">
                      <button
                        className="rounded-full p-1 transition-colors hover:bg-white/20"
                        onClick={() =>
                          updateQuantity(item.name, quantityInCart - 1)
                        }
                        type="button"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-4 text-center font-medium">
                        {quantityInCart}
                      </span>
                      <button
                        className="rounded-full p-1 transition-colors hover:bg-white/20"
                        onClick={() =>
                          updateQuantity(item.name, quantityInCart + 1)
                        }
                        type="button"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>

        {filteredItems.length === 0 ? (
          <div className="py-20 text-center text-ink/50">
            No dishes found matching your criteria.
          </div>
        ) : null}
      </div>
    </div>
  );
}
