"use client";

import { CalendarCheck, Minus, Plus, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/component/ui/button";
import { eventPackages } from "./site-data";

const timeSlots = ["12:00", "12:45", "18:00", "18:45", "19:30", "20:15"];

export function BookingWidget({ mode = "table" }: { mode?: "table" | "tcb" }) {
  const [guests, setGuests] = useState(mode === "tcb" ? 12 : 2);
  const [selectedTime, setSelectedTime] = useState(timeSlots[3]);
  const [packageId, setPackageId] = useState(eventPackages[0]?.id ?? "");

  const quote = useMemo(() => {
    if (mode === "table") {
      return guests >= 6 ? "Large table request" : "Instant table request";
    }

    const base = packageId === "celebration" ? 68 : 48;

    return packageId === "corporate"
      ? "Custom quote"
      : `Estimated from S$${base * guests}`;
  }, [guests, mode, packageId]);

  return (
    <form
      aria-label={mode === "tcb" ? "TCB booking enquiry" : "Table reservation"}
      className="rounded-card border border-white/12 bg-white/7 p-5 shadow-lifted backdrop-blur"
      id={mode === "tcb" ? "tcb-booking" : "reserve"}
    >
      <div className="flex items-start gap-3">
        <CalendarCheck aria-hidden="true" className="mt-1 size-5 text-brand" />
        <div>
          <h2 className="font-serif text-3xl text-white">
            {mode === "tcb" ? "Plan your TCB night" : "Reserve your table"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Guest checkout first. Provider connection can sit behind this
            adapter for live confirmation and deposits.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-white">
          Date
          <input
            className="h-12 rounded-card border border-white/12 bg-madison px-4 text-white outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
            name="date"
            required
            type="date"
          />
        </label>
        <div className="grid gap-2 text-sm font-bold text-white">
          Time
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.slice(0, mode === "tcb" ? 6 : 4).map((time) => (
              <button
                aria-pressed={selectedTime === time}
                className={`h-12 rounded-card border text-sm font-bold transition ${
                  selectedTime === time
                    ? "border-brand bg-brand text-madison"
                    : "border-white/12 bg-madison text-white hover:border-brand"
                }`}
                key={time}
                onClick={() => setSelectedTime(time)}
                type="button"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="grid gap-2 text-sm font-bold text-white">
          Guests
          <div className="flex h-12 items-center justify-between rounded-card border border-white/12 bg-madison px-2">
            <button
              aria-label="Reduce guest count"
              className="inline-flex size-9 items-center justify-center rounded-card text-white hover:bg-white/10"
              onClick={() => setGuests((current) => Math.max(1, current - 1))}
              type="button"
            >
              <Minus aria-hidden="true" className="size-4" />
            </button>
            <span className="font-serif text-2xl text-white">{guests}</span>
            <button
              aria-label="Increase guest count"
              className="inline-flex size-9 items-center justify-center rounded-card text-white hover:bg-white/10"
              onClick={() => setGuests((current) => Math.min(80, current + 1))}
              type="button"
            >
              <Plus aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
        <label className="grid gap-2 text-sm font-bold text-white">
          Contact
          <input
            className="h-12 rounded-card border border-white/12 bg-madison px-4 text-white outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/30"
            name="contact"
            placeholder="Phone or email"
            required
            type="text"
          />
        </label>
      </div>

      {mode === "tcb" ? (
        <fieldset className="mt-5 grid gap-3">
          <legend className="text-sm font-bold text-white">Package</legend>
          <div className="grid gap-2">
            {eventPackages.map((eventPackage) => (
              <label
                className="flex cursor-pointer items-start gap-3 rounded-card border border-white/10 bg-madison p-3 text-sm text-muted transition hover:border-brand"
                key={eventPackage.id}
              >
                <input
                  checked={packageId === eventPackage.id}
                  className="mt-1 accent-brand"
                  name="package"
                  onChange={() => setPackageId(eventPackage.id)}
                  type="radio"
                  value={eventPackage.id}
                />
                <span>
                  <strong className="block text-white">
                    {eventPackage.name}
                  </strong>
                  {eventPackage.capacity} · {eventPackage.price}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className="mt-5 rounded-card border border-brand/30 bg-brand/10 p-4">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-brand">
          {selectedTime} · {quote}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">
          Live provider integration will confirm availability. This form is
          structured for calendar APIs and Apple Pay / Google Pay deposits.
        </p>
      </div>

      <Button
        className="mt-5 w-full"
        data-gtm-event={mode === "tcb" ? "tcb_quote_start" : "booking_start"}
        type="submit"
        variant="gold"
      >
        <Send aria-hidden="true" />
        {mode === "tcb" ? "Request Estimated Quote" : "Confirm Request"}
      </Button>
    </form>
  );
}
