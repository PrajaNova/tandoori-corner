"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const welcomeParagraphs = [
  "Granny was opened in May 6, 1990, the interior was created by the most famous artists. Today our restaurant welcomes 250 people!",
  "Since the very first day, Granny was a gathering place for teachers, doctors, actors. Therefore we decided to open our second branch!",
  "Granny was and still remains not just a restaurant, but also a remarkable part of the culture. We are happy to announce that we claim tate award.",
];

const guestbook = [
  {
    text: "Granny is simply the best. Great Food, nice atmosphere and very reasonable prices. It just doesn't get any better",
    author: "- Todd Stephen",
    avatar: "/granny/granny_testimonial_1.png",
  },
  {
    text: "We've been to Granny many times over the years. We know what to expect: great food and awesome prices",
    author: "- David Casper",
    avatar: "/granny/granny_testimonial_2.png",
  },
  {
    text: "The reasonable prices, the great atmosphere are only topped by the delicious food. Keep up the great work",
    author: "- John Arax",
    avatar: "/granny/granny_testimonial_3.png",
  },
  {
    text: "Granny is simply the best. Great Food, nice atmosphere and very reasonable prices. It just doesn't get any better",
    author: "- Anthony Kevin",
    avatar: "/granny/granny_testimonial_4.png",
  },
];

const features = [
  {
    icon: "/granny/granny_icons_1.png",
    title: "Daily Fresh Menus",
    desc: "Granny help you treat yourself with a different meal everyday, thanks to our daily changing menus and our awesome creative chefs!",
  },
  {
    icon: "/granny/granny_icons_2.png",
    title: "Fresh Ingredient",
    desc: "Who said healthy food can't also be delicious? Granny creative chefs use fresh and seasonal ingredients to make affordable, tasty and nourishing meals.",
  },
  {
    icon: "/granny/granny_icons_3.png",
    title: "Tasty Meals",
    desc: "Who said healthy food can't also be delicious? Granny creative chefs use fresh and seasonal ingredients to make affordable, tasty and nourishing meals.",
  },
  {
    icon: "/granny/granny_icons_4.png",
    title: "Creative Chef",
    desc: "Granny help you treat yourself with a different meal everyday, thanks to our daily changing menus and our awesome creative chefs!",
  },
  {
    icon: "/granny/granny_icons_5.png",
    title: "Real Pizza",
    desc: "Who said healthy food can't also be delicious? Granny creative chefs use fresh and seasonal ingredients to make affordable, tasty and nourishing meals.",
  },
  {
    icon: "/granny/granny_icons_6.png",
    title: "Awesome Coffee",
    desc: "Who said healthy food can't also be delicious? Granny creative chefs use fresh and seasonal ingredients to make affordable, tasty and nourishing meals.",
  },
];

const counters = [
  { number: "15423", title: "Clients Served" },
  { number: "165", title: "Dishes in Menu" },
  { number: "59", title: "Working Hands" },
  { number: "286", title: "Positive Reviews" },
];

const awardsLeft = [
  "The Good Food Award, Gold Seal (2017)",
  "The Organic Food Award, Soil Association (2017)",
  "The Great British & Egyptian Food Award (2016)",
  "The Food Made Good Award (2015)",
  "The Great Food Taste Award (2014)",
  "The Food Award, Egypt (2014)",
];

const awardsRight = [
  "The Best Food Award, Egypt (2013)",
  "The Best Chef in Egypt & Best Restaurant (2012, 2013)",
  "The Best Emerging Egypt Cuisine (2012)",
  "The Best Dining Experience (2011)",
  "The Best Chef in Egypt (2010)",
  "The Egyptian Star (2009)",
];

const awardLogos = [1, 2, 3, 4, 5, 6, 7];

export function StoryContent() {
  const [active, setActive] = useState(0);
  const current = guestbook[active];

  return (
    <div className="bg-white">
      {/* 1. Page title */}
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
            I don&apos;t like food that&apos;s too carefully arranged; it makes
            me think that the chef is spending too much time arranging and not
            enough time cooking.
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

      {/* 2. Welcome To Granny */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading
            cursiveText="Hello dear"
            mainText="Welcome To Granny"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12 text-center">
            {welcomeParagraphs.map((p) => (
              <p key={p} className="text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Our Guestbook */}
      <section className="relative py-24 flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/granny/granny_background_1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 z-0 bg-black/70" />

        <div className="container relative z-10 px-4 max-w-3xl mx-auto text-center">
          <SectionHeading
            cursiveText="People talk"
            mainText="Our Guestbook"
            dark
          />

          <div className="mt-8">
            <div className="flex justify-center space-x-1 mb-8 text-[#ffb400]">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <blockquote className="font-kaushan text-2xl md:text-3xl text-white leading-relaxed mb-10">
              &ldquo; {current.text} &rdquo;
            </blockquote>
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3">
                <Image
                  src={current.avatar}
                  alt={current.author}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-raleway text-white/70 italic">
                {current.author}
              </p>
            </div>
            <div className="flex justify-center space-x-2 mt-8">
              {guestbook.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActive(idx)}
                  aria-label={`Review ${idx + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    idx === active
                      ? "bg-primary"
                      : "bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16 text-center">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col items-center">
                <div className="mb-6 h-16 flex items-center justify-center">
                  <Image src={f.icon} alt={f.title} width={64} height={64} />
                </div>
                <h3 className="font-raleway text-lg font-bold uppercase tracking-wide mb-4">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed px-2">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Counters */}
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

      {/* 6. Awards */}
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
            Since our grand opening in May 1995, Granny has won great awards
            from food critics and organizations all over the world.
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
    </div>
  );
}
