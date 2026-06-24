import { SectionHeading } from "@/components/ui/SectionHeading";
import { eventTypes } from "@/data/private-events";

export function EventTypes() {
  return (
    <section className="relative py-24">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/granny/granny_background_8.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/75" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <SectionHeading
          cursiveText="What we host"
          mainText="Made For Every Gathering"
          dark
        />
        <p className="mx-auto mb-14 max-w-2xl text-center leading-relaxed text-white/70">
          From boardroom celebrations to milestone birthdays, we tailor the
          space, the menu and the bar to your occasion.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {eventTypes.map((type) => (
            <div
              key={type.title}
              className="border border-white/15 bg-white/5 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-primary/60 hover:bg-white/10"
            >
              <h3 className="font-kaushan text-3xl text-primary">
                {type.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                {type.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
