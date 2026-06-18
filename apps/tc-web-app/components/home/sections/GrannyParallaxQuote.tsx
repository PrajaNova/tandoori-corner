import React from "react";
import Image from "next/image";

export function GrannyParallaxQuote() {
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
            alt="Chef hat"
            width={70}
            height={70}
            className="opacity-90"
          />
        </div>
        <h3 className="font-kaushan text-3xl md:text-[42px] text-white leading-snug mb-8">
          I think the most wonderful thing in the world is another chef.
          I&apos;m always excited about learning new things about food.
        </h3>
        <p className="font-raleway text-primary tracking-widest uppercase font-bold text-sm">
          - Todd Stephen
        </p>
      </div>
    </section>
  );
}
