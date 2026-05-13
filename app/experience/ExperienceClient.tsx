"use client";

import { GlassWaterIcon, Utensils } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ExperienceChoiceCard } from "@/components/experience/ExperienceChoiceCard";
import { ReservationForm } from "@/components/experience/ReservationForm";
import {
  experienceCards,
  tableReservationFields,
  tcbReservationFields,
} from "@/data/experience";

type ReservationMode = "none" | "table" | "tcb";

export function ExperienceClient() {
  const router = useRouter();
  const [reservationType, setReservationType] =
    useState<ReservationMode>("none");

  return (
    <div className="pt-32 pb-32 bg-cream min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-sans tracking-[0.3em] uppercase text-xs mb-4 block font-bold">
            Experience
          </span>
          <h1 className="font-space text-5xl md:text-6xl font-bold mb-6 text-ink">
            How would you like to
            <br />
            join us today?
          </h1>
          <p className="text-lg text-ink/60 font-light leading-relaxed max-w-2xl mx-auto">
            Choose to dine in with us at the alfresco or TCB bar, or order our
            authentic flavors directly to your home.
          </p>
        </div>

        {reservationType === "none" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experienceCards.map((card, index) => (
              <ExperienceChoiceCard
                key={card.id}
                card={card}
                index={index}
                onAction={() => {
                  if (card.id === "order") {
                    router.push("/menu");
                  } else {
                    setReservationType(card.id);
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-border bg-card p-8 md:p-12 relative"
          >
            <button
              type="button"
              onClick={() => setReservationType("none")}
              className="text-[10px] uppercase tracking-widest font-bold text-ink/50 hover:text-ink mb-8 flex items-center gap-2"
            >
              &larr; Back to Options
            </button>

            <div className="flex flex-col md:flex-row mb-12 gap-4 border-b border-border pb-4">
              <button
                type="button"
                onClick={() => setReservationType("table")}
                className={`flex-1 py-4 text-center text-xs uppercase tracking-widest font-bold transition-colors ${
                  reservationType === "table"
                    ? "text-brand-gold border-b-2 border-brand-gold"
                    : "text-ink/50 hover:text-ink"
                }`}
              >
                <Utensils className="w-4 h-4 inline-block mr-2" /> Book A Table
              </button>
              <button
                type="button"
                onClick={() => setReservationType("tcb")}
                className={`flex-1 py-4 text-center text-xs uppercase tracking-widest font-bold transition-colors ${
                  reservationType === "tcb"
                    ? "text-brand-gold border-b-2 border-brand-gold"
                    : "text-ink/50 hover:text-ink"
                }`}
              >
                <GlassWaterIcon className="w-4 h-4 inline-block mr-2" /> Book
                TCB for Event
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={reservationType}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {reservationType === "table" ? (
                  <ReservationForm
                    title="Reserve a Table"
                    description="Join us for lunch or dinner at our alfresco dining area or indoors."
                    fields={tableReservationFields}
                    submitText="Book Now"
                  />
                ) : (
                  <div className="space-y-6">
                    <ReservationForm
                      title="Private Event Inquiry"
                      description="Exclusive use of the TCB Bar for corporate events, parties, and celebrations."
                      fields={tcbReservationFields}
                      submitText="Send Inquiry"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
