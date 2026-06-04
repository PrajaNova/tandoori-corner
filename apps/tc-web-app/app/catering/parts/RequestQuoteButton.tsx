"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { QuoteRequestDialog, type QuoteSubject } from "./QuoteRequestDialog";

type RequestQuoteButtonProps = {
  subject: QuoteSubject;
  label?: string;
  className?: string;
};

export function RequestQuoteButton({
  subject,
  label = "Request a Quote",
  className,
}: RequestQuoteButtonProps) {
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
        {open ? (
          <QuoteRequestDialog
            subject={subject}
            onClose={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
