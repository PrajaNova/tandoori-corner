"use client";

import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Minus,
  MousePointerClick,
  Plus,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type ClassicDish, menuCategories } from "@/app/menu/menu-data";
import { useCart } from "@/hooks/use-cart";

interface BookPageProps {
  pageNum: number;
  qtyByName: Map<string, number>;
  addToCart: (name: string, price: string) => void;
  updateQty: (name: string, delta: number) => void;
}

export function MenuBook() {
  const { cart, addToCart, updateQty } = useCart();
  const bookRef = useRef<HTMLDivElement>(null);

  const [spreadIndex, setSpreadIndex] = useState(0); // 0 to 9 for desktop
  const [mobilePageIndex, setMobilePageIndex] = useState(0); // 0 to 17 for mobile
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const isChefSpecialVisible = isDesktop
    ? spreadIndex === 3
    : mobilePageIndex === 6;

  // Hover states for the curl peel effect
  const [isHoveringNext, setIsHoveringNext] = useState(false);
  const [isHoveringPrev, setIsHoveringPrev] = useState(false);

  // 3D Flipping animation states
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [oldPages, setOldPages] = useState<[number, number]>([0, 0]);
  const [newPages, setNewPages] = useState<[number, number]>([0, 0]);

  const qtyByName = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of cart) {
      map.set(item.name, item.qty);
    }
    return map;
  }, [cart]);

  const totalDesktopSpreads = 10;
  const totalMobilePages = 18;

  // Track state in ref to avoid stale closures in event listeners
  const stateRef = useRef({
    spreadIndex,
    mobilePageIndex,
    isScrolling,
    isDesktop,
    isFlipping,
  });
  useEffect(() => {
    stateRef.current = {
      spreadIndex,
      mobilePageIndex,
      isScrolling,
      isDesktop,
      isFlipping,
    };
  }, [spreadIndex, mobilePageIndex, isScrolling, isDesktop, isFlipping]);

  // Track responsive screen size safely on client side
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trigger 3D Book Page Flip (wrapped in useCallback to prevent hook dependency rebuilds)
  const triggerFlip = useCallback((nextSpreadIndex: number) => {
    const { spreadIndex: currSpread, isFlipping: currFlipping } =
      stateRef.current;
    if (
      nextSpreadIndex < 0 ||
      nextSpreadIndex >= totalDesktopSpreads ||
      currFlipping
    )
      return;

    const isNext = nextSpreadIndex > currSpread;
    setDirection(isNext ? 1 : -1);
    setFlipDirection(isNext ? "next" : "prev");

    // Capture pages before transition
    const oldLeft = currSpread * 2 - 1;
    const oldRight = currSpread * 2;
    setOldPages([oldLeft, oldRight]);

    // Capture pages after transition
    const newLeft = nextSpreadIndex * 2 - 1;
    const newRight = nextSpreadIndex * 2;
    setNewPages([newLeft, newRight]);

    setIsFlipping(true);
    setSpreadIndex(nextSpreadIndex);

    // Sync mobile page
    if (nextSpreadIndex === 0) {
      setMobilePageIndex(0);
    } else if (nextSpreadIndex === totalDesktopSpreads - 1) {
      setMobilePageIndex(totalMobilePages - 1);
    } else {
      setMobilePageIndex(nextSpreadIndex * 2 - 1);
    }
  }, []);

  const navigateMobile = useCallback((newPageIndex: number) => {
    const { mobilePageIndex: currMobile, isScrolling: currScrolling } =
      stateRef.current;
    if (newPageIndex < 0 || newPageIndex >= totalMobilePages || currScrolling)
      return;

    setDirection(newPageIndex > currMobile ? 1 : -1);
    setMobilePageIndex(newPageIndex);

    // Sync desktop spread
    if (newPageIndex === 0) {
      setSpreadIndex(0);
    } else if (newPageIndex === totalMobilePages - 1) {
      setSpreadIndex(totalDesktopSpreads - 1);
    } else {
      setSpreadIndex(Math.floor((newPageIndex + 1) / 2));
    }
  }, []);

  // Wheel and Touch Event Listeners for booklet page turning
  useEffect(() => {
    const element = bookRef.current;
    if (!element) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const handleWheelRaw = (e: WheelEvent) => {
      // Always prevent default parent page scrolling when scrolling inside the booklet container
      e.preventDefault();

      const {
        spreadIndex: currSpread,
        mobilePageIndex: currMobile,
        isScrolling: currScrolling,
        isDesktop: currDesktop,
        isFlipping: currFlipping,
      } = stateRef.current;

      const isNext = e.deltaY > 0 || e.deltaX > 0;
      const isAtStart = currDesktop ? currSpread === 0 : currMobile === 0;
      const isAtEnd = currDesktop
        ? currSpread === totalDesktopSpreads - 1
        : currMobile === totalMobilePages - 1;

      // If scrolling past booklet boundaries, do not flip, but default page scroll remains blocked
      if ((!isNext && isAtStart) || (isNext && isAtEnd)) {
        return;
      }

      if (currScrolling || currFlipping) return;

      // Ignore tiny mouse scrolls to avoid hyper-sensitivity
      if (Math.abs(e.deltaY) < 15 && Math.abs(e.deltaX) < 15) return;

      setIsScrolling(true);

      if (currDesktop) {
        const nextSpread = isNext ? currSpread + 1 : currSpread - 1;
        triggerFlip(nextSpread);
      } else {
        const nextMobile = isNext ? currMobile + 1 : currMobile - 1;
        navigateMobile(nextMobile);
      }

      setTimeout(() => {
        setIsScrolling(false);
      }, 850);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;

      const diffX = currentX - touchStartX;
      const diffY = currentY - touchStartY;

      // If horizontal swipe is on active booklet, prevent standard page scroll/nav gestures
      if (Math.abs(diffX) > 10 && Math.abs(diffX) > Math.abs(diffY)) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const {
        spreadIndex: currSpread,
        mobilePageIndex: currMobile,
        isScrolling: currScrolling,
        isDesktop: currDesktop,
        isFlipping: currFlipping,
      } = stateRef.current;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Check if horizontal swipe is main motion
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        const isNext = diffX < 0; // Swipe left is next
        const isAtStart = currDesktop ? currSpread === 0 : currMobile === 0;
        const isAtEnd = currDesktop
          ? currSpread === totalDesktopSpreads - 1
          : currMobile === totalMobilePages - 1;

        if ((!isNext && isAtStart) || (isNext && isAtEnd)) {
          return;
        }

        if (currScrolling || currFlipping) return;
        setIsScrolling(true);

        if (currDesktop) {
          const nextSpread = isNext ? currSpread + 1 : currSpread - 1;
          triggerFlip(nextSpread);
        } else {
          const nextMobile = isNext ? currMobile + 1 : currMobile - 1;
          navigateMobile(nextMobile);
        }

        setTimeout(() => {
          setIsScrolling(false);
        }, 850);
      }
    };

    element.addEventListener("wheel", handleWheelRaw, { passive: false });
    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener("wheel", handleWheelRaw);
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [triggerFlip, navigateMobile]);

  const jumpToSection = (section: string) => {
    if (isFlipping) return;
    let desktopTarget = 0;
    let mobileTarget = 0;

    switch (section) {
      case "cover":
        desktopTarget = 0;
        mobileTarget = 0;
        break;
      case "breakfast":
        desktopTarget = 1;
        mobileTarget = 2;
        break;
      case "lunch":
        desktopTarget = 3;
        mobileTarget = 5;
        break;
      case "dinner":
        desktopTarget = 5;
        mobileTarget = 9;
        break;
      case "dessert":
        desktopTarget = 7;
        mobileTarget = 13;
        break;
      case "drinks":
        desktopTarget = 8;
        mobileTarget = 15;
        break;
      case "back":
        desktopTarget = 9;
        mobileTarget = 17;
        break;
    }

    if (isDesktop) {
      triggerFlip(desktopTarget);
    } else {
      setDirection(mobileTarget > mobilePageIndex ? 1 : -1);
      setMobilePageIndex(mobileTarget);
      setSpreadIndex(desktopTarget);
    }
  };

  const renderPage = (pageNum: number) => {
    return (
      <BookPage
        pageNum={pageNum}
        qtyByName={qtyByName}
        addToCart={addToCart}
        updateQty={updateQty}
      />
    );
  };

  // Simple slide transition for mobile
  const mobileVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  const activeSection = useMemo(() => {
    const p = mobilePageIndex;
    if (p === 0) return "cover";
    if (p >= 1 && p <= 4) return "breakfast";
    if (p >= 5 && p <= 8) return "lunch";
    if (p >= 9 && p <= 12) return "dinner";
    if (p >= 13 && p <= 14) return "dessert";
    if (p >= 15 && p <= 16) return "drinks";
    return "back";
  }, [mobilePageIndex]);

  const tabs = [
    { id: "cover", label: "Cover" },
    { id: "breakfast", label: "Breakfast" },
    { id: "lunch", label: "Lunch" },
    { id: "dinner", label: "Dinner" },
    { id: "dessert", label: "Desserts" },
    { id: "drinks", label: "Drinks" },
    { id: "back", label: "Back" },
  ];

  return (
    <div
      ref={bookRef}
      className="relative w-full py-8 md:py-16 px-2 sm:px-4 bg-gradient-to-b from-[#181614] to-[#0c0a09] overflow-hidden"
    >
      {/* Ambient background decoration */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Book Nav Tabs */}
      <div className="relative z-10 flex flex-wrap justify-center gap-1 sm:gap-2 mb-8 max-w-4xl mx-auto px-2">
        {tabs.map((tab) => {
          const active = tab.id === activeSection;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => jumpToSection(tab.id)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full transition-all cursor-pointer ${
                active
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Booklet Workspace */}
      <div className="relative z-10 max-w-6xl mx-auto flex items-center justify-between gap-1 sm:gap-4 select-none">
        {/* Previous Button */}
        <button
          type="button"
          onMouseEnter={() => setIsHoveringPrev(true)}
          onMouseLeave={() => setIsHoveringPrev(false)}
          onClick={() =>
            isDesktop
              ? triggerFlip(spreadIndex - 1)
              : navigateMobile(mobilePageIndex - 1)
          }
          disabled={isDesktop ? spreadIndex === 0 : mobilePageIndex === 0}
          className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-black/40 border border-white/10 text-white transition-all hover:bg-primary hover:text-white hover:scale-105 disabled:opacity-20 disabled:hover:bg-black/40 disabled:hover:text-white disabled:hover:scale-100 cursor-pointer"
          aria-label="Previous Page"
        >
          <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>

        {/* The Booklet Shell */}
        <div className="relative flex-1 max-w-5xl h-[700px] sm:h-[660px] md:h-[680px] lg:h-[720px] bg-transparent perspective-[2000px]">
          {/* Desktop View spreads (Pure 3D book fold structure) */}
          {isDesktop ? (
            <div className="relative w-full h-full bg-transparent rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden border border-white/10 flex">
              {/* Cover Case Spread (Closed Front Book Cover) */}
              {spreadIndex === 0 && !isFlipping && (
                <motion.div
                  className="w-full h-full flex justify-center items-center bg-[#151312] p-4 relative"
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "left center",
                  }}
                  animate={{ rotateY: isHoveringNext ? -8 : 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
                >
                  {/* Subtle hover lift shadow */}
                  {isHoveringNext && (
                    <div className="absolute right-12 bottom-6 w-[350px] h-[30px] bg-black/55 blur-xl pointer-events-none transition-all duration-300" />
                  )}

                  <div className="w-[49%] h-[97%] max-w-md bg-gradient-to-br from-[#4d0c15] to-[#240409] rounded-xl shadow-2xl relative border-2 border-[#d4af37]/30 flex flex-col justify-between p-10 text-center overflow-hidden">
                    <div className="absolute inset-4 border border-[#d4af37]/20 pointer-events-none rounded-lg" />
                    <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/40 pointer-events-none" />
                    <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/40 pointer-events-none" />
                    <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/40 pointer-events-none" />
                    <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/40 pointer-events-none" />

                    <div className="mt-8">
                      <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#d4af37]">
                        Tandoori Corner
                      </span>
                      <h2 className="font-merriweather text-white text-3xl lg:text-4xl mt-3 font-black tracking-wide leading-tight">
                        MEMORIES OF
                        <br />
                        <span className="text-[#d4af37]">HERITAGE</span>
                      </h2>
                    </div>

                    <div className="my-auto flex justify-center">
                      <div className="relative w-40 h-40 opacity-90">
                        <Image
                          src="/homepage/tcb-logo.png"
                          alt="TCB Bar Logo"
                          fill
                          priority
                          sizes="160px"
                          className="object-contain filter brightness-110 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                        />
                      </div>
                    </div>

                    <div className="mb-6 z-10 flex flex-col items-center gap-3">
                      <p className="text-white/60 text-xs font-medium uppercase tracking-widest">
                        Singapore&apos;s Finest North Indian Cuisine
                      </p>
                      <button
                        type="button"
                        onClick={() => triggerFlip(1)}
                        className="inline-flex items-center gap-2 bg-[#d4af37] hover:bg-white text-black px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all rounded shadow-lg shadow-black/40 hover:scale-105 cursor-pointer"
                      >
                        <BookOpen className="h-4 w-4" /> Open Menu
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Cover Case Back Spread (Closed Back Book Cover) */}
              {spreadIndex === totalDesktopSpreads - 1 && !isFlipping && (
                <div className="w-full h-full flex justify-center items-center bg-[#151312] p-4 relative">
                  <div className="w-[49%] h-[97%] max-w-md bg-gradient-to-br from-[#4d0c15] to-[#240409] rounded-xl shadow-2xl relative border-2 border-[#d4af37]/30 flex flex-col justify-between p-10 text-center overflow-hidden">
                    <div className="absolute inset-4 border border-[#d4af37]/20 pointer-events-none rounded-lg" />

                    <div className="mt-8">
                      <div className="relative w-16 h-16 mx-auto mb-4 opacity-80">
                        <Image
                          src="/homepage/tc-logo.png"
                          alt="Tandoori Corner Logo"
                          fill
                          sizes="64px"
                          className="object-contain filter brightness-0 invert"
                        />
                      </div>
                      <h2 className="font-merriweather text-white text-2xl font-bold tracking-wide">
                        Tandoori Corner
                      </h2>
                      <div className="w-12 h-[2px] bg-[#d4af37]/40 mx-auto mt-3" />
                    </div>

                    <div className="my-auto text-white/80 space-y-5 text-sm">
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-widest text-[#d4af37] mb-1">
                          Balestier Plaza
                        </h4>
                        <p className="text-white/60 text-xs">
                          #01-01 Balestier Plaza, Singapore 329802
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-widest text-[#d4af37] mb-1">
                          Hours
                        </h4>
                        <p className="text-white/60 text-xs">
                          Daily: 11:30 AM - 2:30 PM
                        </p>
                        <p className="text-white/60 text-xs">
                          Evening: 6:00 PM - 10:30 PM
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-widest text-[#d4af37] mb-1">
                          Phone
                        </h4>
                        <p className="text-white/60 text-xs">+65 6250 0200</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <button
                        type="button"
                        onClick={() => triggerFlip(0)}
                        className="bg-transparent border border-white/20 hover:border-[#d4af37] hover:text-[#d4af37] text-white/80 px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded cursor-pointer"
                      >
                        Back to Front
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Standard Open Spread Layout (Left / Right spreads) */}
              {spreadIndex > 0 && spreadIndex < totalDesktopSpreads - 1 && (
                <div className="w-full h-full flex bg-[#1e1c1a] relative overflow-hidden select-none">
                  {/* Left Backdrop Static Page (Static during next flips, targets during prev flips) */}
                  <motion.div
                    className="w-1/2 h-full bg-[#FAF6EE] relative p-6 lg:p-10 flex flex-col overflow-y-auto"
                    style={{
                      transformOrigin: "right center",
                      transformStyle: "preserve-3d",
                    }}
                    animate={{
                      rotateY: isHoveringPrev && !isFlipping ? 10 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  >
                    <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-10" />
                    <div className="absolute top-4 left-4 right-6 bottom-4 border border-black/5 pointer-events-none rounded" />

                    {renderPage(
                      isFlipping
                        ? flipDirection === "next"
                          ? oldPages[0]
                          : newPages[0]
                        : spreadIndex * 2 - 1,
                    )}

                    <div className="mt-auto pt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-black/40 border-t border-black/5">
                      <span>Tandoori Corner</span>
                      <span>
                        Page{" "}
                        {isFlipping
                          ? flipDirection === "next"
                            ? oldPages[0]
                            : newPages[0]
                          : spreadIndex * 2 - 1}
                      </span>
                    </div>
                  </motion.div>

                  {/* Spine Crease Center Divider */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-[6px] -translate-x-1/2 bg-gradient-to-r from-black/45 via-[#1a1817] to-black/45 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] z-20 pointer-events-none" />

                  {/* Right Backdrop Static Page (Static during prev flips, targets during next flips) */}
                  <motion.div
                    className="w-1/2 h-full bg-[#FAF6EE] relative p-6 lg:p-10 flex flex-col overflow-y-auto"
                    style={{
                      transformOrigin: "left center",
                      transformStyle: "preserve-3d",
                    }}
                    animate={{
                      rotateY: isHoveringNext && !isFlipping ? -10 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  >
                    <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-10" />
                    <div className="absolute top-4 left-6 right-4 bottom-4 border border-black/5 pointer-events-none rounded" />

                    {renderPage(
                      isFlipping
                        ? flipDirection === "next"
                          ? newPages[1]
                          : oldPages[1]
                        : spreadIndex * 2,
                    )}

                    <div className="mt-auto pt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-black/40 border-t border-black/5">
                      <span>
                        Page{" "}
                        {isFlipping
                          ? flipDirection === "next"
                            ? newPages[1]
                            : oldPages[1]
                          : spreadIndex * 2}
                      </span>
                      <span>Singapore</span>
                    </div>
                  </motion.div>

                  {/* 3D Active Flipping Overlay */}
                  {isFlipping && (
                    <AnimatePresence mode="wait">
                      {flipDirection === "next" ? (
                        // Next page turning element (swings right-to-left)
                        <motion.div
                          key="flip-next"
                          initial={{ rotateY: 0 }}
                          animate={{ rotateY: -180 }}
                          exit={{ rotateY: -180 }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                          onAnimationComplete={() => setIsFlipping(false)}
                          className="absolute top-0 right-0 bottom-0 left-1/2 w-1/2 h-full z-30"
                          style={{
                            transformOrigin: "left center",
                            transformStyle: "preserve-3d",
                          }}
                        >
                          {/* Turning sheet - front face (renders old right page, visible first half of transition) */}
                          <div
                            className="absolute inset-0 bg-[#FAF6EE] p-6 lg:p-10 border border-black/5 flex flex-col"
                            style={{
                              backfaceVisibility: "hidden",
                              WebkitBackfaceVisibility: "hidden",
                            }}
                          >
                            <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-10" />
                            <div className="absolute top-4 left-6 right-4 bottom-4 border border-black/5 pointer-events-none rounded" />
                            {renderPage(oldPages[1])}
                            <div className="mt-auto pt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-black/40 border-t border-black/5">
                              <span>Page {oldPages[1]}</span>
                              <span>Singapore</span>
                            </div>
                          </div>

                          {/* Turning sheet - back face (renders new left page, visible second half of transition) */}
                          <div
                            className="absolute inset-0 bg-[#FAF6EE] p-6 lg:p-10 border border-black/5 flex flex-col"
                            style={{
                              backfaceVisibility: "hidden",
                              WebkitBackfaceVisibility: "hidden",
                              transform: "rotateY(180deg)",
                            }}
                          >
                            <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-10" />
                            <div className="absolute top-4 left-4 right-6 bottom-4 border border-black/5 pointer-events-none rounded" />
                            {renderPage(newPages[0])}
                            <div className="mt-auto pt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-black/40 border-t border-black/5">
                              <span>Tandoori Corner</span>
                              <span>Page {newPages[0]}</span>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        // Previous page turning element (swings left-to-right)
                        <motion.div
                          key="flip-prev"
                          initial={{ rotateY: 0 }}
                          animate={{ rotateY: 180 }}
                          exit={{ rotateY: 180 }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                          onAnimationComplete={() => setIsFlipping(false)}
                          className="absolute top-0 left-0 bottom-0 w-1/2 h-full z-30"
                          style={{
                            transformOrigin: "right center",
                            transformStyle: "preserve-3d",
                          }}
                        >
                          {/* Turning sheet - front face (renders old left page, visible first half of transition) */}
                          <div
                            className="absolute inset-0 bg-[#FAF6EE] p-6 lg:p-10 border border-black/5 flex flex-col"
                            style={{
                              backfaceVisibility: "hidden",
                              WebkitBackfaceVisibility: "hidden",
                            }}
                          >
                            <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-10" />
                            <div className="absolute top-4 left-4 right-6 bottom-4 border border-black/5 pointer-events-none rounded" />
                            {renderPage(oldPages[0])}
                            <div className="mt-auto pt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-black/40 border-t border-black/5">
                              <span>Tandoori Corner</span>
                              <span>Page {oldPages[0]}</span>
                            </div>
                          </div>

                          {/* Turning sheet - back face (renders new right page, visible second half of transition) */}
                          <div
                            className="absolute inset-0 bg-[#FAF6EE] p-6 lg:p-10 border border-black/5 flex flex-col"
                            style={{
                              backfaceVisibility: "hidden",
                              WebkitBackfaceVisibility: "hidden",
                              transform: "rotateY(-180deg)",
                            }}
                          >
                            <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-10" />
                            <div className="absolute top-4 left-6 right-4 bottom-4 border border-black/5 pointer-events-none rounded" />
                            {renderPage(newPages[1])}
                            <div className="mt-auto pt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-black/40 border-t border-black/5">
                              <span>Page {newPages[1]}</span>
                              <span>Singapore</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              )}
            </div>
          ) : (
            // Mobile View pages (Standard swipes / slides)
            <div className="relative w-full h-full bg-transparent">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={`mobile-page-${mobilePageIndex}`}
                  custom={direction}
                  variants={mobileVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex w-full h-full bg-[#FAF6EE] rounded-xl shadow-2xl relative border border-black/10 overflow-hidden"
                >
                  {mobilePageIndex === 0 ? (
                    // Mobile Page 0: Front Cover
                    <div className="w-full h-full bg-gradient-to-br from-[#4d0c15] to-[#240409] flex flex-col justify-between p-8 text-center relative overflow-hidden">
                      <div className="absolute inset-4 border border-[#d4af37]/20 pointer-events-none rounded-lg" />

                      <div className="mt-6">
                        <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-[#d4af37]">
                          Tandoori Corner
                        </span>
                        <h2 className="font-merriweather text-white text-2xl mt-2 font-bold tracking-wide">
                          MEMORIES OF
                          <br />
                          <span className="text-[#d4af37]">HERITAGE</span>
                        </h2>
                      </div>

                      <div className="my-auto flex justify-center">
                        <div className="relative w-36 h-36">
                          <Image
                            src="/homepage/tcb-logo.png"
                            alt="TCB Bar Logo"
                            fill
                            sizes="144px"
                            className="object-contain filter brightness-110 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-4">
                          North Indian Gastronomy
                        </p>
                        <button
                          type="button"
                          onClick={() => navigateMobile(1)}
                          className="bg-[#d4af37] text-black px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded shadow-md cursor-pointer"
                        >
                          Open Menu
                        </button>
                      </div>
                    </div>
                  ) : mobilePageIndex === totalMobilePages - 1 ? (
                    // Mobile Page 17: Back Cover
                    <div className="w-full h-full bg-gradient-to-br from-[#4d0c15] to-[#240409] flex flex-col justify-between p-8 text-center relative overflow-hidden">
                      <div className="absolute inset-4 border border-[#d4af37]/20 pointer-events-none rounded-lg" />

                      <div className="mt-6">
                        <div className="relative w-12 h-12 mx-auto mb-3 opacity-80">
                          <Image
                            src="/homepage/tc-logo.png"
                            alt="Tandoori Corner Logo"
                            fill
                            sizes="48px"
                            className="object-contain filter brightness-0 invert"
                          />
                        </div>
                        <h2 className="font-merriweather text-white text-xl font-bold tracking-wide">
                          Tandoori Corner
                        </h2>
                        <div className="w-8 h-[1px] bg-[#d4af37]/40 mx-auto mt-2" />
                      </div>

                      <div className="my-auto text-white/80 space-y-4 text-xs">
                        <div>
                          <h4 className="font-bold text-[10px] uppercase tracking-widest text-[#d4af37] mb-0.5">
                            Location
                          </h4>
                          <p className="text-white/60 text-[11px]">
                            Balestier Plaza, Singapore 329802
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-[10px] uppercase tracking-widest text-[#d4af37] mb-0.5">
                            Hours
                          </h4>
                          <p className="text-white/60 text-[11px]">
                            11:30 AM - 2:30 PM
                          </p>
                          <p className="text-white/60 text-[11px]">
                            6:00 PM - 10:30 PM
                          </p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <button
                          type="button"
                          onClick={() => navigateMobile(0)}
                          className="bg-transparent border border-white/20 text-white/80 px-6 py-2 text-[9px] font-bold uppercase tracking-widest transition-all rounded cursor-pointer"
                        >
                          Back to Front
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Mobile Pages 1-16: Individual Pages
                    <div className="w-full h-full bg-[#FAF6EE] relative p-5 sm:p-8 flex flex-col overflow-y-auto">
                      <div className="absolute inset-3 border border-black/5 pointer-events-none rounded" />
                      {renderPage(mobilePageIndex)}

                      {/* Page footer */}
                      <div className="mt-auto pt-4 flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-black/40 border-t border-black/5">
                        <span>Tandoori Corner</span>
                        <span>
                          Page {mobilePageIndex} / {totalMobilePages - 2}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onMouseEnter={() => setIsHoveringNext(true)}
          onMouseLeave={() => setIsHoveringNext(false)}
          onClick={() =>
            isDesktop
              ? triggerFlip(spreadIndex + 1)
              : navigateMobile(mobilePageIndex + 1)
          }
          disabled={
            isDesktop
              ? spreadIndex === totalDesktopSpreads - 1
              : mobilePageIndex === totalMobilePages - 1
          }
          className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-black/40 border border-white/10 text-white transition-all hover:bg-primary hover:text-white hover:scale-105 disabled:opacity-20 disabled:hover:bg-black/40 disabled:hover:text-white disabled:hover:scale-100 cursor-pointer"
          aria-label="Next Page"
        >
          <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>
      </div>

      {/* Info indicator */}
      <div className="mt-6 flex flex-col items-center gap-2 text-white/50 text-[10px] sm:text-xs font-medium font-raleway text-center px-4">
        <div className="flex items-center gap-2 text-[#d4af37] font-bold uppercase tracking-wider text-[11px] mb-1">
          <MousePointerClick className="h-4 w-4 animate-bounce" />
          <span>Interactive 3D Booklet Active</span>
        </div>
        <span>
          Hover over previous/next arrows to lift page corners. Scroll or swipe
          over the book to turn pages.
        </span>
      </div>

      {/* Resting Chef Mascot in Bottom Right */}
      {!isChefSpecialVisible && (
        <motion.div
          layoutId="chef-mascot"
          onClick={() => jumpToSection("lunch")}
          className="absolute bottom-4 right-4 z-40 bg-[#1e1c1a] border border-[#d4af37]/40 px-3.5 py-2.5 rounded-full shadow-xl flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
          animate={{ y: [0, -4, 0] }}
          transition={{
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            layout: { type: "spring", stiffness: 120, damping: 14 },
          }}
        >
          <span className="text-base">👨‍🍳</span>
          <span className="text-[9px] font-bold text-[#d4af37] uppercase tracking-wider whitespace-nowrap">
            Chef Specials 👉
          </span>
        </motion.div>
      )}
    </div>
  );
}

// Internal BookPage Component containing page layout distributions
function BookPage({ pageNum, qtyByName, addToCart, updateQty }: BookPageProps) {
  const pageContent = useMemo(() => {
    switch (pageNum) {
      case 1:
        return {
          type: "intro",
          title: "Our Heritage Story",
          subtitle: "Established in Balestier",
          desc: "A Legacy of Authentic Clay Oven Magic",
        };

      // Breakfast (Pages 2, 3, 4)
      case 2:
        return {
          type: "items",
          title: "Breakfast Menu",
          subtitle: "Classic Morning Delights",
          items: menuCategories[0].items.slice(0, 6),
        };
      case 3:
        return {
          type: "items",
          title: "Breakfast Menu",
          subtitle: "Hearty Grills & Sandwiches",
          items: menuCategories[0].items.slice(6, 12),
        };
      case 4:
        return {
          type: "items",
          title: "Breakfast Menu",
          subtitle: "Sweet Pancakes & Sets",
          items: menuCategories[0].items.slice(12, 18),
        };

      // Lunch (Pages 5: Cover/Image, 6, 7, 8)
      case 5:
        return {
          type: "section-cover",
          title: "Tandoori Lunch",
          subtitle: "Mid-day Feast",
          image: "/granny/granny_specials_4.jpg",
          desc: "Savor our freshly baked naans and slow-cooked rich gravies, designed to recharge your afternoon.",
        };
      case 6:
        return {
          type: "items",
          title: "Lunch Menu",
          subtitle: "Chef Signatures",
          items: menuCategories[1].items.slice(0, 6),
        };
      case 7:
        return {
          type: "items",
          title: "Lunch Menu",
          subtitle: "Seafood & Classics",
          items: menuCategories[1].items.slice(6, 12),
        };
      case 8:
        return {
          type: "items",
          title: "Lunch Menu",
          subtitle: "Vegetarian Platters & Sweets",
          items: menuCategories[1].items.slice(12, 18),
        };

      // Dinner (Pages 9: Cover/Image, 10, 11, 12)
      case 9:
        return {
          type: "section-cover",
          title: "Clay Oven Dinner",
          subtitle: "Evening Charcoal Delights",
          image: "/granny/granny_specials_1.jpg",
          desc: "Charcoal-kissed kebabs, premium lamb shank curries, and hand-stretched tandoori breads, served hot from the pot.",
        };
      case 10:
        return {
          type: "items",
          title: "Dinner Menu",
          subtitle: "Tandoori Sizzlers",
          items: menuCategories[2].items.slice(0, 6),
        };
      case 11:
        return {
          type: "items",
          title: "Dinner Menu",
          subtitle: "Silken Curries",
          items: menuCategories[2].items.slice(6, 12),
        };
      case 12:
        return {
          type: "items",
          title: "Dinner Menu",
          subtitle: "Breads & Biryanis",
          items: menuCategories[2].items.slice(12, 18),
        };

      // Desserts (Pages 13, 14)
      case 13:
        return {
          type: "items",
          title: "Dessert Menu",
          subtitle: "Decadent Sweets",
          items: menuCategories[3].items.slice(0, 9),
        };
      case 14:
        return {
          type: "items",
          title: "Dessert Menu",
          subtitle: "Delicate Pastries & Cakes",
          items: menuCategories[3].items.slice(9, 18),
        };

      // Drinks (Pages 15, 16)
      case 15:
        return {
          type: "items",
          title: "Drinks Menu",
          subtitle: "Bar Specialties",
          items: menuCategories[4].items.slice(0, 9),
        };
      case 16:
        return {
          type: "items",
          title: "Drinks / Cocktails",
          subtitle: "TCB Bar Cocktails & Coffees",
          items: menuCategories[4].items.slice(9, 18),
        };

      default:
        return null;
    }
  }, [pageNum]);

  if (!pageContent) return null;

  if (pageContent.type === "intro") {
    return (
      <div className="flex-1 flex flex-col justify-between relative z-10 text-stone-850">
        <div>
          <span className="font-script text-primary text-xl md:text-2xl block mb-1">
            {pageContent.subtitle}
          </span>
          <h3 className="font-merriweather text-2xl lg:text-3xl font-black text-ink tracking-tight mb-6">
            {pageContent.title}
          </h3>
          <div className="w-10 h-[2px] bg-primary mb-6" />
        </div>

        <div className="my-auto space-y-4">
          <p className="font-raleway text-sm md:text-base leading-relaxed font-medium italic text-stone-600">
            &ldquo;{pageContent.desc}&rdquo;
          </p>
          <p className="font-raleway text-xs md:text-sm leading-relaxed text-stone-600">
            For over fifteen years, Tandoori Corner has stood at the crossroads
            of traditional preparation and modern refinement. Our master chefs
            prepare daily spices, kneading custom flour blends, and roasting
            meats in 400&deg;C traditional clay tandoor pits.
          </p>
          <p className="font-raleway text-xs md:text-sm leading-relaxed text-stone-600">
            Whether you are starting the day with our mini pizzas, recharging
            with a signature curry lunch, or booking our TCB Bar for a private
            night, we welcome you to our table.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative w-full h-32 rounded overflow-hidden shadow-inner bg-stone-100">
            <Image
              src="/granny/granny_background_2.jpg"
              alt="Kitchen Story"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover opacity-85 hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    );
  }

  if (pageContent.type === "section-cover") {
    return (
      <div className="flex-1 flex flex-col justify-between text-stone-850">
        <div>
          <span className="font-script text-primary text-xl md:text-2xl block mb-1">
            {pageContent.subtitle}
          </span>
          <h3 className="font-merriweather text-2xl lg:text-3xl font-black text-ink tracking-tight mb-4">
            {pageContent.title}
          </h3>
          <div className="w-10 h-[2px] bg-primary mb-4" />
        </div>

        <div className="my-auto relative w-full h-56 lg:h-64 rounded-lg overflow-hidden shadow-md bg-stone-100">
          {pageContent.image && (
            <Image
              src={pageContent.image}
              alt={pageContent.title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <p className="mt-4 font-raleway text-xs md:text-sm leading-relaxed text-stone-600">
          {pageContent.desc}
        </p>
      </div>
    );
  }

  // Items page rendering
  return (
    <div className="flex-1 flex flex-col text-stone-850">
      <div>
        <span className="font-script text-primary text-base md:text-lg block mb-0.5">
          {pageContent.subtitle}
        </span>
        <h3 className="font-merriweather text-xl lg:text-2xl font-bold text-ink tracking-tight mb-2">
          {pageContent.title}
        </h3>
        <div className="w-10 h-[1.5px] bg-primary mb-4" />
      </div>

      <div className="my-auto space-y-4 md:space-y-5">
        {pageContent.items?.map((item: ClassicDish, idx: number) => {
          const qty = qtyByName.get(item.name) ?? 0;
          const isChefSpecial = item.name === "Alder Grilled Seafood Paella";

          return (
            <div
              key={`${item.name}-${idx}`}
              className="group border-b border-black/5 pb-2.5 last:border-0 relative"
            >
              {isChefSpecial && (
                <div className="absolute -left-6 md:-left-8 top-1/2 -translate-y-1/2 z-40 pointer-events-none">
                  <motion.div
                    layoutId="chef-mascot"
                    className="flex items-center gap-1.5 bg-[#1e1c1a] text-[#d4af37] border border-[#d4af37]/40 px-2.5 py-1 rounded-full shadow-lg text-[9px] font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer pointer-events-auto"
                    animate={{ x: [0, -4, 0] }}
                    transition={{
                      x: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                      layout: { type: "spring", stiffness: 120, damping: 14 },
                    }}
                  >
                    <span className="text-sm">👉</span>
                    <span>Chef Specil: Must Try This!</span>
                  </motion.div>
                </div>
              )}
              <div className="flex justify-between items-baseline gap-2 mb-1">
                <span className="font-raleway text-xs md:text-sm font-bold text-ink truncate md:whitespace-normal group-hover:text-primary transition-colors">
                  {item.name}
                </span>

                {/* Visual dotted separator line */}
                <div className="flex-1 border-b border-dotted border-black/10 mx-2 self-end min-w-4" />

                <span className="font-raleway text-xs md:text-sm font-black text-primary shrink-0">
                  {item.price}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <p className="text-[10px] md:text-[11px] text-stone-500 font-medium italic leading-relaxed line-clamp-2 pr-2">
                  {item.desc}
                </p>

                {/* Inline Action Button / Counter */}
                <div className="shrink-0 pt-0.5">
                  {qty > 0 ? (
                    <div className="flex items-center gap-1.5 bg-white border border-stone-200 shadow-sm rounded-md px-1 py-0.5">
                      <button
                        type="button"
                        onClick={() => updateQty(item.name, -1)}
                        className="p-1 text-stone-500 hover:text-primary hover:bg-stone-50 transition-colors rounded cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-[10px] md:text-xs font-bold w-4 text-center text-ink">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.name, 1)}
                        className="p-1 text-stone-500 hover:text-primary hover:bg-stone-50 transition-colors rounded cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => addToCart(item.name, item.price)}
                      className="inline-flex items-center justify-center p-1 bg-ink text-white hover:bg-primary transition-colors rounded-md shadow-sm cursor-pointer"
                      aria-label="Add to cart"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
