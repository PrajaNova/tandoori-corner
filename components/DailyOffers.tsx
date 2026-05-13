"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { OfferCardItem } from "@/data/types";

export interface DailyOffersProps {
  offers: OfferCardItem[];
}

export function DailyOffers({ offers }: DailyOffersProps) {
  const router = useRouter();
  const [selectedOffer, setSelectedOffer] = useState<OfferCardItem | null>(
    null,
  );
  const goToOfferAction = (actionType: OfferCardItem["actionType"]) => {
    router.push(actionType === "menu" ? "/menu" : "/experience");
  };

  return (
    <>
      <section className="bg-gradient-to-br from-tandoori-dark via-primary to-tandoori py-12 text-cream sm:py-18 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <span className="block font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[10px] sm:text-xs mb-3 sm:mb-4 opacity-80">
              Current Exclusives & Promos
            </span>
            <h2 className="font-space text-3xl sm:text-4xl md:text-5xl font-bold">
              Daily Offers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
            {offers.map((offer, idx) => (
              <Card
                key={idx}
                onClick={() => setSelectedOffer(offer)}
                className="group relative h-56 cursor-pointer overflow-hidden border border-primary/35 bg-cream shadow-card sm:h-80 md:h-[450px]"
              >
                <Image
                  fill
                  src={offer.image}
                  alt={offer.title}
                  className="absolute inset-0 w-full h-full object-cover saturate-110 contrast-105 transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-primary/10 to-cream/95 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/75 to-transparent transition-opacity duration-500 group-hover:via-cream/60"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/18 via-transparent to-sage/10 mix-blend-multiply"></div>

                <Badge
                  className={`absolute top-4 right-4 z-10 rounded-none text-[8px] shadow-lg transition-transform duration-300 group-hover:-translate-y-1 sm:text-[9px] md:top-6 md:right-6 ${offer.badgeColor}`}
                >
                  {offer.badge}
                </Badge>

                <div className="absolute inset-0 p-5 sm:p-6 md:p-8 flex flex-col justify-end z-10 transition-transform duration-500 sm:translate-y-10 sm:group-hover:translate-y-0">
                  <h3 className="font-space text-2xl sm:text-3xl font-bold mb-1 text-ink">
                    {offer.title}
                  </h3>
                  <p className="text-brand-gold font-bold text-xl sm:text-2xl mb-0 sm:mb-4">
                    {offer.value}
                  </p>

                  <div className="hidden sm:block overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100">
                    <ul className="space-y-3 text-ink/70 text-sm mb-6">
                      {offer.points.slice(0, 2).map((point, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <span className="text-brand-gold text-lg leading-none">
                            ✓
                          </span>{" "}
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToOfferAction(offer.actionType);
                      }}
                      className={`w-full px-6 py-4 text-[10px] uppercase tracking-widest font-bold transition-colors shadow-xl ${
                        idx === 1
                          ? "bg-card text-brand-dark hover:bg-brand-gold"
                          : idx === 2
                            ? "bg-curry text-brand-dark hover:bg-brand-gold"
                            : "bg-brand-gold text-brand-dark hover:bg-cream"
                      }`}
                    >
                      {offer.actionLabel}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Modal */}
      <AnimatePresence>
        {selectedOffer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOffer(null)}
              className="absolute inset-0 bg-cream/90 backdrop-blur-md"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-cream border border-border shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row"
            >
              <div className="md:w-1/2 h-64 md:h-auto relative">
                <Image
                  fill
                  src={selectedOffer.image}
                  alt={selectedOffer.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/60 to-transparent md:bg-gradient-to-r"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/18 via-transparent to-sage/10 mix-blend-multiply"></div>
              </div>

              <div className="md:w-1/2 p-8 md:p-12 relative flex flex-col">
                <Button
                  onClick={() => setSelectedOffer(null)}
                  className="absolute top-4 right-4 text-ink/50 hover:text-ink"
                  size="icon"
                  variant="ghost"
                >
                  <X className="w-6 h-6" />
                </Button>

                <Badge
                  className={`mb-6 w-max rounded-none text-[9px] shadow-lg ${selectedOffer.badgeColor}`}
                >
                  {selectedOffer.badge}
                </Badge>

                <h3 className="font-space text-3xl font-bold mb-2 text-ink">
                  {selectedOffer.title}
                </h3>
                <p className="text-brand-gold font-bold text-2xl mb-8">
                  {selectedOffer.value}
                </p>

                <ul className="space-y-4 text-ink/70 text-sm mb-10 flex-1">
                  {selectedOffer.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-brand-gold text-lg leading-none mt-[-2px]">
                        ✓
                      </span>{" "}
                      {point}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => {
                    setSelectedOffer(null);
                    goToOfferAction(selectedOffer.actionType);
                  }}
                  className="w-full hover:bg-cream"
                >
                  {selectedOffer.actionLabel}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
