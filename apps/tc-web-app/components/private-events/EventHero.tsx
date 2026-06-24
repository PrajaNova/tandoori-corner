import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { contact } from "@/lib/seo";
import { EventEnquiryButton } from "./EventEnquiryButton";

export function EventHero() {
  return (
    <section className="relative flex min-h-[640px] items-center justify-center overflow-hidden pt-24">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/granny/granny_background_2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/65" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/homepage/tcb-logo.png"
            alt="The TCB Bar"
            width={175}
            height={175}
            priority
            className="w-24 h-auto md:w-28"
            style={{ height: "auto" }}
          />
        </div>
        <h1 className="font-kaushan mt-2 text-4xl leading-tight text-white sm:text-6xl md:text-7xl">
          Your Private Night,
          <br />
          In Our Secret Room
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-raleway text-base leading-relaxed text-white/85 md:text-lg">
          Tucked away from the bustling Balestier pavement, the TCB Bar is an
          intimate, high-style space for celebrations, corporate evenings and
          milestone dinners. Book it out — for the night, it&apos;s entirely
          yours.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <EventEnquiryButton label="Enquire to Book" variant="solid" />
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

        <ol className="mt-12 flex items-center justify-center gap-2 font-raleway text-xs font-bold uppercase tracking-widest text-white/70">
          <li>
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
          </li>
          <li className="text-white/40">/</li>
          <li className="text-primary">Event Space</li>
        </ol>
      </div>
    </section>
  );
}
