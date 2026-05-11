import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import Image from "next/image";
import { Button } from "@/component/ui/button";

const instagramImages = [
  "/dish-butter-chicken.jpg",
  "/dish-papri-chaat.jpg",
  "/dish-palak-paneer.jpg",
  "/dish-veg-biryani.jpg",
  "/dish-mango-lassi.jpg",
  "/dish-gulab-jamun.jpg",
];

const faqs = [
  {
    question: "Where is the nearest MRT?",
    answer:
      "Novena MRT is the practical nearby station, with Balestier Plaza a short ride away by bus, taxi, or private hire.",
  },
  {
    question: "Is alfresco dining pet friendly?",
    answer:
      "Yes. Tandoori Corner highlights its Balestier alfresco dining as pet friendly.",
  },
  {
    question: "Can I book TCB for a private event?",
    answer:
      "Yes. TCB is the indoor bar and private dining option for gatherings, dates, and celebrations.",
  },
];

export function ActionFooter() {
  return (
    <footer id="contact" className="bg-madison text-white">
      <div id="reserve" />
      <div id="order" />
      <div id="events" />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr_0.95fr]">
          <section>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-curry">
              Locate us
            </p>
            <h2 className="mt-3 font-serif text-3xl text-white">
              Balestier Plaza, ready when you are.
            </h2>
            <div className="mt-6 overflow-hidden rounded-card border border-white/10 bg-black/20 shadow-lifted">
              <iframe
                aria-label="Map to Tandoori Corner at Balestier Plaza"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=400%20Balestier%20Road%20%2301-12%20Balestier%20Plaza%2C%20Singapore%20329802&output=embed"
                title="Tandoori Corner map"
              />
            </div>
            <address className="mt-5 flex gap-3 text-sm not-italic leading-6 text-white/75">
              <MapPin aria-hidden="true" className="mt-1 size-4 text-curry" />
              400 Balestier Road #01-12 Balestier Plaza, Singapore 329802
            </address>
          </section>

          <section>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-curry">
              Logistics
            </p>
            <div className="mt-6 space-y-5">
              <div className="rounded-card border border-white/10 bg-white/6 p-5">
                <div className="flex items-start gap-3">
                  <Clock
                    aria-hidden="true"
                    className="mt-1 size-5 text-curry"
                  />
                  <div>
                    <h3 className="font-serif text-xl text-white">
                      Operating hours
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/75">
                      Mon-Sun: 12:00 PM to 2:45 PM, 6:00 PM to 9:45 PM
                    </p>
                    <p className="mt-3 rounded-card bg-brand px-3 py-2 text-sm font-bold text-white">
                      Closed between 2:45 PM and 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                <Button asChild variant="gold">
                  <a href="tel:+6562500200">
                    <Phone aria-hidden="true" />
                    Call 65-6250-0200
                  </a>
                </Button>
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
                  <a href="mailto:tandooricorner@singnet.com.sg">
                    <Mail aria-hidden="true" />
                    Email us
                  </a>
                </Button>
              </div>
            </div>
          </section>

          <section>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-curry">
              Social & offers
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2">
              {instagramImages.map((image) => (
                <div
                  className="relative aspect-square overflow-hidden rounded-card bg-black/20"
                  key={image}
                >
                  <Image
                    alt="Tandoori Corner dish"
                    className="object-cover transition duration-500 hover:scale-110"
                    fill
                    sizes="(min-width: 1024px) 10vw, 30vw"
                    src={image}
                  />
                </div>
              ))}
            </div>

            <form className="mt-6 rounded-card border border-white/10 bg-white/6 p-5">
              <label
                className="font-serif text-xl text-white"
                htmlFor="footer-email"
              >
                Sign up and get $5 off your next dine-in.
              </label>
              <div className="mt-4 flex gap-2">
                <input
                  className="min-w-0 flex-1 rounded-card border border-white/15 bg-white px-4 text-sm text-madison outline-none transition placeholder:text-muted focus:border-curry focus:ring-2 focus:ring-curry/30"
                  id="footer-email"
                  name="email"
                  placeholder="Email address"
                  type="email"
                />
                <Button aria-label="Join newsletter" size="icon" type="submit">
                  <Send aria-hidden="true" />
                </Button>
              </div>
            </form>
          </section>
        </div>

        <div className="mt-10 grid gap-3 border-t border-white/10 pt-8 md:grid-cols-3">
          {faqs.map((faq) => (
            <details
              className="group rounded-card border border-white/10 bg-white/6 p-4"
              key={faq.question}
            >
              <summary className="cursor-pointer font-bold text-white">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-white/70">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© Tandoori Corner Restaurant.</p>
          <div className="flex flex-wrap gap-4">
            <a href="/menu">Menu</a>
            <a href="/about">About</a>
            <a href="/gallery">Gallery</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
