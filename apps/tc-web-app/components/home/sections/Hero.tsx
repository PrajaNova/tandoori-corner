const heroPoster =
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80";

export function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[440px] w-full overflow-hidden bg-ink md:h-[90vh]">
      <video
        aria-hidden="true"
        autoPlay
        className="h-full w-full object-cover"
        loop
        muted
        poster={heroPoster}
        playsInline
        preload="metadata"
        tabIndex={-1}
      >
        <source
          media="(min-width: 768px)"
          src="/hero_intro.mp4"
          type="video/mp4"
        />
      </video>
    </section>
  );
}
