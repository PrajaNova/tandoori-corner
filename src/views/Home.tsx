import {
  ArrowRight,
  Bike,
  ChefHat,
  Instagram,
  ShoppingBag,
  Star,
  Utensils,
} from "lucide-react";
import { motion } from "motion/react";

import { DailyOffers, type Offer } from "../components/DailyOffers";

export function Home({ navigate }: { navigate: (page: string) => void }) {
  const offers: Offer[] = [
    {
      title: "Amex Special",
      value: "15% Off Total Bill",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80",
      badge: "Limited Time",
      badgeColor: "bg-brand-gold text-brand-dark",
      points: [
        "Valid for Dine-In",
        "Valid for TCB & Alfresco",
        "Not stacked with other offers",
        "Min. spend $50",
      ],
      actionLabel: "Reserve a Table",
      actionType: "experience",
    },
    {
      title: "Lunch Specials",
      value: "From $12.90",
      image:
        "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&q=80",
      badge: "Daily Deal",
      badgeColor: "bg-white text-brand-dark",
      points: [
        "Authentic Thali Sets",
        "Includes Drink & Dessert",
        "Available Mon-Fri",
        "11:30 AM to 2:30 PM",
      ],
      actionLabel: "View Lunch Menu",
      actionType: "menu",
    },
    {
      title: "Beer Fest @ TCB",
      value: "1-for-1 Pints",
      image:
        "https://images.unsplash.com/photo-1575037614876-c38555e09f7a?auto=format&fit=crop&q=80",
      badge: "Evenings Only",
      badgeColor: "bg-[#d48c37] text-white",
      points: [
        "Premium Drafts & Crafts",
        "Valid strictly at TCB Bar",
        "After 8:00 PM daily",
        "Selected beers only",
      ],
      actionLabel: "Book TCB Bar",
      actionType: "experience",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-brand-dark/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Stickers / Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-xl">
                <div className="flex text-brand-gold">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" opacity={0.5} />
                </div>
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                  4.5 on Google
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-xl">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                  🏆 TripAdvisor Excellence
                </span>
              </div>
            </div>

            <span className="text-brand-gold font-sans tracking-[0.3em] uppercase text-xs mb-6 block font-medium">
              Inside Tandoori Corner
            </span>
            <h1 className="font-space text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] text-white">
              Elevated Indian Dining &amp; <br />{" "}
              <span className="text-white/90 italic font-light">
                Evening Cocktails.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the acclaimed flavors of our 15-year heritage, now
              served in the lush alfresco balcony or inside the exclusive TCB
              Bar.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => navigate("menu")}
                className="w-full sm:w-auto bg-brand-gold hover:bg-brand-gold-muted text-brand-dark px-10 py-5 text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-3 group"
              >
                Explore The Menu{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => navigate("experience")}
                className="w-full sm:w-auto px-10 py-5 text-xs uppercase tracking-widest font-bold text-white transition-all flex items-center justify-center gap-3 border border-white/20 hover:bg-white/5"
              >
                Reserve Alfresco
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Features Bar */}
      <section className="bg-brand-dark border-b border-white/5 relative z-20">
        <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="flex flex-col text-center px-4 pt-6 md:pt-0">
            <h3 className="font-space text-xl text-white mb-3">
              Pet-Friendly Alfresco
            </h3>
            <p className="text-sm text-white/50 leading-relaxed font-light">
              Outdoor dining with vibrant views over the Balestier heritage
              trail. Perfect for brunch or sunset dinners.
            </p>
          </div>
          <div className="flex flex-col text-center px-4 pt-6 md:pt-0">
            <h3 className="font-space text-xl text-white mb-3">The TCB Bar</h3>
            <p className="text-sm text-white/50 leading-relaxed font-light">
              A stylish indoor sanctuary designed for romantic dates, small
              groups, and exclusive private event nights.
            </p>
          </div>
          <div className="flex flex-col text-center px-4 pt-6 md:pt-0">
            <h3 className="font-space text-xl text-white mb-3">
              Plenty of Parking
            </h3>
            <p className="text-sm text-white/50 leading-relaxed font-light">
              Stress-free arrival with ample, easily accessible parking
              available directly at Balestier Plaza.
            </p>
          </div>
        </div>
      </section>

      {/* Culinary Offerings Teaser */}
      <section className="py-24 md:py-32 bg-brand-surface relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center mb-16">
          <h2 className="font-space text-4xl md:text-5xl font-bold mb-6">
            Our Culinary Corners
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            From the sizzling heat of the Tandoor to the rich depths of our
            signature Curries. Real food, tailored for alfresco evenings and
            stylish nights out.
          </p>
        </div>

        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {[
            {
              tag: "Tandoori Corner",
              title: "The Master's Tandoor",
              desc: "Marinades rested for 24 hours. Seekh Kebabs, Tandoori Chicken, and massive Seafood Platters.",
              img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80",
            },
            {
              tag: "Curry Corner",
              title: "Silken Gravies",
              desc: "Our legendary Butter Chicken and Saag Mutton. Deep, complex flavors meant to be mopped up with fresh Naan.",
              img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80",
            },
            {
              tag: "Snack & Drink Corner",
              title: "Bites & Pints",
              desc: "Crispy Samosas and Pakoras paired perfectly with our daily Beer Fest offers inside the TCB Bar.",
              img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-colors group"
            >
              <div className="mb-8 overflow-hidden relative h-48 border border-white/5">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold block mb-3">
                {item.tag}
              </span>
              <h3 className="font-space text-2xl mb-4">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            type="button"
            onClick={() => navigate("menu")}
            className="bg-transparent border border-white/20 text-white px-10 py-5 text-xs uppercase tracking-widest font-bold transition-all hover:bg-white hover:text-brand-dark"
          >
            View Full Digital Menu
          </button>
        </div>
      </section>

      {/* Our Services */}
      <section className="bg-white py-12 text-brand-dark relative z-10">
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <h2 className="font-space text-3xl font-bold mb-4">Our Services</h2>
          <div className="w-12 h-1 bg-[#d48c37] mx-auto mb-6"></div>
          <p className="text-gray-600 font-light mb-10 leading-relaxed max-w-2xl mx-auto">
            Tandoori Corner –Promises to serve fine dining quality North Indian
            food in a casual setting.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 mb-4 flex items-center justify-center text-[#84a92c] group-hover:scale-110 transition-transform duration-500">
                <Utensils className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <h4 className="font-space font-bold text-lg text-brand-dark">
                Dine-In
              </h4>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 mb-4 flex items-center justify-center text-[#84a92c] group-hover:scale-110 transition-transform duration-500">
                <ShoppingBag className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <h4 className="font-space font-bold text-lg text-brand-dark">
                Take Away
              </h4>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 mb-4 flex items-center justify-center text-[#84a92c] group-hover:scale-110 transition-transform duration-500">
                <Bike className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <h4 className="font-space font-bold text-lg text-brand-dark">
                Home Delivery
              </h4>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 mb-4 flex items-center justify-center text-[#84a92c] group-hover:scale-110 transition-transform duration-500">
                <ChefHat className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <h4 className="font-space font-bold text-lg text-brand-dark">
                Catering
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* The TCB Bar Spotlight */}
      <section
        id="tcb"
        className="py-24 md:py-32 bg-brand-dark relative overflow-hidden border-y border-white/5"
      >
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 border border-white/10 px-4 py-2 text-[10px] uppercase tracking-widest font-medium text-brand-gold relative">
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
              The Secret Room
            </div>
            <h2 className="font-space text-4xl md:text-5xl font-bold leading-tight">
              An Intimate Nightlife <br />
              Destination.
            </h2>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              Step away from the bustling Balestier pavement and into the TCB
              Bar. Designed for romantic dinners, after-work craft cocktails,
              and high-style corporate gatherings.
            </p>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              Featuring our curated <strong>Beer Fest specials</strong> daily,
              paired with exclusive a la carte bites unavailable in our standard
              alfresco dining.
            </p>
            <div className="pt-6 border-t border-white/10">
              <a
                href="#events"
                className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-brand-gold hover:text-brand-light transition-colors group"
              >
                Inquire for Private Events{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="relative h-[500px] md:h-[600px] w-full rounded-tr-[100px] rounded-bl-[100px] overflow-hidden">
              <div className="absolute inset-0 bg-brand-gold mix-blend-color opacity-20 z-10" />
              <img
                src="https://images.unsplash.com/photo-1470337458703-4f5afd4b4667?auto=format&fit=crop&q=80"
                alt="TCB Bar Interior"
                className="w-full h-full object-cover object-center grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Daily Offers / Promotions */}
      <DailyOffers navigate={navigate} offers={offers} />

      {/* Our Heritage / Story */}
      <section className="py-32 bg-brand-light text-brand-dark relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
            {/* Typography & Story */}
            <div className="lg:col-span-5 lg:col-start-2 order-2 lg:order-1 relative z-10">
              <div className="inline-flex items-center gap-3 border border-brand-dark/20 px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-brand-dark mb-8">
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
                Since 2008
              </div>

              <h2 className="font-space text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1] text-brand-dark">
                The Authentic <br />{" "}
                <span className="text-brand-gold italic">North Indian</span>{" "}
                <br /> Curry House.
              </h2>

              <div className="space-y-6 text-brand-dark/70 font-light text-lg leading-relaxed">
                <p>
                  Established at the iconic Balestier Plaza, Tandoori Corner has
                  spent over a decade perfecting the art of North Indian
                  hospitality in Singapore.
                </p>
                <p>
                  We believe in uncompromising authenticity. From hand-blended
                  spices to slow-cooked gravies and meats fired in our
                  traditional clay ovens, every dish reflects the true essence
                  of India's robust culinary heritage.
                </p>
                <p>
                  Whether you're enjoying our pet-friendly alfresco dining or
                  relaxing inside the TCB Bar, you are experiencing renowned
                  recipes that have stood the test of time.
                </p>
              </div>

              <div className="mt-12">
                <button
                  type="button"
                  onClick={() => navigate("journey")}
                  className="border-b-2 border-brand-dark pb-1 text-xs uppercase tracking-widest font-bold hover:text-brand-gold hover:border-brand-gold transition-colors"
                >
                  Discover Our Story
                </button>
              </div>
            </div>

            {/* Editorial Image Collage */}
            <div className="lg:col-span-6 relative order-1 lg:order-2 h-[500px] md:h-[600px] w-full">
              {/* Decorative Element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-gold/10 rounded-full blur-3xl -z-10"></div>

              <div className="absolute top-0 right-0 w-4/5 h-[75%] overflow-hidden rounded-bl-[80px] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
                  alt="Restaurant Interior"
                  className="w-full h-full object-cover grayscale opacity-90 transition-all duration-1000 hover:grayscale-0 hover:scale-105"
                />
              </div>

              <div className="absolute bottom-0 left-0 w-[65%] h-[60%] border-[12px] border-brand-light overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80"
                  alt="Authentic Spices"
                  className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0"
                />
              </div>

              {/* Badge */}
              <div className="absolute top-8 left-0 w-28 h-28 md:w-32 md:h-32 bg-brand-dark text-brand-gold rounded-full flex flex-col items-center justify-center p-4 text-center transform -rotate-12 shadow-xl border border-brand-gold/30 hover:rotate-0 transition-transform duration-500">
                <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold leading-none mb-1">
                  Authentic
                </span>
                <span className="font-space text-lg md:text-xl font-bold leading-none mb-1">
                  100%
                </span>
                <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold leading-none">
                  Spices
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Footprint Section */}
      <section className="bg-brand-dark py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-brand-gold mb-4 border border-brand-gold/30 px-3 py-1 rounded-full">
                <Instagram className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest font-bold">
                  @tandooricorner
                </span>
              </div>
              <h2 className="font-space text-4xl font-bold text-white mb-4">
                Join Our Community
              </h2>
              <p className="text-white/60 font-light max-w-lg">
                Tag us in your moments and experience the sizzle beyond the
                screen. Follow us for behind-the-scenes, specials, and the love
                of Indian cuisine.
              </p>
            </div>
            <a
              href="#"
              className="shrink-0 inline-flex items-center gap-2 bg-white text-brand-dark px-8 py-4 text-xs uppercase tracking-widest font-bold transition-all hover:bg-brand-gold hover:text-brand-dark cursor-pointer group"
            >
              Follow Us{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80",
            ].map((img, idx) => (
              <a
                key={idx}
                href="#"
                className="relative aspect-square overflow-hidden group block"
              >
                <img
                  src={img}
                  alt="Instagram post"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white scale-0 group-hover:scale-100 transition-transform duration-500 delay-100" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
