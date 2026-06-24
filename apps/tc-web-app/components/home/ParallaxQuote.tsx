import Image from "next/image";

export function ParallaxQuote() {
  return (
    <section className="relative py-32 flex items-center justify-center min-h-[460px]">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/granny/granny_background_2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="container relative z-10 px-4 text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <Image
            src="/granny/granny_testimonial_chef-hat2.png"
            alt="Chef hat icon representing Tandoori Corner's culinary heritage"
            width={70}
            height={70}
            style={{ width: 70, height: "auto" }}
            className="opacity-90"
          />
        </div>
        <h3 className="font-kaushan text-3xl md:text-[42px] text-white leading-snug mb-8">
          Food is not just fuel. It is information. It talks to your DNA and
          tells it what to do. The most powerful thing you can do is eat real,
          authentic food made with love and tradition.
        </h3>
        <p className="font-raleway text-primary tracking-widest uppercase font-bold text-sm">
          - Surendar Singh, Founder of Tandoori Corner
        </p>
      </div>
    </section>
  );
}
