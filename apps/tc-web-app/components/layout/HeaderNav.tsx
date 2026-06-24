"use client";

import { Menu, Search, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";

interface NavigationItem {
  href: string;
  label: string;
}

interface HeaderNavProps {
  items: NavigationItem[];
}

export function HeaderNav({ items }: HeaderNavProps) {
  const pathname = usePathname();
  const { cart } = useCart();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    const updateHeaderState = () => setHasScrolled(window.scrollY > 24);
    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isDarkBg = !hasScrolled;

  const leftItems = items.slice(0, Math.ceil(items.length / 2));
  const rightItems = items.slice(Math.ceil(items.length / 2));

  const isItemActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 py-4 text-white md:py-6 ${
        isDarkBg
          ? "bg-gradient-to-b from-black/80 via-black/45 to-transparent"
          : "bg-ink border-b border-white/10 shadow-md"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between relative px-5 sm:px-8">
        {/* Left Side (Left Nav Links + Mobile Hamburger) */}
        <div className="flex items-center space-x-8 z-10 w-auto xl:w-1/3">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="hover:text-primary transition-colors xl:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden xl:flex items-center space-x-8">
            {leftItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-raleway text-xs font-bold tracking-widest whitespace-nowrap transition-colors hover:text-primary ${
                  isItemActive(item.href) ? "text-primary" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Center Logo */}
        <Link
          href="/"
          aria-label="Tandoori Corner — home"
          className="flex items-center absolute left-1/2 -translate-x-1/2 z-20"
        >
          <Image
            src="/homepage/tc-logo.png"
            alt="Tandoori Corner — North Indian Curry House"
            width={600}
            height={183}
            priority
            className="h-11 w-auto rounded-md bg-white/92 px-2.5 py-1 shadow-lg ring-1 ring-black/5 sm:h-14 sm:px-3 sm:py-1.5"
          />
        </Link>

        {/* Right Side (Right Nav Links + Action Icons) */}
        <div className="flex items-center justify-end space-x-5 z-10 w-auto sm:space-x-6 xl:w-1/3">
          <div className="hidden xl:flex items-center space-x-8 mr-4">
            {rightItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-raleway text-xs font-bold tracking-widest whitespace-nowrap transition-colors hover:text-primary ${
                  isItemActive(item.href) ? "text-primary" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label="Search"
            className="hidden hover:text-primary transition-colors sm:block"
          >
            <Search className="w-4 h-4" />
          </button>
          <Link
            href="/checkout"
            aria-label="View cart"
            className="relative hover:text-primary transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile menu overlay + drawer */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={mobileOpen ? 0 : -1}
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 xl:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        className={`fixed left-0 top-0 z-50 h-full w-[82%] max-w-xs bg-ink text-white shadow-2xl transition-transform duration-300 ease-in-out xl:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <Image
            src="/tandoori-corner-logo.png"
            alt="Tandoori Corner"
            width={600}
            height={183}
            className="h-10 w-auto rounded-md bg-white/92 px-2 py-1"
          />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="text-white/70 hover:text-primary transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col px-2 py-4">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`border-b border-white/5 px-4 py-4 font-raleway text-sm font-bold uppercase tracking-widest transition-colors hover:text-primary ${
                isItemActive(item.href) ? "text-primary" : "text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 py-6">
          <Link
            href="/order"
            onClick={() => setMobileOpen(false)}
            className="flex w-full items-center justify-center bg-primary px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-ink"
          >
            Order Online
          </Link>
        </div>
      </div>
    </nav>
  );
}
