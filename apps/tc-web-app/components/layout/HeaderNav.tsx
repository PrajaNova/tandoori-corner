"use client";

import { Menu, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavigationItem {
  href: string;
  label: string;
}

interface HeaderNavProps {
  items: NavigationItem[];
}

export function HeaderNav({ items }: HeaderNavProps) {
  const pathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => setHasScrolled(window.scrollY > 24);
    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  const isDarkBg = !hasScrolled;

  const leftItems = items.slice(0, Math.ceil(items.length / 2));
  const rightItems = items.slice(Math.ceil(items.length / 2));

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 py-6 border-b border-white/10 ${
        isDarkBg
          ? "bg-transparent text-white"
          : "bg-ink text-white shadow-md"
      }`}
    >
      <div className="container mx-auto px-8 flex items-center justify-between relative">
        
        {/* Left Side (Left Nav Links + Mobile Hamburger) */}
        <div className="flex items-center space-x-8 z-10 w-1/3">
          <button className="hover:text-primary transition-colors lg:hidden">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:flex items-center space-x-8">
            {leftItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`font-raleway text-xs font-bold tracking-widest transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Center Logo */}
        <Link href="/" className="flex flex-col items-center absolute left-1/2 -translate-x-1/2 z-20 mt-1">
          <span className="font-raleway text-[10px] tracking-[0.3em] uppercase leading-none text-white mb-1">Restaurant</span>
          <span className="font-script text-4xl leading-none text-white capitalize">Granny</span>
        </Link>

        {/* Right Side (Right Nav Links + Action Icons) */}
        <div className="flex items-center justify-end space-x-6 z-10 w-1/3">
          <div className="hidden lg:flex items-center space-x-8 mr-4">
            {rightItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`font-raleway text-xs font-bold tracking-widest transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          
          <button className="hover:text-primary transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <button className="relative hover:text-primary transition-colors">
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-2 -right-2 bg-primary text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center text-white">0</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
