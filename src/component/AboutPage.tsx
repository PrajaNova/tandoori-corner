import { Flame, Hotel, Sparkles, Utensils } from "lucide-react";
import Image from "next/image";
import { ActionFooter } from "@/component/ActionFooter";
import { AppHeader } from "@/component/AppHeader";
import { Button } from "@/component/ui/button";

const milestones = [
  {
    year: "1993",
    title: "Hotel discipline begins",
    copy: "Surender Singh starts in the world of Hyatt International in New Delhi, learning precision, service, and scale.",
  },
  {
    year: "1997",
    title: "Singapore chapter",
    copy: "That hospitality craft moves to Singapore, shaping a restaurant vision built around warmth instead of formality.",
  },
  {
    year: "2008",
    title: "Balestier opening",
    copy: "Tandoori Corner opens at Balestier Plaza as a North Indian curry house with alfresco balcony dining.",
  },
  {
    year: "2009",
    title: "The tandoor anchor",
    copy: "Chef Ramesh Kumar anchors the kitchen with hotel-trained discipline, long marinades, and hand-blended spice.",
  },
  {
    year: "Today",
    title: "TCB and the next chapter",
    copy: "The restaurant evolves into a pet-friendly alfresco destination with TCB Bar for private events and evenings.",
  },
];

const makers = [
  {
    image: "/tandoori-hero.jpg",
    name: "Surender Singh",
    role: "The Visionary",
    quote:
      "I wanted to bring the 5-star hotel quality I learned in New Delhi directly to the casual, breezy streets of Balestier.",
  },
  {
    image: "/dish-butter-chicken.jpg",
    name: "Chef Ramesh Kumar",
    role: "Master of the Tandoor",
    quote:
      "My favourite dishes are the ones that take patience: long marinades, slow gravy, and naan pulled fresh from the heat.",
  },
  {
    image: "/tandoori-tcb.png",
    name: "Benu",
    role: "The TCB Host",
    quote:
      "Ask me for a wine pairing with your curry, or let me mix something bright for your night at TCB.",
  },
  {
    image: "/dish-papri-chaat.jpg",
    name: "Satish",
    role: "The Floor Welcome",
    quote:
      "The best service is when regulars feel seen and first-time guests feel like they already belong here.",
  },
];

const craftPoints = [
  {
    icon: Flame,
    title: "Real tandoor craft",
    copy: "Clay-oven heat gives naan, kebabs, and chicken the smoke and char that shortcuts cannot copy.",
  },
  {
    icon: Sparkles,
    title: "Hand-blended spice",
    copy: "Spice is treated like structure: layered, toasted, balanced, and adjusted for the dish.",
  },
  {
    icon: Utensils,
    title: "Slow comfort",
    copy: "Dal, gravies, and marinades are built with time so familiar dishes still feel memorable.",
  },
];

export function AboutPage() {
  return (
    <main className="min-h-screen bg-cream text-madison">
      <AppHeader />

      <section className="relative isolate overflow-hidden bg-madison px-6 pb-20 pt-48 text-white sm:px-10 lg:px-12">
        <Image
          alt="Tandoori Corner tandoor and Balestier dining"
          className="-z-20 object-cover opacity-45 grayscale"
          fill
          priority
          src="/tandoori-hero.jpg"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-madison via-madison/82 to-madison/30" />
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-curry">
            Heritage & hands
          </p>
          <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-tight text-white md:text-7xl">
            Pioneering North Indian Flavours on the Balestier Heritage Trail.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">
            Since 2008, Tandoori Corner has been shaped by hotel-trained
            hospitality, patient kitchen craft, alfresco warmth, and the people
            who keep the tandoor alive every service.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="gold">
              <a href="/#reserve">Reserve Your Table</a>
            </Button>
            <Button asChild variant="heroOutline">
              <a href="/menu">Explore the Menu</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-10 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[28rem] overflow-hidden rounded-card bg-madison shadow-card">
            <Image
              alt="Owner hospitality at Tandoori Corner"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              src="/tandoori-hero.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 max-w-xs text-white">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-curry">
                The Roots
              </p>
              <p className="mt-2 font-serif text-3xl text-white">
                Surender Singh's hospitality journey.
              </p>
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-sm font-bold text-brand">
              <Hotel aria-hidden="true" className="size-4" />
              Hyatt-trained service mindset
            </div>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl">
              From New Delhi discipline to Balestier warmth.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-muted">
              <p>
                The story begins with Surender Singh's hospitality training at
                Hyatt International in New Delhi in 1993, followed by a move to
                Singapore in 1997.
              </p>
              <p>
                Tandoori Corner opened in 2008 with a clear idea: bring the
                reliability and polish of hotel dining into a casual North
                Indian restaurant where families, regulars, and first-time
                guests feel looked after.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-madison px-6 py-16 text-white sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-curry">
                The craft
              </p>
              <h2 className="mt-4 font-serif text-4xl text-white md:text-5xl">
                The flavour is built before the first order arrives.
              </h2>
            </div>
            <p className="text-base leading-8 text-white/72">
              Chef Ramesh does not sell shortcuts. The kitchen leans on patient
              marinades, tandoor heat, hand-blended spices, and gravies that
              earn their texture before service starts.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {craftPoints.map((point) => {
              const Icon = point.icon;

              return (
                <article
                  className="rounded-card border border-white/10 bg-white/6 p-6"
                  key={point.title}
                >
                  <Icon aria-hidden="true" className="size-7 text-curry" />
                  <h3 className="mt-5 font-serif text-2xl text-white">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    {point.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-16 sm:px-10 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
              The modern era
            </p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">
              TCB turns dinner into an occasion.
            </h2>
            <p className="mt-6 text-base leading-8 text-muted">
              TCB Bar is the next chapter: a stylish indoor dining room and bar
              inside the restaurant for wine, cocktails, romantic evenings,
              corporate dinners, birthdays, and private bookings.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gold">
                <a href="/#events">Book TCB</a>
              </Button>
              <Button asChild variant="secondary">
                <a href="/#reserve">Plan Dinner</a>
              </Button>
            </div>
          </div>
          <div className="relative min-h-[28rem] overflow-hidden rounded-card bg-madison shadow-card">
            <Image
              alt="Tandoori Corner Bar"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              src="/tandoori-tcb.png"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
            Meet the makers
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl md:text-5xl">
            Real food, crafted by real people.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {makers.map((maker) => (
              <article
                className="group overflow-hidden rounded-card bg-madison text-white shadow-card"
                key={maker.name}
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    alt={maker.name}
                    className="object-cover transition duration-700 group-hover:scale-110"
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    src={maker.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-curry">
                    {maker.role}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-white">
                    {maker.name}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-white/72">
                    "{maker.quote}"
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-section px-6 py-16 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
              Our journey
            </p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">
              Milestones on Balestier Road.
            </h2>
          </div>
          <div className="mt-12 space-y-6">
            {milestones.map((milestone) => (
              <article
                className="grid gap-4 border-b border-line pb-6 md:grid-cols-[8rem_1fr]"
                key={milestone.year}
              >
                <p className="font-serif text-4xl text-brand">
                  {milestone.year}
                </p>
                <div>
                  <h3 className="font-serif text-2xl">{milestone.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {milestone.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-madison px-6 py-16 text-white sm:px-10 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-curry">
              Come meet the family
            </p>
            <h2 className="mt-4 font-serif text-4xl text-white md:text-5xl">
              The story is better at the table.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
              Book alfresco, bring your pet to the outdoor space, or plan a TCB
              evening with the team behind the food.
            </p>
          </div>
          <Button asChild variant="gold">
            <a href="/#reserve">Reserve Your Table</a>
          </Button>
        </div>
      </section>

      <ActionFooter />
    </main>
  );
}
