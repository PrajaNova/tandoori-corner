"use client";

import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { FormField } from "@/components/common/forms/FormField";
import { fade, scaleIn } from "@/lib/motion";
import { contact } from "@/lib/seo";

type EventEnquiryDialogProps = {
  onClose: () => void;
};

const inputClassName =
  "w-full border-b border-border bg-transparent pb-2 text-ink placeholder:text-ink/30 focus:border-brand-gold focus:outline-none";

const eventTypeOptions = [
  "Corporate Gathering",
  "Birthday / Milestone",
  "Engagement / Celebration",
  "Other",
];

export function EventEnquiryDialog({ onClose }: EventEnquiryDialogProps) {
  const [submitted, setSubmitted] = useState(false);
  const [mailtoHref, setMailtoHref] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = String(data.get("name") ?? "");
    const phone = String(data.get("phone") ?? "");
    const email = String(data.get("email") ?? "");
    const eventType = String(data.get("eventType") ?? "");
    const guests = String(data.get("guests") ?? "");
    const date = String(data.get("date") ?? "");
    const notes = String(data.get("notes") ?? "");

    const bodyLines = [
      "Private event enquiry — TCB Bar",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Event type: ${eventType}`,
      `Guests: ${guests}`,
      `Preferred date: ${date}`,
      notes ? `Notes: ${notes}` : "",
    ].filter(Boolean);

    const subjectText = "Private Event Enquiry — TCB Bar";
    const href = `${contact.emailHref}?subject=${encodeURIComponent(
      subjectText,
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    setMailtoHref(href);
    setSubmitted(true);
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
        className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-card border border-border bg-cream shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-cream/70 p-2 text-ink backdrop-blur-md transition-colors hover:text-brand-gold"
          aria-label="Close enquiry form"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 px-8 py-12 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="font-space text-2xl font-bold text-ink">
              Almost there!
            </h3>
            <p className="max-w-sm text-sm font-light leading-relaxed text-ink/60">
              Tap the button below to send your enquiry — our events team will
              reply within one business day to plan your night. Prefer to talk?
              Call us at{" "}
              <a
                href={contact.phoneHref}
                className="font-semibold text-brand-gold"
              >
                {contact.phoneDisplay}
              </a>
              .
            </p>
            <a
              href={mailtoHref}
              className="mt-2 w-full bg-brand-gold px-6 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-brand-dark transition-colors hover:bg-brand-dark hover:text-cream"
            >
              Send Enquiry Email
            </a>
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
            <div className="border-b border-border bg-brand-dark px-7 py-5 text-cream">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                Book the TCB Bar
              </p>
              <h3 className="mt-1 font-space text-2xl font-bold">
                Private Event Enquiry
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 px-7 py-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField label="Full Name" htmlFor="name" required>
                  <input
                    id="name"
                    name="name"
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
                className="w-full bg-brand-gold px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-brand-dark transition-colors hover:bg-brand-dark hover:text-cream"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
