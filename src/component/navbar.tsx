"use client";

import { Menu as MenuIcon, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/component/cart-provider";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartItems } = useCart();

  const isHome = pathname === "/";
  const navSolid = isScrolled || !isHome || isMobileMenuOpen;
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`fixed z-50 w-full border-b transition-all duration-300 ${
        navSolid
          ? "border-black/5 bg-cream/95 py-4 shadow-sm backdrop-blur-md"
          : "border-transparent bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
        <Link
          className={`font-serif text-2xl font-bold tracking-tight md:text-3xl ${
            navSolid ? "text-brand" : "text-cream"
          }`}
          href="/"
          onClick={closeMobileMenu}
        >
          Tandoori Corner
        </Link>

        <div className="hidden items-center space-x-12 md:flex">
          <div
            className={`flex space-x-8 text-sm font-medium uppercase tracking-wide ${
              navSolid ? "text-ink" : "text-cream/90"
            }`}
          >
            <Link className="transition-colors hover:text-brand" href="/">
              Home
            </Link>
            <Link className="transition-colors hover:text-brand" href="/menu">
              Menu & Order
            </Link>
            <Link
              className="transition-colors hover:text-brand"
              href="/reservations"
            >
              Reservations
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              aria-label="Open checkout"
              className={`relative flex items-center transition-colors hover:text-brand ${
                navSolid ? "text-ink" : "text-cream"
              }`}
              href="/checkout"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 ? (
                <span className="-right-2 -top-2 absolute flex h-5 w-5 items-center justify-center rounded-full bg-brand font-bold text-white text-xs">
                  {totalItems}
                </span>
              ) : null}
            </Link>
            <Link
              className="rounded-full bg-brand px-6 py-2.5 font-semibold text-cream text-sm uppercase tracking-wide transition-all hover:bg-tandoori-dark hover:shadow-lg"
              href="/reservations"
            >
              Book Table
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-6 md:hidden">
          <Link
            aria-label="Open checkout"
            className={`relative flex items-center transition-colors hover:text-brand ${
              navSolid ? "text-ink" : "text-cream"
            }`}
            href="/checkout"
            onClick={closeMobileMenu}
          >
            <ShoppingCart size={24} />
            {totalItems > 0 ? (
              <span className="-right-2 -top-2 absolute flex h-5 w-5 items-center justify-center rounded-full bg-brand font-bold text-white text-xs">
                {totalItems}
              </span>
            ) : null}
          </Link>
          <button
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className={navSolid ? "text-brand" : "text-cream"}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            type="button"
          >
            {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 flex w-full flex-col space-y-6 border-black/5 border-b bg-cream px-6 py-8 shadow-2xl md:hidden"
            exit={{ opacity: 0, y: -20 }}
            initial={{ opacity: 0, y: -20 }}
          >
            <Link
              className="font-serif text-ink text-xl"
              href="/"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              className="font-serif text-ink text-xl"
              href="/menu"
              onClick={closeMobileMenu}
            >
              Menu & Order
            </Link>
            <Link
              className="font-serif text-ink text-xl"
              href="/reservations"
              onClick={closeMobileMenu}
            >
              Reservations
            </Link>
            <Link
              className="mt-4 rounded-full bg-brand px-6 py-3 text-center font-medium text-cream"
              href="/reservations"
              onClick={closeMobileMenu}
            >
              Book Table
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
