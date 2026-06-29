"use client";

import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { FormField } from "@/components/common/forms/FormField";
import { trackConversion } from "@/lib/analytics";
import { fade, scaleIn } from "@/lib/motion";
import { contact } from "@/lib/seo";

type EventEnquiryDialogProps = {
  onClose: () => void;
};

const inputClassName =
  "w-full border-b border-border bg-transparent pb-2 text-ink placeholder:text-ink/30 focus:border-brand-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/30";

const eventTypeOptions = [
  "Corporate Gathering",
  "Birthday / Milestone",
  "Engagement / Celebration",
  "Other",
];

export function EventEnquiryDialog({ onClose }: EventEnquiryDialogProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setError(null);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000"}/api/event-enquiries`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          eventType: data.get("eventType"),
          guests: Number(data.get("guests")),
          date: data.get("date") || undefined,
          notes: data.get("notes"),
        }),
      },
    );

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.message ?? "We could not send your enquiry.");
      setStatus("idle");
      return;
    }

    form.reset();
    trackConversion("event_enquiry_submitted", {
      form_type: "event_space",
      event_type: String(data.get("eventType") ?? ""),
      guest_count: Number(data.get("guests")),
    });
    setStatus("sent");
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <motion.div
        {...fade}
        onClick={onClose}
        className="absolute inset-0 bg-cream/95 backdrop-blur-md"
      />

      <motion.div
        {...scaleIn}
        aria-modal="true"
        className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-none border border-border bg-cream shadow-2xl"
        role="dialog"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-cream/70 p-2 text-ink backdrop-blur-md transition-colors hover:text-brand-gold"
          aria-label="Close enquiry form"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "sent" ? (
          <div className="flex flex-col items-center gap-4 px-8 py-12 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="font-kaushan text-3xl text-ink">Almost there!</h3>
            <p className="max-w-sm text-sm font-light leading-relaxed text-ink/60">
              We received your enquiry. Our events team will reply within one
              business day to plan your night. Prefer to talk? Call us at{" "}
              <a
                href={contact.phoneHref}
                className="font-semibold text-brand-gold"
              >
                {contact.phoneDisplay}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={onClose}
              className="text-[11px] font-bold uppercase tracking-widest text-ink/40 hover:text-ink"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="flex flex-col overflow-y-auto">
            <div className="border-b border-border bg-brand-dark px-7 py-6 text-cream">
              <p className="font-script text-2xl text-brand-gold leading-none">
                Book the TCB Bar
              </p>
              <h3 className="mt-1 font-kaushan text-3xl">
                Private Event Enquiry
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 px-7 py-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField label="Full Name" htmlFor="name" required>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    type="text"
                    required
                    placeholder="Priya Sharma"
                    className={inputClassName}
                  />
                </FormField>
                <FormField label="Phone" htmlFor="phone" required>
                  <input
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    type="tel"
                    required
                    placeholder="+65 9XXX XXXX"
                    className={inputClassName}
                  />
                </FormField>
                <FormField label="Email" htmlFor="email" required>
                  <input
                    id="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    spellCheck={false}
                    type="email"
                    required
                    placeholder="you@email.com"
                    className={inputClassName}
                  />
                </FormField>
                <FormField label="Event Type" htmlFor="eventType" required>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    className={inputClassName}
                  >
                    {eventTypeOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Guests" htmlFor="guests" required>
                  <input
                    id="guests"
                    name="guests"
                    inputMode="numeric"
                    type="number"
                    min={1}
                    required
                    placeholder="30"
                    className={inputClassName}
                  />
                </FormField>
                <FormField label="Preferred Date" htmlFor="date">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className={inputClassName}
                  />
                </FormField>
                <div className="sm:col-span-2">
                  <FormField label="Notes / Vision" htmlFor="notes">
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      placeholder="Occasion, theme, dietary needs, budget…"
                      className={`${inputClassName} resize-none`}
                    />
                  </FormField>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-brand-gold px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-brand-dark transition-colors hover:bg-brand-dark hover:text-cream"
              >
                {status === "submitting" ? "Sending…" : "Submit Enquiry"}
              </button>
              {error ? (
                <p className="text-center text-sm text-red-600">{error}</p>
              ) : null}
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
