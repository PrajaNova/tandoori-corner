import Link from "next/link";

export function MenuHero() {
  return (
    <section className="relative flex items-center justify-center min-h-[420px] pt-24">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/granny/granny_page-title_7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/65" />
      <div className="relative z-10 text-center px-4">
        <div className="font-script text-primary text-3xl md:text-4xl mb-1">
          Discover
        </div>
        <h1 className="font-kaushan text-5xl md:text-6xl text-white capitalize mb-6 leading-tight">
          Our Menu
        </h1>
        <ol className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase text-white/80">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li className="text-white/40">/</li>
          <li>
            <Link href="/menu" className="hover:text-primary transition-colors">
              menu
            </Link>
          </li>
          <li className="text-white/40">/</li>
          <li className="text-primary">classic</li>
        </ol>
      </div>
    </section>
  );
}
