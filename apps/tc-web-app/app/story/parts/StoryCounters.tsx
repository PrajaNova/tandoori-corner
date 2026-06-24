const counters = [
  { number: "16+", title: "Years of Excellence" },
  { number: "80+", title: "Dishes in Menu" },
  { number: "20+", title: "Expert Team Members" },
  { number: "500+", title: "5-Star Reviews" },
];

export function StoryCounters() {
  return (
    <section className="relative py-24">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/granny/granny_counter_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/75" />

      <div className="container relative z-10 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {counters.map((c) => (
            <div key={c.title}>
              <div className="font-raleway text-5xl font-bold text-white mb-2">
                {c.number}
              </div>
              <div className="font-raleway text-xs tracking-widest uppercase text-primary font-bold">
                {c.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
