"use client";

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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCart } from "@/components/cart/use-cart";

export function MenuClient() {
  const router = useRouter();
  const { addToCart, cart, updateQty } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryTitle, setActiveCategoryTitle] =
    useState("Chef's Signatures");
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

  const activeCategory =
    menuCategories.find((category) => category.title === activeCategoryTitle) ??
    menuCategories[0];
  const filteredItems = activeCategory.items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const getItemQty = (name: string) =>
    cart.find((cartItem) => cartItem.name === name)?.qty ?? 0;

  return (
    <div className="pt-20 pb-32 sm:pt-24 sm:pb-40 bg-cream min-h-screen relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-8 text-center">
          <p className="mb-1 font-script text-3xl leading-none text-brand-gold sm:text-4xl">
            Taste life
          </p>
          <h1 className="font-space text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
            Discover Our Menu
          </h1>
          <div
            aria-hidden="true"
            className="my-4 flex items-center justify-center gap-2 text-brand-gold"
          >
            <span className="h-px w-7 bg-current" />
            <span className="font-script text-3xl leading-none">TC</span>
            <span className="h-px w-7 bg-current" />
          </div>
          <p className="mx-auto max-w-2xl text-sm font-light leading-7 text-ink/60 sm:text-base">
            Explore smoky tandoor plates, slow-cooked curries, vegetarian
            favourites, breads, and rice from our North Indian kitchen.
          </p>

          <div className="mt-8 flex flex-col gap-4 text-left lg:flex-row lg:items-end lg:justify-between">
            <div className="w-full lg:max-w-sm">
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Search className="h-4 w-4 text-ink/35 transition-colors group-focus-within:text-brand-gold" />
                </div>
                <input
                  type="text"
                  className="block h-10 w-full border border-border bg-cream pl-10 pr-9 text-sm text-ink placeholder-muted-foreground/45 transition-colors focus:border-brand-gold focus:outline-none"
                  placeholder="Search our menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-ink/40 transition-colors hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:justify-end">
              {menuCategories.map((category) => {
                const isActive = category.title === activeCategoryTitle;

                return (
                  <button
                    key={category.title}
                    type="button"
                    onClick={() => {
                      setActiveCategoryTitle(category.title);
                      setSearchQuery("");
                    }}
                    className={`border-b-2 px-0.5 pb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors sm:text-xs ${
                      isActive
                        ? "border-brand-gold text-brand-gold"
                        : "border-transparent text-ink/70 hover:text-brand-gold"
                    }`}
                  >
                    {category.title.replace("The ", "").replace(" Corner", "")}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Category */}
        <div>
          {filteredItems.length === 0 ? (
            <div className="text-center text-ink/50 py-20 border border-border">
              <p className="text-lg mb-2">
                No items found matching "{searchQuery}"
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-brand-gold text-xs uppercase tracking-widest font-bold hover:text-ink transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              key={activeCategory.title}
              className="relative"
            >
              <div className="mb-5 flex items-center gap-3 border-b border-border pb-4 sm:mb-6">
                <div className="[&_svg]:h-5 [&_svg]:w-5 sm:[&_svg]:h-6 sm:[&_svg]:w-6">
                  {activeCategory.icon}
                </div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-left">
                  <h2 className="font-space text-2xl text-ink sm:text-3xl">
                    {activeCategory.title}
                  </h2>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-brand-gold/80 sm:text-xs">
                    {activeCategory.subtitle}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredItems.map((item, itemIdx) => (
                  <article
                    key={itemIdx}
                    onClick={() => setSelectedItem(item)}
                    className="group flex min-h-32 cursor-pointer overflow-hidden border border-border bg-card transition-colors hover:border-primary"
                  >
                    {item.img && (
                      <div className="relative w-28 shrink-0 overflow-hidden sm:w-32">
                        <Image
                          fill
                          src={item.img}
                          alt={item.name}
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 112px, 128px"
                        />
                      </div>
                    )}

                    <div className="flex min-w-0 flex-1 flex-col p-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="line-clamp-2 font-sans text-sm font-semibold leading-snug text-ink sm:text-base">
                          {item.name}
                        </h3>
                        <span className="shrink-0 text-xs font-bold text-brand-gold">
                          {item.price}
                        </span>
                      </div>

                      <p className="mt-2 line-clamp-2 text-xs font-light leading-relaxed text-ink/55">
                        {(item.ingredients?.slice(0, 5) ?? item.tags).join(
                          ", ",
                        )}
                      </p>

                      <div className="relative z-10 mt-auto flex items-center justify-end pt-3">
                        {getItemQty(item.name) > 0 ? (
                          <div className="flex shrink-0 items-center gap-2 rounded-full bg-accent px-2 py-1">
                            <button
                              type="button"
                              aria-label={`Remove one ${item.name}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQty(item.name, -1);
                              }}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-ink transition-colors hover:bg-card hover:text-brand-gold"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-5 text-center text-sm font-bold text-ink">
                              {getItemQty(item.name)}
                            </span>
                            <button
                              type="button"
                              aria-label={`Add one ${item.name}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQty(item.name, 1);
                              }}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-ink transition-colors hover:bg-card hover:text-brand-gold"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            aria-label={`Add ${item.name} to order`}
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(item.name, item.price);
                            }}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-dark transition-colors hover:bg-ink hover:text-cream"
                          >
                            <ShoppingBag className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Sticky CTAs / Bottom Ordering */}
        <div className="mt-32 w-full bg-brand-surface p-10 border border-border text-center">
          <h3 className="font-space text-2xl text-ink mb-4">
            Ready to taste the heritage?
          </h3>
          <p className="text-ink/50 text-sm mb-8 font-light">
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
              onClick={() => router.push("/experience")}
              className="bg-transparent border border-border text-ink px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-cream hover:text-brand-dark transition-colors"
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
              className="absolute inset-0 bg-cream/95 backdrop-blur-md"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-cream border border-border shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 text-ink hover:text-brand-gold bg-cream/70 backdrop-blur-md rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {selectedItem.img && (
                <div className="md:w-1/2 h-64 md:h-auto shrink-0 relative">
                  <Image
                    fill
                    src={selectedItem.img}
                    alt={selectedItem.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-cream to-transparent opacity-60"></div>
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
                              : "border-border text-ink/60 bg-accent"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-space text-3xl font-bold mb-2 text-ink leading-tight">
                  {selectedItem.name}
                </h3>
                <p className="text-brand-gold font-bold text-2xl mb-6">
                  {selectedItem.price}
                </p>

                <p className="text-ink/80 leading-relaxed mb-8 font-light text-base border-l-2 border-brand-gold/50 pl-4 py-1">
                  "{selectedItem.desc}"
                </p>

                <div className="space-y-8 flex-1">
                  {selectedItem.ingredients &&
                    selectedItem.ingredients.length > 0 && (
                      <div>
                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink/40 mb-3 border-b border-border pb-2">
                          Key Ingredients
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.ingredients.map((ing, i) => (
                            <span
                              key={i}
                              className="text-sm text-ink/70 bg-accent px-3 py-1.5 rounded-sm"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {selectedItem.story && (
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink/40 mb-3 border-b border-border pb-2">
                        The Chef's Thought
                      </h4>
                      <p className="text-sm text-ink/60 leading-relaxed font-light italic">
                        {selectedItem.story}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-10 pt-6 border-t border-border">
                  {getItemQty(selectedItem.name) > 0 ? (
                    <div className="flex items-center justify-between gap-4 bg-accent px-4 py-3">
                      <button
                        type="button"
                        onClick={() => updateQty(selectedItem.name, -1)}
                        className="flex h-11 w-11 items-center justify-center bg-card text-ink transition-colors hover:bg-brand-gold hover:text-brand-dark"
                        aria-label={`Remove one ${selectedItem.name}`}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <div className="text-center">
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-ink/50">
                          In your order
                        </span>
                        <span className="font-space text-2xl text-ink">
                          {getItemQty(selectedItem.name)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateQty(selectedItem.name, 1)}
                        className="flex h-11 w-11 items-center justify-center bg-card text-ink transition-colors hover:bg-brand-gold hover:text-brand-dark"
                        aria-label={`Add one ${selectedItem.name}`}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        addToCart(selectedItem.name, selectedItem.price)
                      }
                      className="w-full bg-brand-gold text-brand-dark px-6 py-4 flex items-center justify-center gap-3 text-xs uppercase tracking-widest font-bold hover:bg-cream transition-colors"
                    >
                      Add to Order <Plus className="w-4 h-4" />
                    </button>
                  )}
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
            className="fixed bottom-0 inset-x-0 z-50 bg-cream/95 backdrop-blur-xl border-t border-brand-gold/30 shadow-[0_-16px_40px_rgba(44,38,33,0.14)]"
          >
            {isCartExpanded && (
              <div className="container mx-auto px-6 py-6 border-b border-border max-h-[60vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-space text-2xl text-ink">Your Order</h3>
                  <button
                    type="button"
                    onClick={() => setIsCartExpanded(false)}
                    className="text-ink/50 hover:text-ink transition-colors"
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
                        <h4 className="text-ink text-sm font-medium">
                          {item.name}
                        </h4>
                        <span className="text-ink/50 text-[10px] uppercase tracking-widest">
                          ${item.price.toFixed(2)} each
                        </span>
                      </div>
                      <div className="flex items-center gap-4 bg-accent rounded-full px-3 py-1">
                        <button
                          type="button"
                          onClick={() => updateQty(item.name, -1)}
                          className="text-ink hover:text-brand-gold transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-ink font-sans text-sm w-4 text-center">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.name, 1)}
                          className="text-ink hover:text-brand-gold transition-colors"
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
                <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
                  <span className="text-ink/50 uppercase tracking-widest text-xs font-bold">
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
                  <span className="absolute -top-2 -right-2 bg-card text-brand-dark w-5 h-5 rounded-full text-[10px] sm:text-xs font-bold flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.qty, 0)}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <span className="block text-[10px] uppercase tracking-widest text-ink/50 font-bold mb-1">
                    Total Order
                  </span>
                  <span className="block text-xl font-space font-bold text-ink leading-none">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-ink/50 hover:text-ink transition-colors hidden sm:block">
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
                    router.push("/checkout");
                  }}
                  className="bg-brand-gold text-brand-dark px-8 py-3 sm:px-10 sm:py-4 text-[10px] sm:text-xs uppercase tracking-widest font-bold hover:bg-cream transition-colors"
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
