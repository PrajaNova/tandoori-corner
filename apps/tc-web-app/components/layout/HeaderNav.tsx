"use client";

import { Menu as MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button, ButtonLink } from "@/components/ui/button";

interface NavigationItem {
  href: string;
  label: string;
}

interface HeaderNavProps {
  items: NavigationItem[];
}

export function HeaderNav({ items }: HeaderNavProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const isHome = pathname === "/";
  const isTransparent = isHome && !hasScrolled && !mobileMenuOpen;
  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const updateHeaderState = () => setHasScrolled(window.scrollY > 24);

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-9 z-50 w-full py-3 transition-all duration-500 md:py-4 ${
          isTransparent
            ? "border-b border-transparent bg-transparent"
            : "border-b border-border bg-background/95 shadow-sm backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link
            href="/"
            className="flex shrink-0 flex-col text-left"
            onClick={closeMobileMenu}
            aria-label="Tandoori Corner home"
          >
            <span
              className={`font-space text-xl md:text-2xl font-bold tracking-tight leading-none transition-colors ${
                isTransparent ? "text-cream" : "text-foreground"
              }`}
            >
              Tandoori<span className="text-brand-gold">Corner</span>
            </span>
            <span
              className={`mt-1 text-[8px] uppercase tracking-[0.18em] transition-colors md:text-[9px] md:tracking-[0.2em] ${
                isTransparent ? "text-cream/70" : "text-muted-foreground"
              }`}
            >
              Est. 2008 &bull; Balestier
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {items.map((item) => {
              const isActive = item.href.includes("#")
                ? false
                : item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href.split("#")[0];

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-space text-lg tracking-normal transition-colors ${
                    isActive
                      ? "text-primary"
                      : isTransparent
                        ? "text-cream/90 hover:text-brand-gold"
                        : "text-foreground/90 hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <ButtonLink
              className="font-space text-base normal-case tracking-normal"
              href="/experience"
              size="default"
            >
              Experience
            </ButtonLink>
          </div>

          <Button
            className={`lg:hidden ${
              isTransparent ? "text-cream" : "text-foreground"
            }`}
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            size="icon"
            variant="ghost"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </Button>
        </div>
      </nav>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-40 flex flex-col gap-6 bg-background/95 px-6 pt-36 backdrop-blur-md lg:hidden">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobileMenu}
              className="text-2xl text-left font-space border-b border-border pb-4 text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink
            href="/experience"
            onClick={closeMobileMenu}
            className="mt-4 font-space text-lg normal-case tracking-normal"
            size="lg"
          >
            Experience
          </ButtonLink>
        </div>
      ) : null}
    </>
  );
}
