"use client";

import {
  Facebook,
  Instagram,
  Mail,
  Map,
  MapPin,
  Menu as MenuIcon,
  Twitter,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FloatingChatBot } from "./components/FloatingChatBot";
import { Checkout } from "./views/Checkout";
import { Experience } from "./views/Experience";
import { Home } from "./views/Home";
import { Journey } from "./views/Journey";
import { Menu } from "./views/Menu";

export interface CartItem {
  name: string;
  price: number;
  qty: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (name: string, priceStr: string) => {
    const price = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
    setCart((prev) => {
      const existing = prev.find((i) => i.name === name);
      if (existing) {
        return prev.map((i) =>
          i.name === name ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { name, price, qty: 1 }];
    });
  };

  const updateQty = (name: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.name === name ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  };

  const clearCart = () => setCart([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="font-sans antialiased text-brand-light bg-brand-dark selection:bg-brand-gold selection:text-brand-dark min-h-screen flex flex-col pt-safe">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 border-b ${isScrolled ? "bg-brand-dark/95 backdrop-blur-md py-4 border-white/10" : "bg-transparent py-6 border-transparent"}`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <button
            type="button"
            className="relative block h-12 w-[160px] shrink-0 md:h-16 md:w-[210px]"
            onClick={() => navigate("home")}
            aria-label="Tandoori Corner home"
          >
            <Image
              src="/tandoori-corner-header-logo.png"
              alt="Tandoori Corner"
              fill
              priority
              sizes="(min-width: 768px) 210px, 160px"
              className="object-contain object-left"
            />
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            <button
              type="button"
              onClick={() => navigate("home")}
              className={`text-xs uppercase tracking-widest font-medium transition-colors ${currentPage === "home" ? "text-brand-gold" : "text-white/70 hover:text-brand-gold"}`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => navigate("menu")}
              className={`text-xs uppercase tracking-widest font-medium transition-colors ${currentPage === "menu" ? "text-brand-gold" : "text-white/70 hover:text-brand-gold"}`}
            >
              Full Menu
            </button>
            <a
              href="#tcb"
              onClick={() => {
                if (currentPage !== "home") navigate("home");
                setTimeout(() => (window.location.hash = "tcb"), 100);
              }}
              className="text-xs uppercase tracking-widest font-medium text-white/70 hover:text-brand-gold transition-colors"
            >
              The TCB Bar
            </a>
            <button
              type="button"
              onClick={() => navigate("experience")}
              className="bg-brand-gold hover:bg-brand-gold-muted text-brand-dark px-7 py-3 rounded-none text-xs uppercase tracking-widest text-center font-bold transition-colors"
            >
              Experience
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-dark pt-28 px-6 flex flex-col gap-6 lg:hidden"
          >
            <button
              type="button"
              onClick={() => navigate("home")}
              className={`text-2xl text-left font-space border-b border-white/10 pb-4 ${currentPage === "home" ? "text-brand-gold" : "text-white"}`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => navigate("menu")}
              className={`text-2xl text-left font-space border-b border-white/10 pb-4 ${currentPage === "menu" ? "text-brand-gold" : "text-white"}`}
            >
              Full Menu
            </button>
            <a
              href="#tcb"
              onClick={() => {
                navigate("home");
                setTimeout(() => (window.location.hash = "tcb"), 100);
              }}
              className="text-2xl font-space text-white border-b border-white/10 pb-4"
            >
              The TCB Bar
            </a>
            <button
              type="button"
              onClick={() => navigate("experience")}
              className="bg-brand-gold text-brand-dark px-8 py-4 rounded-none text-sm uppercase tracking-widest font-bold mt-4"
            >
              Experience
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full">
        {currentPage === "home" && <Home navigate={navigate} />}
        {currentPage === "menu" && (
          <Menu
            navigate={navigate}
            cart={cart}
            addToCart={addToCart}
            updateQty={updateQty}
          />
        )}
        {currentPage === "experience" && <Experience navigate={navigate} />}
        {currentPage === "checkout" && (
          <Checkout
            navigate={navigate}
            cart={cart}
            updateQty={updateQty}
            clearCart={clearCart}
          />
        )}
        {currentPage === "journey" && <Journey navigate={navigate} />}
      </main>

      {/* Footer / Logistics */}
      <footer className="bg-brand-dark pt-24 pb-12 border-t border-white/5 relative mt-auto">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <span className="font-space text-2xl font-bold text-white mb-6 block">
              Tandoori<span className="text-brand-gold">Corner</span>
            </span>
            <p className="text-white/50 text-sm pr-8 leading-relaxed mb-8">
              Tucked inside Balestier Plaza, we offer both the lush pet-friendly
              alfresco balcony and the exclusive indoor TCB Bar for a premium
              dining experience.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold hover:text-brand-dark transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#EA4335] hover:border-[#EA4335] hover:text-white transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-6">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-6">
              Contact & Logistics
            </h4>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative w-full h-32 bg-brand-dark mb-6 overflow-hidden border border-white/10 group cursor-pointer hover:border-brand-gold transition-colors"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-gold blur-lg opacity-40 animate-pulse rounded-full"></div>
                  <MapPin
                    className="relative w-10 h-10 text-brand-gold drop-shadow-2xl group-hover:-translate-y-2 group-hover:scale-110 transition-transform duration-300"
                    strokeWidth={1.5}
                    fill="#0d1117"
                  />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-brand-dark/80 backdrop-blur-sm px-2 py-1 text-[8px] uppercase tracking-widest font-bold text-white border border-white/10 group-hover:border-brand-gold/50 transition-colors">
                View Map
              </div>
            </a>

            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-gold shrink-0" />
                <span>
                  400 Balestier Road
                  <br />
                  Balestier Plaza
                  <br />
                  Singapore 329802
                </span>
              </li>
              <li className="flex items-center gap-3 mt-4">
                <Map className="w-4 h-4 text-brand-gold shrink-0" />
                <a
                  href="#"
                  className="border-b border-white/30 pb-0.5 hover:text-white hover:border-white transition-colors"
                >
                  Get Directions
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-6">
              Service Hours
            </h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Lunch Service</span>
                <span className="font-medium text-white">
                  12:00 PM - 2:45 PM
                </span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2 text-brand-gold/60 italic text-xs">
                <span>Kitchen Reset / Closed</span>
                <span>2:45 PM - 6:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Evening & TCB Bar</span>
                <span className="font-medium text-white">
                  6:00 PM - 9:45 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>
            &copy; {new Date().getFullYear()} Tandoori Corner. All Rights
            Reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot */}
      <FloatingChatBot navigate={navigate} />
    </div>
  );
}
