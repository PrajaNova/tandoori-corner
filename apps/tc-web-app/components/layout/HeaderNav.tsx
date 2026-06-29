"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { HeaderCart } from "@/components/layout/HeaderCart";
import { BrandLogo } from "@/components/layout/header/BrandLogo";
import { HeaderLink } from "@/components/layout/header/HeaderLink";
import { MobileDrawer } from "@/components/layout/header/MobileDrawer";

interface NavigationItem {
  href: string;
  label: string;
}

interface HeaderNavProps {
  items: NavigationItem[];
}

export function HeaderNav({ items }: HeaderNavProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full py-4 transition-[background-color,box-shadow,backdrop-filter] duration-300 md:py-5 scroll-header">
        <div className="container mx-auto flex items-center justify-between relative px-5 sm:px-8 max-w-6xl">
          {/* Left Side: Logo (Desktop) / Hamburger (Mobile) */}
          <div className="flex items-center justify-start flex-1">
            <button
              type="button"
              className="-ml-2 cursor-pointer p-2 text-white transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-[1080px]:hidden"
              aria-label="Open menu"
              aria-controls="mobile-drawer"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Brand Logo */}
            <BrandLogo desktop className="hidden min-[1080px]:flex" />
          </div>

          {/* Center Side: Menu Links (Desktop) / Centered Logo (Mobile) */}
          <div className="flex items-center justify-center flex-initial">
            {/* Mobile Brand Logo */}
            <BrandLogo className="flex min-[1080px]:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20" />

            {/* Desktop Center Navigation Links */}
            <div className="hidden min-[1080px]:flex items-center space-x-6 lg:space-x-8">
              {items.map((item) => (
                <HeaderLink key={item.label} href={item.href}>
                  {item.label}
                </HeaderLink>
              ))}
            </div>
          </div>

          {/* Right Side: Cart Icon (Desktop & Mobile) */}
          <div className="flex items-center justify-end flex-1">
            <HeaderCart />
          </div>
        </div>
      </nav>

      <MobileDrawer
        items={items}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      />
    </>
  );
}
