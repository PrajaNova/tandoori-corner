import Image from "next/image";

const awardsLeft = [
  "TripAdvisor Certificate of Excellence",
  "Best Food Delivery — Restaurant Guru (2020)",
  "Featured in Premium Economy Magazine",
  "One of Singapore's Best Indian Restaurants (Sluurpy)",
  "Best Restaurant of the Year — Hyatt La Piazza, New Delhi (1996)",
  "Recognised by Singapore Food Enthusiasts Community",
];

const awardsRight = [
  "Top-Rated on Google Reviews, Balestier Road",
  "Best North Indian Cuisine — Singapore Food Awards",
  "Featured on TripAdvisor Travellers' Choice List",
  "Praised by International Food Critics & Bloggers",
  "Consistent 4.5★+ Rating Across All Platforms",
  "Catering Partner for Corporate & Private Events",
];

const awardLogos = [1, 2, 3, 4, 5, 6, 7];

export function StoryAwards() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 mb-14">
          {awardLogos.map((n) => (
            <li
              key={n}
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src={`/granny/granny_tabs_${n}.png`}
                alt={`Award ${n}`}
                width={90}
                height={90}
                className="h-[70px] w-auto object-contain"
              />
            </li>
          ))}
        </ul>

        <h3 className="text-center font-raleway text-xl md:text-2xl font-bold text-foreground max-w-3xl mx-auto mb-14 leading-relaxed">
          Since opening in 2008, Tandoori Corner has earned recognition from
          food critics, review platforms and loyal guests across Singapore and
          beyond.
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-3xl mx-auto">
          <ul className="space-y-3">
            {awardsLeft.map((a) => (
              <li
                key={a}
                className="text-muted-foreground text-sm border-b border-border pb-3"
              >
                {a}
              </li>
            ))}
          </ul>
          <ul className="space-y-3">
            {awardsRight.map((a) => (
              <li
                key={a}
                className="text-muted-foreground text-sm border-b border-border pb-3"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
