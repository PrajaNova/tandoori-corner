import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/SectionHeading";

const selectClass =
  "flex h-12 w-full rounded-none border border-input bg-transparent px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-muted-foreground";

const peopleOptions = [
  "2 People",
  "3 People",
  "4 People",
  "5 People",
  "6 People",
  "8 People",
  "10 People",
];
const dateOptions = [
  "March 23, 2017",
  "March 24, 2017",
  "March 25, 2017",
  "March 26, 2017",
  "March 27, 2017",
];
const timeOptions = ["8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM", "12:00 AM"];

export function GrannyReservation() {
  return (
    <section className="relative py-24 flex items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/granny/granny_background_7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="container relative z-10 px-4">
        <SectionHeading
          cursiveText="Book a table"
          mainText="Make A Reservation"
          dark
        />

        <div className="bg-white p-8 md:p-14 max-w-4xl mx-auto shadow-2xl mt-12">
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            You can Book a table online easily in just a couple of minutes. We
            take reservations for lunch and dinner, just check the availability
            of your table & book it now!
          </p>

          <form className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <select className={selectClass} defaultValue="4 People">
              {peopleOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <select className={selectClass} defaultValue="March 23, 2017">
              {dateOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <select className={selectClass} defaultValue="8:00 PM">
              {timeOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>

            <Input
              type="text"
              placeholder="Your Name"
              className="h-12 rounded-none bg-transparent"
            />
            <Input
              type="email"
              placeholder="Email"
              className="h-12 rounded-none bg-transparent"
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              className="h-12 rounded-none bg-transparent"
            />

            <div className="md:col-span-3">
              <Input
                type="text"
                placeholder="Add A Special Request (Optional)"
                className="h-12 rounded-none bg-transparent"
              />
            </div>

            <div className="md:col-span-3 mt-2">
              <Button
                type="button"
                size="lg"
                className="w-full bg-ink text-white hover:bg-primary rounded-none h-14 text-xs tracking-widest uppercase font-bold"
              >
                Find Table
              </Button>
            </div>
          </form>

          <p className="text-center text-[11px] tracking-widest uppercase text-muted-foreground mt-8 font-bold">
            Reservation Powered by{" "}
            <span className="text-primary">Opentable</span>
          </p>
        </div>
      </div>
    </section>
  );
}
