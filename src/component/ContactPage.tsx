import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
} from "lucide-react";
import Image from "next/image";
import { ActionFooter } from "@/component/ActionFooter";
import { AppHeader } from "@/component/AppHeader";
import { Button } from "@/component/ui/button";

const enquiryTypes = [
  "Table reservation",
  "TCB private event",
  "Catering",
  "Delivery question",
  "General question",
];

export function ContactPage() {
  return (
    <main className="min-h-screen bg-section text-madison">
      <AppHeader />

      <section className="relative isolate overflow-hidden bg-madison px-6 pb-16 pt-48 text-white sm:px-10 lg:px-12">
        <Image
          alt="Tandoori Corner Balestier Plaza location"
          className="-z-20 object-cover opacity-40"
          fill
          priority
          src="/tandoori-hero.jpg"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-madison via-madison/85 to-madison/35" />
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-curry">
            Find us & connect
          </p>
          <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-tight text-white md:text-7xl">
            Big information. Zero arrival anxiety.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
            Directions, hours, parking, WhatsApp, and enquiry paths designed for
            diners who want a clear answer before they leave home.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-12 sm:px-10 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <article className="rounded-card border border-line p-6 shadow-card">
            <MapPin aria-hidden="true" className="size-7 text-brand" />
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-muted">
              Address
            </p>
            <h2 className="mt-2 font-serif text-3xl">
              400 Balestier Road #01-12
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Balestier Plaza, Singapore 329802
            </p>
          </article>
          <article className="rounded-card border border-line p-6 shadow-card">
            <Phone aria-hidden="true" className="size-7 text-brand" />
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-muted">
              Instant contact
            </p>
            <h2 className="mt-2 font-serif text-3xl">65-6250-0200</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              WhatsApp: 65-9862-7334
            </p>
          </article>
          <article className="rounded-card border border-line bg-madison p-6 text-white shadow-card">
            <Clock aria-hidden="true" className="size-7 text-curry" />
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-curry">
              Hours
            </p>
            <h2 className="mt-2 font-serif text-3xl text-white">
              Lunch + Dinner
            </h2>
            <p className="mt-3 rounded-card bg-brand px-3 py-2 text-sm font-bold text-white">
              Closed between 2:45 PM and 6:00 PM
            </p>
          </article>
        </div>
      </section>

      <section className="bg-cream px-6 py-16 sm:px-10 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
              Big info logistics
            </p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">
              Know exactly when to arrive.
            </h2>
            <div className="mt-8 overflow-hidden rounded-card border border-line bg-white shadow-card">
              <div className="grid grid-cols-2 border-b border-line bg-section px-5 py-3 text-sm font-bold uppercase tracking-[0.1em] text-muted">
                <span>Service</span>
                <span>Time</span>
              </div>
              {[
                ["Lunch", "12:00 PM - 2:45 PM"],
                ["Break", "Closed 2:45 PM - 6:00 PM"],
                ["Dinner", "6:00 PM - 9:45 PM"],
              ].map(([label, time]) => (
                <div
                  className="grid grid-cols-2 border-b border-line px-5 py-4 last:border-b-0"
                  key={label}
                >
                  <span className="font-serif text-xl">{label}</span>
                  <span className="font-semibold text-muted">{time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {[
              {
                title: "How to find the hidden gem",
                copy: "Look for the outside corner unit at Balestier Plaza. The alfresco balcony faces Balestier Road, so follow the road-facing frontage rather than walking deep inside first.",
              },
              {
                title: "MRT and arrival",
                copy: "Plan for roughly 5 minutes by ride from Boon Keng MRT, or arrive directly by taxi/private hire at Balestier Plaza.",
              },
              {
                title: "Parking",
                copy: "Ample, stress-free parking is available at Balestier Plaza, useful for families, groups, and TCB private events.",
              },
            ].map((item) => (
              <article
                className="rounded-card bg-white p-5 shadow-card"
                key={item.title}
              >
                <Navigation aria-hidden="true" className="size-5 text-brand" />
                <h3 className="mt-3 font-serif text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-10 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-card border border-line shadow-card">
            <iframe
              aria-label="Google Map to Tandoori Corner"
              className="h-[32rem] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=400%20Balestier%20Road%20%2301-12%20Balestier%20Plaza%2C%20Singapore%20329802&output=embed"
              title="Tandoori Corner Google Map"
            />
          </div>
          <div className="relative min-h-[32rem] overflow-hidden rounded-card bg-madison shadow-card">
            <Image
              alt="Tandoori Corner storefront and alfresco entrance"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              src="/tandoori-hero.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-curry">
                POV guide placeholder
              </p>
              <h2 className="mt-3 font-serif text-3xl text-white">
                Add storefront video here.
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/72">
                This block is ready for a short entrance video or photo walk-up
                so first-time guests know exactly what to look for at night.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-madison px-6 py-16 text-white sm:px-10 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr]">
          <form className="rounded-card border border-white/10 bg-white/6 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-curry">
              Send an enquiry
            </p>
            <h2 className="mt-4 font-serif text-4xl text-white">
              Catering, TCB, reservations, or questions.
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <input
                className="h-12 rounded-card border border-white/15 bg-white px-4 text-sm text-madison outline-none focus:ring-2 focus:ring-curry"
                placeholder="Name"
              />
              <input
                className="h-12 rounded-card border border-white/15 bg-white px-4 text-sm text-madison outline-none focus:ring-2 focus:ring-curry"
                placeholder="Email"
                type="email"
              />
              <input
                className="h-12 rounded-card border border-white/15 bg-white px-4 text-sm text-madison outline-none focus:ring-2 focus:ring-curry"
                placeholder="Phone"
              />
              <select
                aria-label="Enquiry type"
                className="h-12 rounded-card border border-white/15 bg-white px-4 text-sm text-madison outline-none focus:ring-2 focus:ring-curry"
              >
                {enquiryTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>
            <textarea
              className="mt-4 min-h-32 w-full rounded-card border border-white/15 bg-white px-4 py-3 text-sm text-madison outline-none focus:ring-2 focus:ring-curry"
              placeholder="Message"
            />
            <Button className="mt-5" type="submit" variant="gold">
              <Send aria-hidden="true" />
              Send enquiry
            </Button>
          </form>

          <aside className="rounded-card border border-white/10 bg-white/6 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-curry">
              Preferred in Singapore
            </p>
            <h2 className="mt-4 font-serif text-4xl text-white">
              Skip the cold call. Message us.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/72">
              WhatsApp is the fastest path for high-intent questions about
              tonight's table, takeaway, catering, or private TCB bookings.
            </p>
            <div className="mt-7 grid gap-3">
              <Button asChild variant="secondary">
                <a
                  href="https://wa.me/6598627334"
                  rel="noreferrer"
                  target="_blank"
                >
                  <MessageCircle aria-hidden="true" />
                  Message us on WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="tel:+6562500200">
                  <Phone aria-hidden="true" />
                  Call 65-6250-0200
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="mailto:tandooricorner@singnet.com.sg">
                  <Mail aria-hidden="true" />
                  Email Tandoori Corner
                </a>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <ActionFooter />
    </main>
  );
}
