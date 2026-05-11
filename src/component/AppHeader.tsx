"use client";

import {
  Camera,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Share2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/component/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/component/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const contactActions = [
  {
    label: "Call 65-6250-0200",
    href: "tel:+6562500200",
    icon: Phone,
  },
  {
    label: "WhatsApp 65-9862-7334",
    href: "https://wa.me/6598627334",
    icon: MessageCircle,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/Tandoori-Corner-333078973565275",
    icon: Share2,
  },
  {
    label: "Instagram",
    href: "/gallery",
    icon: Camera,
  },
  {
    label: "Email tandooricorner@singnet.com.sg",
    href: "mailto:tandooricorner@singnet.com.sg",
    icon: Mail,
  },
];

function BrandLogo({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href="/"
      className="flex items-center"
      aria-label="Tandoori Corner home"
      onClick={onClick}
    >
      <Image
        src="/tandoori-corner-logo.png"
        alt="Tandoori Corner"
        width={180}
        height={88}
        priority
        className="h-16 w-32 shrink-0 object-contain sm:h-[4.5rem] sm:w-40 lg:h-20 lg:w-48"
      />
    </a>
  );
}

export function AppHeader() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;
      const isNearTop = currentScrollY < 24;

      setIsHeaderVisible(isScrollingUp || isNearTop || isMobileOpen);
      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileOpen]);

  return (
    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-white transition-transform duration-300",
          isHeaderVisible
            ? "translate-y-0"
            : "-translate-y-full lg:translate-y-0",
        )}
      >
        <div className="bg-brand/95 text-white shadow-lifted backdrop-blur">
          <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-between gap-4 px-5 py-2 text-xs font-semibold sm:px-8 lg:px-12">
            <a
              href="https://goo.gl/maps/3vm1gJyvuESZv6Lh8"
              target="_blank"
              rel="noreferrer"
              className="flex min-w-0 items-center gap-2 text-white hover:text-madison"
            >
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              <span className="truncate">
                400 Balestier Road #01-12 Balestier Plaza, Singapore 329802
              </span>
            </a>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              {contactActions.map((action) => {
                const Icon = action.icon;

                return (
                  <a
                    href={action.href}
                    key={action.label}
                    aria-label={action.label}
                    className="inline-flex size-7 items-center justify-center rounded-full text-white transition hover:bg-white/20 hover:text-madison"
                    target={
                      action.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      action.href.startsWith("http") ? "noreferrer" : undefined
                    }
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-b border-white/10 bg-gradient-to-b from-madison/55 via-madison/25 to-transparent backdrop-blur-[2px]">
          <div className="mx-auto flex h-20 max-w-7xl items-center px-5 sm:px-8 lg:h-24 lg:px-12">
            <div className="flex flex-1 items-center justify-start">
              <BrandLogo />
            </div>

            <div className="flex flex-1 items-center justify-end gap-7">
              <nav
                aria-label="Primary navigation"
                className="hidden items-center gap-8 lg:flex"
              >
                {navLinks.map((link) => (
                  <a
                    href={link.href}
                    key={link.label}
                    className="text-sm font-bold uppercase tracking-[0.12em] text-white/80 transition hover:text-curry"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <Button asChild className="hidden lg:inline-flex" variant="gold">
                <a href="/#reserve">Book Now</a>
              </Button>

              <SheetTrigger asChild>
                <Button
                  aria-label="Open navigation menu"
                  size="icon"
                  variant="outline"
                  className="lg:hidden"
                >
                  <Menu aria-hidden="true" />
                </Button>
              </SheetTrigger>
            </div>
          </div>
        </div>
      </header>

      <SheetContent>
        <div className="flex min-h-screen flex-col px-6 py-6">
          <div className="flex h-16 items-center justify-between">
            <SheetClose asChild>
              <BrandLogo />
            </SheetClose>
            <SheetClose asChild>
              <Button
                aria-label="Close navigation menu"
                size="icon"
                variant="outline"
              >
                <X aria-hidden="true" />
              </Button>
            </SheetClose>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="flex flex-1 flex-col justify-center gap-6"
          >
            {navLinks.map((link) => (
              <SheetClose asChild key={link.label}>
                <a
                  href={link.href}
                  className="font-serif text-4xl font-bold text-white transition hover:text-curry"
                >
                  {link.label}
                </a>
              </SheetClose>
            ))}
          </nav>

          <footer className="space-y-4 border-t border-white/10 pt-5">
            <p className="text-sm leading-6 text-white/65">
              400 Balestier Road #01-12 Balestier Plaza, Singapore 329802
            </p>
            <div className="grid grid-cols-2 gap-3">
              <SheetClose asChild>
                <Button asChild size="xl">
                  <a href="/#reserve">Dine With Us</a>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild size="xl" variant="secondary">
                  <a href="/menu">Order to Home</a>
                </Button>
              </SheetClose>
            </div>
          </footer>
        </div>
      </SheetContent>
    </Sheet>
  );
}
