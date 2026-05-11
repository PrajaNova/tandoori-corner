import {
  ChefHat,
  ChevronDown,
  ChevronUp,
  Flame,
  Leaf,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import type { CartItem } from "../App";

export function Menu({
  navigate,
  cart,
  addToCart,
  updateQty,
}: {
  navigate: (page: string) => void;
  cart: CartItem[];
  addToCart: (name: string, priceStr: string) => void;
  updateQty: (name: string, delta: number) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartExpanded, setIsCartExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    name: string;
    desc: string;
    price: string;
    tags: string[];
    img?: string;
    ingredients?: string[];
    story?: string;
  } | null>(null);

  const menuCategories = [
    {
      title: "Chef's Signatures",
      subtitle: "The Master's Touch",
      icon: <ChefHat className="w-5 h-5 text-brand-gold" />,
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
      icon: <Flame className="w-5 h-5 text-brand-gold" />,
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
          img: "https://images.unsplash.com/photo-1544025162-811c7daada68?auto=format&fit=crop&q=80",
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
      icon: <Leaf className="w-5 h-5 text-brand-gold" />,
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
      icon: <Sparkles className="w-5 h-5 text-brand-gold" />,
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

  const filteredCategories = menuCategories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  return (
    <div className="pt-24 pb-32 sm:pt-28 sm:pb-40 bg-brand-dark min-h-screen relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Menu Header */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-brand-gold font-sans tracking-[0.22em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-3 sm:mb-4 block font-bold">
            DIGITAL MENU
          </span>
          <h1 className="font-space text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
            An Elevated <br /> Culinary Journey.
          </h1>
          <p className="text-sm sm:text-lg text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
            From the sizzling heat of our 15-year-old Tandoor to the velvety
            depths of our 24-hour slow-cooked curries. All dishes are prepared
            with authentic North Indian heritage.
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-8">
            <span
              onClick={() => setSearchQuery("Vegetarian")}
              className="border border-white/10 px-3 sm:px-4 py-2 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-white/80 hover:bg-white/5 cursor-pointer"
            >
              Vegetarian Friendly
            </span>
            <span
              onClick={() => setSearchQuery("Vegan")}
              className="border border-white/10 px-3 sm:px-4 py-2 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-white/80 hover:bg-white/5 cursor-pointer"
            >
              Vegan Options
            </span>
            <span
              onClick={() => setSearchQuery("Signature")}
              className="border border-white/10 px-3 sm:px-4 py-2 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] hover:bg-white/5 cursor-pointer"
            >
              Signatures
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12 sm:mb-20 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-white/40 group-focus-within:text-brand-gold transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-3.5 sm:py-4 bg-brand-dark border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-gold transition-colors"
            placeholder="Search our menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="space-y-12 sm:space-y-20 md:space-y-24">
          {filteredCategories.length === 0 ? (
            <div className="text-center text-white/50 py-20 border border-white/5">
              <p className="text-lg mb-2">
                No items found matching "{searchQuery}"
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-brand-gold text-xs uppercase tracking-widest font-bold hover:text-white transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            filteredCategories.map((category, catIdx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                key={catIdx}
                className="relative"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-10 border-b border-white/10 pb-3 sm:pb-4">
                  <div className="[&_svg]:w-5 [&_svg]:h-5 sm:[&_svg]:w-6 sm:[&_svg]:h-6">
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="font-space text-2xl sm:text-3xl text-white">
                      {category.title}
                    </h2>
                    <p className="text-brand-gold/80 text-[10px] sm:text-xs uppercase tracking-widest font-medium mt-1">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-8 lg:gap-12">
                  {category.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      onClick={() => setSelectedItem(item)}
                      className="flex flex-col group border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors p-0 cursor-pointer overflow-hidden rounded-sm"
                    >
                      {/* Visual Eye Magnet Technique for Signatures */}
                      {item.img && (
                        <div className="w-full h-24 sm:h-56 overflow-hidden relative">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-80"></div>
                          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-1 sm:gap-3">
                            <h3 className="font-space text-sm sm:text-2xl text-white drop-shadow-md leading-tight line-clamp-2">
                              {item.name}
                            </h3>
                            <span className="self-start sm:self-auto font-sans text-brand-gold font-bold text-xs sm:text-lg shrink-0 drop-shadow-md bg-brand-dark/50 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                              {item.price}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex-1 flex flex-col p-3 sm:p-6 sm:pt-4">
                        <p className="text-white/50 text-[11px] sm:text-sm leading-relaxed mb-3 sm:mb-6 font-light flex-1 line-clamp-2 sm:line-clamp-3">
                          {item.desc}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mt-auto pt-2.5 sm:pt-4 border-t border-white/5 relative z-10">
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {item.tags.slice(0, 1).map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className={`text-[7px] sm:text-[9px] uppercase tracking-widest px-1.5 sm:px-2 py-1 border ${
                                  tag === "Vegetarian" || tag === "Vegan"
                                    ? "border-emerald-500/30 text-emerald-400"
                                    : tag === "Signature"
                                      ? "border-brand-gold/30 text-brand-gold"
                                      : tag === "Spicy"
                                        ? "border-red-500/30 text-red-400"
                                        : "border-white/10 text-white/40"
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(item.name, item.price);
                            }}
                            className="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold bg-white/5 hover:bg-brand-gold hover:text-brand-dark px-2 sm:px-4 py-2 transition-all shrink-0"
                          >
                            Add
                            <span className="hidden sm:inline"> to Order</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Sticky CTAs / Bottom Ordering */}
        <div className="mt-32 w-full bg-brand-surface p-10 border border-white/5 text-center">
          <h3 className="font-space text-2xl text-white mb-4">
            Ready to taste the heritage?
          </h3>
          <p className="text-white/50 text-sm mb-8 font-light">
            Order directly for island-wide home delivery or reserve a table.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => {
                if (cart.length > 0) setIsCartExpanded(true);
              }}
              className="bg-brand-gold text-brand-dark px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-brand-gold-muted transition-colors"
            >
              Order Delivery
            </button>
            <button
              type="button"
              onClick={() => navigate("experience")}
              className="bg-transparent border border-white/20 text-white px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-brand-dark transition-colors"
            >
              Reserve Table
            </button>
          </div>
        </div>
      </div>

      {/* Item Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-brand-dark/95 backdrop-blur-md"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-brand-dark border border-white/10 shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 text-white hover:text-brand-gold bg-brand-dark/50 backdrop-blur-md rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {selectedItem.img && (
                <div className="md:w-1/2 h-64 md:h-auto shrink-0 relative">
                  <img
                    src={selectedItem.img}
                    alt={selectedItem.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-dark to-transparent opacity-60"></div>
                </div>
              )}

              <div className="flex-1 p-8 md:p-12 overflow-y-auto w-full flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedItem.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`text-[9px] uppercase tracking-widest px-2 py-1 border font-bold ${
                        tag === "Vegetarian" || tag === "Vegan"
                          ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10"
                          : tag === "Signature"
                            ? "border-brand-gold/50 text-brand-gold bg-brand-gold/10"
                            : tag === "Spicy"
                              ? "border-red-500/50 text-red-400 bg-red-500/10"
                              : "border-white/20 text-white/60 bg-white/5"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-space text-3xl font-bold mb-2 text-white leading-tight">
                  {selectedItem.name}
                </h3>
                <p className="text-brand-gold font-bold text-2xl mb-6">
                  {selectedItem.price}
                </p>

                <p className="text-white/80 leading-relaxed mb-8 font-light text-base border-l-2 border-brand-gold/50 pl-4 py-1">
                  "{selectedItem.desc}"
                </p>

                <div className="space-y-8 flex-1">
                  {selectedItem.ingredients &&
                    selectedItem.ingredients.length > 0 && (
                      <div>
                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-3 border-b border-white/10 pb-2">
                          Key Ingredients
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.ingredients.map((ing, i) => (
                            <span
                              key={i}
                              className="text-sm text-white/70 bg-white/5 px-3 py-1.5 rounded-sm"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {selectedItem.story && (
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-3 border-b border-white/10 pb-2">
                        The Chef's Thought
                      </h4>
                      <p className="text-sm text-white/60 leading-relaxed font-light italic">
                        {selectedItem.story}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-10 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(selectedItem.name, selectedItem.price);
                      setSelectedItem(null);
                    }}
                    className="w-full bg-brand-gold text-brand-dark px-6 py-4 flex items-center justify-center gap-3 text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors"
                  >
                    Add to Order <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Cart Bar */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 inset-x-0 z-50 bg-brand-dark/95 backdrop-blur-xl border-t border-brand-gold/30 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
          >
            {isCartExpanded && (
              <div className="container mx-auto px-6 py-6 border-b border-white/10 max-h-[60vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-space text-2xl text-white">Your Order</h3>
                  <button
                    type="button"
                    onClick={() => setIsCartExpanded(false)}
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <h4 className="text-white text-sm font-medium">
                          {item.name}
                        </h4>
                        <span className="text-white/50 text-[10px] uppercase tracking-widest">
                          ${item.price.toFixed(2)} each
                        </span>
                      </div>
                      <div className="flex items-center gap-4 bg-white/5 rounded-full px-3 py-1">
                        <button
                          type="button"
                          onClick={() => updateQty(item.name, -1)}
                          className="text-white hover:text-brand-gold transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white font-mono text-sm w-4 text-center">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.name, 1)}
                          className="text-white hover:text-brand-gold transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="w-20 text-right text-brand-gold font-medium">
                        ${(item.price * item.qty).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                  <span className="text-white/50 uppercase tracking-widest text-xs font-bold">
                    Subtotal
                  </span>
                  <span className="text-brand-gold font-space text-2xl font-bold">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <div
              className="container mx-auto px-6 h-20 md:h-24 flex items-center justify-between cursor-pointer"
              onClick={() => setIsCartExpanded(!isCartExpanded)}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-brand-gold" />
                  <span className="absolute -top-2 -right-2 bg-white text-brand-dark w-5 h-5 rounded-full text-[10px] sm:text-xs font-bold flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.qty, 0)}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <span className="block text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1">
                    Total Order
                  </span>
                  <span className="block text-xl font-space font-bold text-white leading-none">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-white/50 hover:text-white transition-colors hidden sm:block">
                  {isCartExpanded ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronUp className="w-5 h-5" />
                  )}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("checkout");
                  }}
                  className="bg-brand-gold text-brand-dark px-8 py-3 sm:px-10 sm:py-4 text-[10px] sm:text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
