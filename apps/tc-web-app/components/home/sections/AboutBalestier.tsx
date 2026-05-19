import { Eyebrow } from "@/components/ui/typography";

export function AboutBalestier() {
  return (
    <section
      aria-labelledby="about-balestier-heading"
      className="bg-cream py-16 sm:py-24"
      id="about-balestier"
    >
      <div className="container mx-auto grid max-w-5xl gap-10 px-6 lg:px-12">
        <div className="flex flex-col gap-4">
          <Eyebrow className="text-brand-gold">
            Balestier Plaza &middot; Singapore
          </Eyebrow>
          <h2
            className="font-space text-3xl font-bold leading-tight text-ink sm:text-4xl"
            id="about-balestier-heading"
          >
            A North Indian restaurant and TCB Bar in the heart of Balestier
          </h2>
        </div>

        <div className="grid gap-8 text-base leading-relaxed text-ink/80 md:grid-cols-2">
          <div className="space-y-5">
            <p>
              Tandoori Corner has called Balestier Plaza home for more than
              fifteen years. Tucked into a quiet corner of one of Singapore's
              most storied food neighbourhoods, our kitchen turns out the kind
              of unhurried North Indian cooking that built our name —
              twenty-four-hour tandoori marinades, slow-simmered curries, fresh
              breads from the clay oven, and lunch thali sets that locals from
              the surrounding offices and HDB blocks have leaned on for years.
            </p>
            <p>
              Step beyond the dining room and you'll find our pet-friendly
              alfresco balcony, the easiest way to spend a Singapore evening
              over Tandoori Chicken, Saag Mutton, and a cold pint from the Beer
              Fest menu. The balcony is shaded, generously planted, and built
              for long meals with friends, family, or your dog.
            </p>
          </div>
          <div className="space-y-5">
            <p>
              The TCB Bar — short for Tandoori Corner Bar — is our evening
              programme. It sits behind a separate doorway off the main floor
              and runs from 6 PM, pairing premium drafts and craft cocktails
              with smaller, sharing-style plates from the tandoor. The TCB Bar
              is also the place to host private dinners, intimate birthdays, and
              team off-sites; the room comfortably holds up to forty guests.
            </p>
            <p>
              Whether you're walking up from Balestier Road, looking for a
              catering partner for an office function, or ordering home delivery
              across central Singapore, the same kitchen team and the same
              fifteen-year-old spice blends are behind every plate. Our menu,
              hours, and reservation links are a click away — and if you'd
              rather just call, the line is always answered.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
