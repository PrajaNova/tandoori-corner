import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact } from "@/lib/seo";

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
  "Today",
  "Tomorrow",
  "In 2 days",
  "In 3 days",
  "In 4 days",
];
const timeOptions = [
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
];

export function Reservation() {
  return (
    <section
      id="reservation"
      className="relative py-24 flex items-center justify-center scroll-mt-24"
    >
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
            Reserve your table at Tandoori Corner in just a few clicks. We
            welcome walk-ins and reservations for lunch (12:00 – 2:45 PM) and
            dinner (6:00 – 9:45 PM), seven days a week.
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
            Or call us at{" "}
            <a
              href={contact.phoneLandlineHref}
              className="text-primary hover:underline"
            >
              {contact.phoneLandlineDisplay}
            </a>{" "}
            /{" "}
            <a
              href={contact.phoneHref}
              className="text-primary hover:underline"
            >
              {contact.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
