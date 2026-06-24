import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { reservationContent } from "@/content/reservation";
import { contact } from "@/lib/seo";

const selectClass =
  "flex h-12 w-full rounded-none border border-input bg-transparent px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-muted-foreground";

export function Reservation() {
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

        <div className="bg-card border border-border p-8 md:p-14 max-w-4xl mx-auto shadow-xl mt-12">
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {reservationContent.description}
          </p>

          <form className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <select className={selectClass} defaultValue="4 People">
              {reservationContent.peopleOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <select className={selectClass} defaultValue="Today">
              {reservationContent.dateOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <select className={selectClass} defaultValue="8:00 PM">
              {reservationContent.timeOptions.map((o) => (
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
