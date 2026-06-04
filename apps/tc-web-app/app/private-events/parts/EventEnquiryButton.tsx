"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { EventEnquiryDialog } from "./EventEnquiryDialog";

type EventEnquiryButtonProps = {
  label?: string;
  className?: string;
};

export function EventEnquiryButton({
  label = "Enquire to Book",
  className,
}: EventEnquiryButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          "inline-flex items-center justify-center gap-2 bg-brand-gold px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-brand-dark transition-colors hover:bg-brand-dark hover:text-cream"
        }
      >
        {label}
      </button>

      <AnimatePresence>
        {open ? <EventEnquiryDialog onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}
