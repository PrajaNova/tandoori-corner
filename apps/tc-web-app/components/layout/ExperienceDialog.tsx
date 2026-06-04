"use client";

import { CalendarDays, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface ExperienceDialogProps {
  open: boolean;
  onClose: () => void;
}

const options = [
  {
    href: "/menu",
    label: "Order Now",
    description: "Browse the menu for dine-in, takeaway or home delivery.",
    icon: ShoppingBag,
  },
  {
    href: "/experience",
    label: "Book a Table",
    description: "Reserve the pet-friendly alfresco balcony or the TCB Bar.",
    icon: CalendarDays,
  },
];

export function ExperienceDialog({ open, onClose }: ExperienceDialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="experience-dialog-title"
        className="relative w-full max-w-md border border-border bg-background p-7 shadow-2xl sm:p-9"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-ink/40 transition-colors hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>

        <span className="text-brand-gold font-sans text-[10px] font-bold uppercase tracking-[0.3em]">
          Experience
        </span>
        <h2
          id="experience-dialog-title"
          className="mt-2 font-space text-2xl font-bold text-ink sm:text-3xl"
        >
          How would you like to join us?
        </h2>

        <div className="mt-7 flex flex-col gap-4">
          {options.map((option) => {
            const Icon = option.icon;

            return (
              <Link
                key={option.href}
                href={option.href}
                onClick={onClose}
                className="group flex items-start gap-4 border border-border bg-card p-5 transition-colors hover:border-brand-gold"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold transition-colors group-hover:bg-brand-gold group-hover:text-brand-dark">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="font-space text-base font-bold text-ink">
                    {option.label}
                  </span>
                  <span className="text-sm font-light leading-relaxed text-ink/60">
                    {option.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
