import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { contact } from "@/lib/seo";
import { EventEnquiryButton } from "./EventEnquiryButton";

export function EventBookingCTA() {
  return (
    <section className="relative py-28">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/granny/granny_background_7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/75" />

      <div className="container relative z-10 mx-auto max-w-3xl px-4 text-center">
        <span className="font-script text-3xl text-primary md:text-4xl">
          Let&apos;s plan it
        </span>
        <h2 className="font-kaushan mt-2 text-4xl leading-tight text-white md:text-5xl">
          Book The TCB Bar For Your Event
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/75">
          Tell us about your occasion and our events team will reply within one
          business day with availability and a tailored proposal.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <EventEnquiryButton label="Enquire to Book" />
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-raleway text-xs font-bold uppercase tracking-widest text-[#25D366] transition-colors hover:text-[#128C7E]"
          >
            <WhatsAppIcon className="h-5 w-5 fill-[#25D366] transition-transform group-hover:scale-110" />
            WhatsApp Us
            <ArrowRight className="h-4 w-4 text-white transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
