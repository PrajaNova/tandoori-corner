"use client";

import { Calendar, Clock, Mail, Phone, Send, Users } from "lucide-react";
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
          <p className="mb-4 font-semibold text-brand text-sm uppercase tracking-[0.2em]">
            Plan Your Visit
          </p>
          <h1 className="font-serif text-4xl text-ink md:text-5xl">
            Book a Table or Event
          </h1>
        </div>

        <div className="mb-10 flex justify-center">
          <div className="flex rounded-full border border-ink/10 bg-white p-1 shadow-sm">
            {(["Standard", "Private"] as const).map((type) => (
              <button
                className={`rounded-full px-6 py-3 font-semibold text-sm transition-colors ${
                  bookingType === type
                    ? "bg-brand text-white"
                    : "text-ink/60 hover:text-ink"
                }`}
                key={type}
                onClick={() => setBookingType(type)}
                type="button"
              >
                {type === "Standard" ? "Standard Reservation" : "Private Event"}
              </button>
            ))}
          </div>
        </div>

        <form
          className="grid grid-cols-1 gap-6 rounded-card border border-black/5 bg-white p-8 shadow-card md:grid-cols-2 md:p-12"
          onSubmit={handleSubmit}
        >
          <label className="space-y-2 md:col-span-2">
            <span className="font-semibold text-ink/80 text-sm uppercase tracking-wide">
              Full Name
            </span>
            <input
              className="w-full rounded-xl border-none bg-cream px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-brand"
              required
              type="text"
            />
          </label>

          <label className="space-y-2">
            <span className="flex items-center gap-2 font-semibold text-ink/80 text-sm uppercase tracking-wide">
              <Mail size={16} /> Email
            </span>
            <input
              className="w-full rounded-xl border-none bg-cream px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-brand"
              required
              type="email"
            />
          </label>

          <label className="space-y-2">
            <span className="flex items-center gap-2 font-semibold text-ink/80 text-sm uppercase tracking-wide">
              <Phone size={16} /> Phone
            </span>
            <input
              className="w-full rounded-xl border-none bg-cream px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-brand"
              required
              type="tel"
            />
          </label>

          <label className="space-y-2">
            <span className="flex items-center gap-2 font-semibold text-ink/80 text-sm uppercase tracking-wide">
              <Calendar size={16} /> Date
            </span>
            <input
              className="w-full rounded-xl border-none bg-cream px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-brand"
              required
              type="date"
            />
          </label>

          <label className="space-y-2">
            <span className="flex items-center gap-2 font-semibold text-ink/80 text-sm uppercase tracking-wide">
              <Clock size={16} /> Time
            </span>
            <select className="w-full rounded-xl border-none bg-cream px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-brand">
              <option>18:00</option>
              <option>18:30</option>
              <option>19:00</option>
              <option>19:30</option>
              <option>20:00</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="flex items-center gap-2 font-semibold text-ink/80 text-sm uppercase tracking-wide">
              <Users size={16} /> Guests
            </span>
            <input
              className="w-full rounded-xl border-none bg-cream px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-brand"
              min={bookingType === "Private" ? 10 : 1}
              required
              type="number"
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="font-semibold text-ink/80 text-sm uppercase tracking-wide">
              Special Requests
            </span>
            <textarea
              className="w-full rounded-xl border-none bg-cream px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-brand"
              rows={4}
            />
          </label>

          <button
            className="flex items-center justify-center gap-3 rounded-xl bg-brand py-4 font-bold text-white uppercase tracking-wide transition-colors hover:bg-tandoori-dark md:col-span-2"
            type="submit"
          >
            <Send size={18} /> Request Booking
          </button>
        </form>
      </div>
    </div>
  );
}
