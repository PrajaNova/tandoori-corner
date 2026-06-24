import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <title>WhatsApp Icon</title>
      <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.908.533 3.687 1.453 5.215L2 22l4.93-1.413c1.5.85 3.23 1.34 5.074 1.34 5.524 0 10.004-4.48 10.004-10.003C22 6.48 17.528 2 12.004 2zm5.727 14.346c-.25.704-1.455 1.284-2.023 1.37-.568.086-1.127.322-3.626-.713-3.197-1.324-5.228-4.57-5.387-4.78-.16-.211-1.276-1.698-1.276-3.24 0-1.543.805-2.302 1.093-2.607.288-.306.63-.383.84-.383.21 0 .42.002.603.01.19.008.446-.073.698.533.253.607.864 2.102.94 2.254.075.152.126.33.025.53-.1.2-.152.33-.304.507-.152.178-.32.396-.456.533-.153.153-.312.32-.134.626.177.304.79 1.296 1.69 2.097.772.69 1.42 1.03 1.777 1.217.357.188.563.158.773-.086.21-.244.912-1.06 1.157-1.424.244-.365.49-.304.823-.182.333.122 2.112.996 2.476 1.18.364.18.608.27.698.425.09.155.09 1.002-.16 1.706z" />
    </svg>
  );
}
