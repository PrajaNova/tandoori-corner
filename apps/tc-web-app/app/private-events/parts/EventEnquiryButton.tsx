"use client";

import { CalendarHeart } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { EventEnquiryDialog } from "./EventEnquiryDialog";

type EventEnquiryButtonProps = {
  label?: string;
  className?: string;
  /** Light style for use on dark/photographic backgrounds. */
  variant?: "solid" | "light";
};

const baseClass =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-none px-10 py-5 text-xs font-bold uppercase tracking-widest shadow-lg transition-all duration-300 hover:-translate-y-0.5";

const variantClass = {
  solid:
    "bg-primary text-white shadow-primary/30 hover:bg-ink hover:shadow-xl",
  light:
    "bg-white text-ink shadow-black/30 hover:bg-primary hover:text-white hover:shadow-xl",
} as const;

export function EventEnquiryButton({
  label = "Enquire to Book",
  className,
  variant = "solid",
}: EventEnquiryButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className ?? `${baseClass} ${variantClass[variant]}`}
      >
        {/* Sheen sweep on hover */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <CalendarHeart className="h-4 w-4 shrink-0" />
        {label}
      </button>

      <AnimatePresence>
        {open ? <EventEnquiryDialog onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}
