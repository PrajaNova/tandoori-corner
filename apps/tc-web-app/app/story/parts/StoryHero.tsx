import Image from "next/image";
import Link from "next/link";

export function StoryHero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[480px] pt-24 text-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/granny/granny_page-title_13.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/70" />

      <div className="relative z-10 px-4 max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <Image
            src="/granny/granny_page-title_chef-hat.png"
            alt="Chef hat"
            width={64}
            height={64}
            className="opacity-90"
          />
        </div>
        <h1 className="font-kaushan text-2xl md:text-4xl text-white leading-relaxed mb-10">
          Cooking is not just about ingredients — it is about heritage, passion
          and the stories we carry with us from home to every plate we serve.
        </h1>
        <ol className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase text-white/80">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li className="text-white/40">/</li>
          <li>
            <Link
              href="/story"
              className="hover:text-primary transition-colors"
            >
              about
            </Link>
          </li>
          <li className="text-white/40">/</li>
          <li className="text-primary">Our Story</li>
        </ol>
      </div>
    </section>
  );
}
