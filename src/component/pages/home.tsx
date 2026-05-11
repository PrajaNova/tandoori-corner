"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-ink pt-24 text-cream">
      <div className="absolute inset-0 z-0">
        <img
          alt="Indian feast"
          className="h-full w-full object-cover opacity-40 mix-blend-overlay"
          src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=2000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 text-center">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="mb-6 block font-semibold text-brand text-sm uppercase tracking-[0.2em] md:text-base">
            Welcome to Singapore&apos;s Finest
          </span>
          <h1 className="mx-auto mb-8 max-w-4xl font-serif text-5xl leading-tight md:text-7xl lg:text-8xl">
            The Essence of North Indian Cuisine
          </h1>
          <p className="mx-auto mb-10 max-w-2xl font-light text-cream/80 text-lg leading-relaxed md:text-xl">
            Experience authentic flavors, rich aromas, and warm hospitality at
            Tandoori Corner.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              className="w-full rounded-full bg-brand px-8 py-4 text-center font-medium text-cream tracking-wide shadow-brand/20 shadow-lg transition-colors hover:bg-tandoori-dark sm:w-auto"
              href="/menu"
            >
              Explore Our Menu
            </Link>
            <Link
              className="w-full rounded-full border border-cream/30 bg-transparent px-8 py-4 text-center font-medium text-cream tracking-wide transition-colors hover:bg-cream hover:text-ink sm:w-auto"
              href="/reservations"
            >
              Book a Table
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="-bottom-px absolute left-0 z-20 w-full overflow-hidden leading-none">
        <svg
          aria-hidden="true"
          className="block h-[60px] w-full text-cream md:h-[100px]"
          fill="currentColor"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C52.16,93.44,103.81,87,154.5,78.27,209.66,68.85,263.46,67.13,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section className="flex items-center justify-center bg-cream px-4 py-24">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        viewport={{ once: true, margin: "-100px" }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        <h2 className="font-serif text-3xl text-ink leading-tight md:text-5xl">
          A destination for an{" "}
          <span className="text-brand italic">unforgettable</span> culinary
          journey through North Indian flavors.
        </h2>
        <p className="mt-8 font-semibold text-ink/60 text-sm uppercase tracking-widest">
          Tandoori Corner
        </p>
      </motion.div>
    </section>
  );
}

function SignatureDishes() {
  const dishes = [
    {
      name: "Tandoori Chicken",
      desc: "Bone-in chicken marinated in yogurt and traditional spices, roasted to perfection.",
      price: "$22.00",
      image:
        "https://images.unsplash.com/photo-1599487405291-7607a7e87ab6?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Butter Chicken",
      desc: "Tender roasted chicken simmered in a rich, creamy tomato gravy with a hint of fenugreek.",
      price: "$24.00",
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Garlic Naan",
      desc: "Freshly baked in a traditional clay oven, infused with garlic and fresh coriander.",
      price: "$5.50",
      image:
        "https://images.unsplash.com/photo-1626804475297-4160aaeeb3e2?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <section className="bg-cream px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div className="max-w-2xl">
            <span className="mb-4 block font-semibold text-brand text-sm uppercase tracking-[0.2em]">
              Taste the Tradition
            </span>
            <h2 className="font-serif text-4xl text-ink md:text-5xl">
              Signature Dishes
            </h2>
            <p className="mt-6 text-ink/70 text-lg">
              A focused selection representing the authentic soul of North
              Indian dining.
            </p>
          </div>
          <Link
            className="group flex items-center space-x-2 font-medium text-brand transition-colors hover:text-ink"
            href="/menu"
          >
            <span className="text-sm uppercase tracking-wide">
              View Full Menu & Order
            </span>
            <ChevronRight
              className="transition-transform group-hover:translate-x-1"
              size={18}
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {dishes.map((dish, index) => (
            <motion.div
              className="group"
              initial={{ opacity: 0, y: 30 }}
              key={dish.name}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden rounded-card shadow-card">
                <img
                  alt={dish.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={dish.image}
                />
              </div>
              <div className="mb-2 flex items-baseline justify-between">
                <h3 className="font-serif text-2xl text-ink">{dish.name}</h3>
                <span className="font-medium text-brand text-lg">
                  {dish.price}
                </span>
              </div>
              <p className="text-ink/70 leading-relaxed">{dish.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="bg-ink px-4 py-24 text-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 md:flex-row">
        <div className="relative w-full md:w-1/2">
          <motion.div
            className="aspect-[4/5] w-full overflow-hidden rounded-card md:aspect-square"
            initial={{ opacity: 0, x: -30 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <img
              alt="Restaurant ambience"
              className="h-full w-full object-cover opacity-80"
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200"
            />
          </motion.div>
          <motion.div
            className="-bottom-8 absolute -right-4 flex h-44 w-44 flex-col items-center justify-center rounded-full border-4 border-ink bg-brand p-8 text-cream shadow-2xl md:-right-12 md:h-48 md:w-48"
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <span className="mb-1 font-serif text-5xl">15+</span>
            <span className="text-center font-bold text-xs uppercase tracking-widest">
              Years of
              <br />
              Heritage
            </span>
          </motion.div>
        </div>

        <div className="mt-12 w-full md:mt-0 md:w-1/2">
          <span className="mb-6 block font-semibold text-brand text-sm uppercase tracking-[0.2em]">
            Our Services
          </span>
          <h2 className="mb-8 font-serif text-4xl text-cream leading-tight md:text-5xl">
            Comfort and Convenience at Tandoori Corner.
          </h2>
          <div className="space-y-6">
            <p className="font-light text-cream/70 text-lg leading-relaxed">
              Whether you are looking for an intimate dinner, a family
              gathering, or private catering for your next event, we bring the
              magic of the tandoor to the table.
            </p>

            <ul className="space-y-4 pt-6">
              {[
                "Dine-in experience with warm hospitality",
                "Takeaway and pickup ordering",
                "Corporate and private event catering",
                "Delivery across Singapore",
              ].map((item) => (
                <li className="flex items-center space-x-4" key={item}>
                  <div className="h-2 min-w-2 rounded-full bg-brand" />
                  <span className="text-cream/90">{item}</span>
                </li>
              ))}
            </ul>

            <div className="w-full pt-8 sm:w-auto">
              <Link
                className="inline-block w-full rounded-full bg-cream px-8 py-4 text-center font-medium text-ink tracking-wide transition-colors hover:bg-brand hover:text-cream sm:w-auto"
                href="/reservations"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <QuoteSection />
      <SignatureDishes />
      <ExperienceSection />
    </>
  );
}
