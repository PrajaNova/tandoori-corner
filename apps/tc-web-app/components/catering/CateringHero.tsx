import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { contact } from "@/lib/seo";

export function CateringHero() {
  return (
    <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden pt-24">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/granny/granny_background_8.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/65" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <span className="font-script text-primary text-3xl md:text-4xl">
          Let&apos;s celebrate
        </span>
        <h1 className="font-kaushan mt-2 text-4xl leading-tight text-white sm:text-6xl md:text-7xl">
          Catering &amp; Party Feasts
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-raleway text-base leading-relaxed text-white/85 md:text-lg">
          From the sizzling heat of the tandoor to the rich depths of our
          signature curries — let Tandoori Corner cater your celebration with
          authentic North Indian flavours for parties of 30 and beyond.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/catering/build"
            className="group relative inline-flex items-center justify-center gap-2.5 bg-primary px-10 py-5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Build Your Feast
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
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
          <li className="text-primary">Catering</li>
        </ol>
      </div>
    </section>
  );
}
