"use client";

import { Calendar, Clock, Mail, Phone, Send, Users } from "lucide-react";
import { motion } from "motion/react";
import type { FormEvent } from "react";
import { useState } from "react";

export function ReservationsPage() {
  const [bookingType, setBookingType] = useState<"Standard" | "Private">(
    "Standard",
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Reservation request submitted successfully.");
  };

  return (
    <div className="min-h-screen bg-cream px-4 pt-32 pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <span className="mb-4 block font-semibold text-brand text-sm uppercase tracking-[0.2em]">
            Plan Your Visit
          </span>
          <h1 className="font-serif text-4xl text-ink md:text-5xl">
            Book a Table or Event
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink/60">
            Whether it is an intimate dinner or a celebration, we look forward
            to hosting you at Tandoori Corner.
          </p>
        </div>

        <div className="mb-10 flex justify-center">
          <div className="flex rounded-full border border-ink/10 bg-white p-1 shadow-sm">
            <button
              className={`rounded-full px-8 py-3 font-semibold text-sm transition-all ${
                bookingType === "Standard"
                  ? "bg-brand text-white shadow-md"
                  : "text-ink/60 hover:text-ink"
              }`}
              onClick={() => setBookingType("Standard")}
              type="button"
            >
              Standard Reservation
            </button>
            <button
              className={`rounded-full px-8 py-3 font-semibold text-sm transition-all ${
                bookingType === "Private"
                  ? "bg-brand text-white shadow-md"
                  : "text-ink/60 hover:text-ink"
              }`}
              onClick={() => setBookingType("Private")}
              type="button"
            >
              Private Event
            </button>
          </div>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="rounded-card border border-black/5 bg-white p-8 shadow-card md:p-14"
          initial={{ opacity: 0, y: 10 }}
          key={bookingType}
        >
          <form
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
            onSubmit={handleSubmit}
          >
            <div className="space-y-2 md:col-span-2">
              <label
                className="font-semibold text-ink/80 text-sm uppercase tracking-wide"
                htmlFor="full-name"
              >
                Full Name
              </label>
              <input
                className="w-full rounded-xl border-none bg-cream px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-brand"
                id="full-name"
                placeholder="John Doe"
                required
                type="text"
              />
            </div>

            <div className="space-y-2">
              <label
                className="flex items-center gap-2 font-semibold text-ink/80 text-sm uppercase tracking-wide"
                htmlFor="email"
              >
                <Mail size={16} /> Email Address
              </label>
              <input
                className="w-full rounded-xl border-none bg-cream px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-brand"
                id="email"
                placeholder="john@example.com"
                required
                type="email"
              />
            </div>

            <div className="space-y-2">
              <label
                className="flex items-center gap-2 font-semibold text-ink/80 text-sm uppercase tracking-wide"
                htmlFor="phone"
              >
                <Phone size={16} /> Phone Number
              </label>
              <input
                className="w-full rounded-xl border-none bg-cream px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-brand"
                id="phone"
                placeholder="+65 8123 4567"
                required
                type="tel"
              />
            </div>

            <div className="space-y-2">
              <label
                className="flex items-center gap-2 font-semibold text-ink/80 text-sm uppercase tracking-wide"
                htmlFor="booking-date"
              >
                <Calendar size={16} /> Date
              </label>
              <input
                className="w-full rounded-xl border-none bg-cream px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-brand"
                id="booking-date"
                required
                type="date"
              />
            </div>

            <div className="space-y-2">
              <label
                className="flex items-center gap-2 font-semibold text-ink/80 text-sm uppercase tracking-wide"
                htmlFor="booking-time"
              >
                <Clock size={16} />{" "}
                {bookingType === "Standard" ? "Time" : "Start Time"}
              </label>
              <select
                className="w-full rounded-xl border-none bg-cream px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-brand"
                id="booking-time"
              >
                <option>18:00</option>
                <option>18:30</option>
                <option>19:00</option>
                <option>19:30</option>
                <option>20:00</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                className="flex items-center gap-2 font-semibold text-ink/80 text-sm uppercase tracking-wide"
                htmlFor="guests"
              >
                <Users size={16} />{" "}
                {bookingType === "Standard"
                  ? "Number of Guests"
                  : "Expected Guests"}
              </label>
              {bookingType === "Standard" ? (
                <select
                  className="w-full rounded-xl border-none bg-cream px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-brand"
                  id="guests"
                >
                  <option>2 People</option>
                  <option>3 People</option>
                  <option>4 People</option>
                  <option>5 People</option>
                  <option>6 People</option>
                  <option>7 People</option>
                  <option>8 People</option>
                </select>
              ) : (
                <input
                  className="w-full rounded-xl border-none bg-cream px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-brand"
                  id="guests"
                  min="10"
                  placeholder="e.g. 20"
                  required
                  type="number"
                />
              )}
            </div>

            {bookingType === "Private" ? (
              <div className="space-y-2">
                <label
                  className="flex items-center gap-2 font-semibold text-ink/80 text-sm uppercase tracking-wide"
                  htmlFor="event-type"
                >
                  Event Type
                </label>
                <select
                  className="w-full rounded-xl border-none bg-cream px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-brand"
                  id="event-type"
                >
                  <option>Corporate Dinner</option>
                  <option>Birthday Party</option>
                  <option>Wedding Reception</option>
                  <option>Other Gathering</option>
                </select>
              </div>
            ) : null}

            <div className="space-y-2 md:col-span-2">
              <label
                className="font-semibold text-ink/80 text-sm uppercase tracking-wide"
                htmlFor="requests"
              >
                Special Requests / Dietary Requirements
              </label>
              <textarea
                className="w-full rounded-xl border-none bg-cream px-4 py-3 text-ink outline-none placeholder:text-ink/40 focus:ring-2 focus:ring-brand"
                id="requests"
                placeholder="Let us know how we can make your experience perfect."
                rows={4}
              />
            </div>

            <div className="mt-6 md:col-span-2">
              <button
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-brand py-4 font-bold text-white uppercase tracking-wide shadow-brand/30 shadow-lg transition-colors hover:bg-tandoori-dark"
                type="submit"
              >
                <Send size={18} />{" "}
                {bookingType === "Standard"
                  ? "Request Reservation"
                  : "Request Private Booking"}
              </button>
              <p className="mt-4 text-center text-ink/40 text-xs">
                We will contact you shortly to confirm your{" "}
                {bookingType.toLowerCase()} reservation.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
