import Image from "next/image";
import { quoteContent } from "@/content/quote";

export function ParallaxQuote() {
  return (
    <section className="relative py-32 flex items-center justify-center min-h-[460px]">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${quoteContent.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="container relative z-10 px-4 text-center max-w-4xl mx-auto">
        {quoteContent.iconImage && (
          <div className="flex justify-center mb-8">
            <Image
              src={quoteContent.iconImage}
              alt={quoteContent.iconAlt}
              width={70}
              height={70}
              style={{ width: 70, height: "auto" }}
              className="opacity-90"
            />
          </div>
        )}
        <h3 className="font-kaushan text-3xl md:text-[42px] text-white leading-snug mb-8">
          {quoteContent.quote}
        </h3>
        <p className="font-raleway text-primary tracking-widest uppercase font-bold text-sm">
          {quoteContent.author}
        </p>
      </div>
    </section>
  );
}
