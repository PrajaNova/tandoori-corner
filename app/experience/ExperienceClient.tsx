"use client";

import {
  ArrowRight,
  CalendarDays,
  GlassWaterIcon,
  ShoppingBag,
  Utensils,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ExperienceClient() {
  const router = useRouter();
  const [reservationType, setReservationType] = useState<
    "none" | "table" | "tcb"
  >("none");

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
            {/* Order Now */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-border bg-cream hover:border-primary hover:bg-primary hover:text-primary-foreground transition-colors group cursor-pointer flex flex-col relative overflow-hidden min-h-[420px]"
              onClick={() => router.push("/menu")}
            >
              <Image
                fill
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80"
                alt="Delicious Food"
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/80 to-transparent"></div>

              <div className="relative z-10 p-10 flex flex-col h-full">
                <div className="w-16 h-16 bg-brand-gold/10 backdrop-blur-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-8 h-8 text-brand-gold" />
                </div>
                <h3 className="font-space text-3xl font-bold mb-4 text-ink group-hover:text-primary-foreground transition-colors">
                  Order Now
                </h3>
                <p className="text-ink/60 mb-8 font-light leading-relaxed flex-1 transition-colors group-hover:text-primary-foreground/80">
                  Browse our full digital menu. Add items to your cart and order
                  for takeaway or island-wide delivery.
                </p>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-ink border-b border-border pb-1 w-max group-hover:border-primary-foreground group-hover:text-primary-foreground mt-auto transition-colors">
                  View Menu & Order <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>

            {/* Reserve Now */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="border border-brand-gold/30 bg-cream hover:border-primary hover:bg-primary hover:text-primary-foreground transition-colors group cursor-pointer flex flex-col relative overflow-hidden min-h-[420px]"
              onClick={() => setReservationType("table")}
            >
              <Image
                fill
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80"
                alt="Restaurant Interior"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/80 to-cream/20"></div>

              <div className="relative z-10 p-10 flex flex-col h-full">
                <div className="w-16 h-16 bg-brand-gold shadow-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <CalendarDays className="w-8 h-8 text-brand-dark" />
                </div>
                <h3 className="font-space text-3xl font-bold mb-4 text-ink group-hover:text-primary-foreground transition-colors">
                  Reserve & Book
                </h3>
                <p className="text-ink/60 mb-8 font-light leading-relaxed flex-1 transition-colors group-hover:text-primary-foreground/80">
                  Book a table at our alfresco dining area, or reserve the TCB
                  Bar for a private corporate event or gathering.
                </p>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-brand-gold border-b border-brand-gold/30 pb-1 w-max group-hover:border-brand-gold mt-auto">
                  See Booking Options <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
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
                className={`flex-1 py-4 text-center text-xs uppercase tracking-widest font-bold transition-colors ${reservationType === "table" ? "text-brand-gold border-b-2 border-brand-gold" : "text-ink/50 hover:text-ink"}`}
              >
                <Utensils className="w-4 h-4 inline-block mr-2" /> Book A Table
              </button>
              <button
                type="button"
                onClick={() => setReservationType("tcb")}
                className={`flex-1 py-4 text-center text-xs uppercase tracking-widest font-bold transition-colors ${reservationType === "tcb" ? "text-brand-gold border-b-2 border-brand-gold" : "text-ink/50 hover:text-ink"}`}
              >
                <GlassWaterIcon className="w-4 h-4 inline-block mr-2" /> Book
                TCB for Event
              </button>
            </div>

            <AnimatePresence mode="wait">
              {reservationType === "table" ? (
                <motion.div
                  key="table"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h3 className="font-space text-3xl font-bold text-ink mb-2">
                    Reserve a Table
                  </h3>
                  <p className="text-ink/60 text-sm font-light mb-8">
                    Join us for lunch or dinner at our alfresco dining area or
                    indoors.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-ink/50 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        className="w-full bg-cream border border-border text-ink p-4 focus:outline-none focus:border-brand-gold [color-scheme:light]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-ink/50 mb-2">
                        Time
                      </label>
                      <input
                        type="time"
                        className="w-full bg-cream border border-border text-ink p-4 focus:outline-none focus:border-brand-gold [color-scheme:light]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-ink/50 mb-2">
                        Guests
                      </label>
                      <select className="w-full bg-cream border border-border text-ink p-4 focus:outline-none focus:border-brand-gold select-none">
                        <option>1 Person</option>
                        <option>2 People</option>
                        <option>3 People</option>
                        <option>4 People</option>
                        <option>5+ People</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-ink/50 mb-2">
                        Preference
                      </label>
                      <select className="w-full bg-cream border border-border text-ink p-4 focus:outline-none focus:border-brand-gold select-none">
                        <option>Alfresco (Pet Friendly)</option>
                        <option>Indoor Dining (TCB)</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full bg-brand-gold text-brand-dark px-10 py-5 text-xs uppercase tracking-widest font-bold hover:bg-brand-gold-muted mt-6 transition-colors"
                  >
                    Book Now
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="tcb"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h3 className="font-space text-3xl font-bold text-ink mb-2">
                    Private Event Inquiry
                  </h3>
                  <p className="text-ink/60 text-sm font-light mb-8">
                    Exclusive use of the TCB Bar for corporate events, parties,
                    and celebrations.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-ink/50 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-cream border border-border text-ink p-4 focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-ink/50 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full bg-cream border border-border text-ink p-4 focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-ink/50 mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        className="w-full bg-cream border border-border text-ink p-4 focus:outline-none focus:border-brand-gold [color-scheme:light]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-ink/50 mb-2">
                        Estimated Guests
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 30"
                        className="w-full bg-cream border border-border text-ink p-4 focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase tracking-widest text-ink/50 mb-2">
                        Additional Details
                      </label>
                      <textarea
                        placeholder="Tell us about the event..."
                        rows={4}
                        className="w-full bg-cream border border-border text-ink p-4 focus:outline-none focus:border-brand-gold"
                      ></textarea>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full bg-card text-brand-dark px-10 py-5 text-xs uppercase tracking-widest font-bold hover:bg-brand-gold mt-6 transition-colors"
                  >
                    Send Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
