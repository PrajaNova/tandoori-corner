"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { reservationContent } from "@/content/reservation";
import { contact } from "@/lib/seo";

const selectClass =
  "flex h-12 w-full rounded-none border border-input bg-transparent px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-muted-foreground";

export function Reservation() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const today = new Date().toISOString().slice(0, 10);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    setError(null);

    const data = new FormData(form);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000"}/api/bookings`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          partySize: Number(data.get("partySize")),
          date: data.get("reservationDate"),
          time: data.get("reservationTime"),
          notes: data.get("specialRequest"),
        }),
      },
    );

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.message ?? "We could not send your booking request.");
      setStatus("idle");
      return;
    }

    form.reset();
    setStatus("sent");
  }

  return (
    <section
      id="reservation"
      className="py-24 bg-background flex items-center justify-center scroll-mt-24"
    >
      <div className="container px-4">
        <SectionHeading
          cursiveText={reservationContent.cursiveText}
          mainText={reservationContent.mainText}
        />

        <div className="bg-card border border-border p-8 md:p-14 max-w-4xl mx-auto shadow-xl mt-12 motion-reveal motion-reveal-late">
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {reservationContent.description}
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            <select
              aria-label="Party size"
              className={selectClass}
              defaultValue="4"
              name="partySize"
              required
            >
              {reservationContent.peopleOptions.map((option) => {
                const value = Number.parseInt(option, 10);
                return (
                  <option key={option} value={value}>
                    {option}
                  </option>
                );
              })}
            </select>
            <Input
              aria-label="Reservation date"
              className="h-12 rounded-none bg-transparent"
              defaultValue={today}
              min={today}
              name="reservationDate"
              required
              type="date"
            />
            <select
              aria-label="Reservation time"
              className={selectClass}
              defaultValue="20:00"
              name="reservationTime"
              required
            >
              {reservationContent.timeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <Input
              autoComplete="name"
              required
              name="name"
              type="text"
              placeholder="Your name…"
              className="h-12 rounded-none bg-transparent"
            />
            <Input
              autoComplete="email"
              inputMode="email"
              name="email"
              required
              spellCheck={false}
              type="email"
              placeholder="Email…"
              className="h-12 rounded-none bg-transparent"
            />
            <Input
              autoComplete="tel"
              inputMode="tel"
              name="phone"
              required
              type="tel"
              placeholder="Phone number…"
              className="h-12 rounded-none bg-transparent"
            />

            <div className="md:col-span-3">
              <Input
                autoComplete="off"
                name="specialRequest"
                type="text"
                placeholder="Add a special request…"
                className="h-12 rounded-none bg-transparent"
              />
            </div>

            <div className="md:col-span-3 mt-2">
              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="w-full bg-ink text-white hover:bg-primary rounded-none h-14 text-xs tracking-widest uppercase font-bold"
              >
                {status === "submitting" ? "Sending…" : "Find Table"}
              </Button>
            </div>

            {error ? (
              <p className="md:col-span-3 text-center text-sm text-red-600">
                {error}
              </p>
            ) : null}

            {status === "sent" ? (
              <p className="md:col-span-3 text-center text-sm text-leaf">
                Booking request received. We will confirm your table shortly.
              </p>
            ) : null}
          </form>

          <p className="text-center text-[11px] tracking-widest uppercase text-muted-foreground mt-8 font-bold flex items-center justify-center gap-1.5">
            <span>Or</span>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:text-[#128C7E] hover:underline flex items-center gap-1.5 text-[13px] tracking-wide font-extrabold transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current" />
              WhatsApp Us
            </a>
            <span>for booking enquiries</span>
          </p>
        </div>
      </div>
    </section>
  );
}
