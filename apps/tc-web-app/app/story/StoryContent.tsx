"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const welcomeParagraphs = [
  "Tandoori Corner was established in 2008 by Surendar Singh, a hotel management graduate who trained at Hyatt International's La Piazza in New Delhi before bringing his passion for authentic North Indian cuisine to Singapore's vibrant Balestier Road.",
  "What started as a cosy alfresco corner spot has grown into one of Singapore's most celebrated Indian restaurants, earning a TripAdvisor Certificate of Excellence and recognition as 'Best Food Delivery' by Restaurant Guru in 2020.",
  "Tandoori Corner is more than a restaurant — it is a community gathering place where flavours, stories and cultures come together. Our latest TCB expansion introduces a stylish indoor bar and dining room, inviting you to celebrate every occasion with us.",
];

const guestbook = [
  {
    text: "Unpretentious and wholesome — all our favourite dishes hit the right notes consistently. The Butter Chicken and Peshawari Naan are absolute perfection. We keep coming back every week!",
    author: "- ElaiNe Lin, Singapore",
    avatar: "/granny/granny_testimonial_1.png",
  },
  {
    text: "The Tandoori Chicken here is the best I have had outside of India. Succulent, perfectly spiced and smoky from the clay oven. The kebabs and naans are equally outstanding. A gem on Balestier Road.",
    author: "- Pravesh Gupta, India",
    avatar: "/granny/granny_testimonial_2.png",
  },
  {
    text: "We have been regulars for years. The Dal Makhani and Lamb Rogan Josh are consistently incredible. Friendly staff, great atmosphere and outstanding value for money.",
    author: "- John Arax, Singapore",
    avatar: "/granny/granny_testimonial_3.png",
  },
  {
    text: "Simply the finest North Indian food in Singapore. Chef Ramesh's recipes are the real deal — every dish carries the depth and warmth of authentic Indian cooking.",
    author: "- Anthony Kevin, Malaysia",
    avatar: "/granny/granny_testimonial_4.png",
  },
];

const features = [
  {
    icon: "/granny/granny_icons_1.png",
    title: "Authentic Recipes",
    desc: "Our recipes have been passed down through generations and refined by Chef Ramesh across five-star kitchens in India. Every dish carries the full depth of North Indian tradition.",
  },
  {
    icon: "/granny/granny_icons_2.png",
    title: "Fresh Spices Daily",
    desc: "We grind and blend our own spice mixes in-house every morning. No shortcuts, no shortcuts — just the real flavours that make North Indian cuisine legendary.",
  },
  {
    icon: "/granny/granny_icons_3.png",
    title: "Tandoor-Fired Perfection",
    desc: "Our traditional clay tandoor oven operates at extreme heat, sealing in moisture and delivering the authentic char and smokiness that defines great tandoori cooking.",
  },
  {
    icon: "/granny/granny_icons_4.png",
    title: "Expert Kitchen Team",
    desc: "Led by Chef Ramesh, who has been with us since our founding in 2009, our chefs bring decades of experience in premium Indian restaurants across India and the Gulf.",
  },
  {
    icon: "/granny/granny_icons_5.png",
    title: "Alfresco Dining",
    desc: "Enjoy your meal on our beloved balcony-style alfresco terrace overlooking Balestier Road's heritage trail — the original charm that made Tandoori Corner famous.",
  },
  {
    icon: "/granny/granny_icons_6.png",
    title: "TCB Bar & Lounge",
    desc: "Our new TCB indoor dining room and stylish bar offers cocktails, wine pairings and a refined setting for private celebrations and corporate gatherings.",
  },
];

const counters = [
  { number: "16+", title: "Years of Excellence" },
  { number: "80+", title: "Dishes in Menu" },
  { number: "20+", title: "Expert Team Members" },
  { number: "500+", title: "5-Star Reviews" },
];

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
            Cooking is not just about ingredients — it is about heritage,
            passion and the stories we carry with us from home to every plate
            we serve.
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
            mainText="Welcome To Tandoori Corner"
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
            Since opening in 2008, Tandoori Corner has earned recognition from food critics, review platforms and loyal guests across Singapore and beyond.
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
