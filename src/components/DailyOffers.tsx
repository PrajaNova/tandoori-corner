import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export interface Offer {
  title: string;
  value: string;
  image: string;
  badge: string;
  badgeColor: string;
  points: string[];
  actionLabel: string;
  actionType: "experience" | "menu";
}

export function DailyOffers({
  navigate,
  offers,
}: {
  navigate: (page: string) => void;
  offers: Offer[];
}) {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  return (
    <>
      <section className="bg-brand-gold py-12 sm:py-18 md:py-24 text-brand-dark">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <span className="block font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[10px] sm:text-xs mb-3 sm:mb-4 opacity-80 text-brand-dark">
              Current Exclusives & Promos
            </span>
            <h2 className="font-space text-3xl sm:text-4xl md:text-5xl font-bold">
              Daily Offers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
            {offers.map((offer, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedOffer(offer)}
                className="relative h-56 sm:h-80 md:h-[450px] overflow-hidden group bg-brand-dark box-border cursor-pointer"
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent transition-opacity duration-500"></div>

                <div
                  className={`absolute top-4 right-4 md:top-6 md:right-6 ${offer.badgeColor} text-[8px] sm:text-[9px] uppercase tracking-widest font-bold px-2.5 sm:px-3 py-1 shadow-lg z-10 transition-transform duration-300 group-hover:-translate-y-1`}
                >
                  {offer.badge}
                </div>

                <div className="absolute inset-0 p-5 sm:p-6 md:p-8 flex flex-col justify-end z-10 transition-transform duration-500 sm:translate-y-10 sm:group-hover:translate-y-0">
                  <h3 className="font-space text-2xl sm:text-3xl font-bold mb-1 text-white">
                    {offer.title}
                  </h3>
                  <p className="text-brand-gold font-bold text-xl sm:text-2xl mb-0 sm:mb-4">
                    {offer.value}
                  </p>

                  <div className="hidden sm:block overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100">
                    <ul className="space-y-3 text-white/70 text-sm mb-6">
                      {offer.points.slice(0, 2).map((point, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <span className="text-brand-gold text-lg leading-none">
                            ✓
                          </span>{" "}
                          {point}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(offer.actionType);
                      }}
                      className={`w-full px-6 py-4 text-[10px] uppercase tracking-widest font-bold transition-colors shadow-xl ${
                        idx === 1
                          ? "bg-white text-brand-dark hover:bg-brand-gold"
                          : idx === 2
                            ? "bg-[#d48c37] text-white hover:bg-brand-gold hover:text-brand-dark"
                            : "bg-brand-gold text-brand-dark hover:bg-white"
                      }`}
                    >
                      {offer.actionLabel}
                    </button>
                  </div>
                </div>
              </div>
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
              className="absolute inset-0 bg-brand-dark/90 backdrop-blur-md"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-brand-dark border border-white/10 shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row"
            >
              <div className="md:w-1/2 h-64 md:h-auto relative">
                <img
                  src={selectedOffer.image}
                  alt={selectedOffer.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-dark to-transparent"></div>
              </div>

              <div className="md:w-1/2 p-8 md:p-12 relative flex flex-col">
                <button
                  type="button"
                  onClick={() => setSelectedOffer(null)}
                  className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div
                  className={`w-max mb-6 ${selectedOffer.badgeColor} text-[9px] uppercase tracking-widest font-bold px-3 py-1 shadow-lg`}
                >
                  {selectedOffer.badge}
                </div>

                <h3 className="font-space text-3xl font-bold mb-2 text-white">
                  {selectedOffer.title}
                </h3>
                <p className="text-brand-gold font-bold text-2xl mb-8">
                  {selectedOffer.value}
                </p>

                <ul className="space-y-4 text-white/70 text-sm mb-10 flex-1">
                  {selectedOffer.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-brand-gold text-lg leading-none mt-[-2px]">
                        ✓
                      </span>{" "}
                      {point}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedOffer(null);
                    navigate(selectedOffer.actionType);
                  }}
                  className="w-full bg-brand-gold text-brand-dark px-6 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-colors"
                >
                  {selectedOffer.actionLabel}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
