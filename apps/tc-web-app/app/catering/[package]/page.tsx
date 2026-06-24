import { ArrowLeft, Check, Leaf, X } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { cateringCourses, dishesForCourse } from "@/data/catering";
import { getCateringPackageBySlug } from "@/lib/catering";
import { buildPageMetadata } from "@/lib/seo";

import { RequestQuoteButton } from "../parts/RequestQuoteButton";

export const dynamic = "force-dynamic";

type PageParams = { package: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { package: packageId } = await params;
  const pkg = await getCateringPackageBySlug(packageId);

  if (!pkg) {
    return buildPageMetadata({
      path: "/catering",
      title: "Catering | Tandoori Corner",
      description: "North Indian catering at Balestier Plaza.",
    });
  }

  return buildPageMetadata({
    path: `/catering/${pkg.id}`,
    title: `${pkg.name} Catering Package | Tandoori Corner`,
    description: `${pkg.description} From ${pkg.pricePerHead} per guest, minimum ${pkg.minGuests} pax.`,
  });
}

export default async function CateringPackagePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { package: packageId } = await params;
  const pkg = await getCateringPackageBySlug(packageId);

  if (!pkg) {
    notFound();
  }

  const quoteSubject = {
    kind: "package" as const,
    name: `${pkg.name} Package`,
    lines: [
      `${pkg.pricePerHead} / guest · min ${pkg.minGuests} pax`,
      ...pkg.features.filter((f) => f.included).map((f) => f.label),
    ],
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <section className="relative flex items-center justify-center min-h-[360px] pt-24">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/granny/granny_background_8.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 z-0 bg-black/65" />
        <div className="relative z-10 text-center px-4">
          <span className="font-script text-primary text-3xl md:text-4xl mb-1 block">
            Party package
          </span>
          <h1 className="font-kaushan text-5xl md:text-6xl text-white capitalize mb-6 leading-tight">
            {pkg.name}
          </h1>
          <ol className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase text-white/80">
            <li>
              <a href="/" className="hover:text-primary transition-colors">
                Home
              </a>
            </li>
            <li className="text-white/40">/</li>
            <li>
              <a
                href="/catering"
                className="hover:text-primary transition-colors"
              >
                Catering
              </a>
            </li>
            <li className="text-white/40">/</li>
            <li className="text-primary">{pkg.name}</li>
          </ol>
        </div>
      </section>

      <div className="container mx-auto px-5 pt-12 sm:px-6 lg:px-12">
        <Link
          href="/catering"
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-ink/50 transition-colors hover:text-brand-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          All Options
        </Link>

        {/* Header */}
        <div className="mt-6 overflow-hidden rounded-none border border-border bg-brand-dark text-cream">
          <div className="flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              {pkg.badge ? (
                <span className="mb-3 inline-block rounded-full bg-brand-gold/20 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-brand-gold">
                  {pkg.badge}
                </span>
              ) : null}
              <h1 className="font-kaushan text-4xl uppercase tracking-[0.08em] sm:text-5xl">
                {pkg.name}
              </h1>
              <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-cream/75">
                {pkg.description}
              </p>
            </div>
            <div className="shrink-0 text-left sm:text-right">
              <p className="font-raleway text-4xl font-bold text-brand-gold">
                {pkg.pricePerHead}
                <span className="ml-1 text-sm font-normal text-cream/60">
                  / guest
                </span>
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-cream/60">
                Minimum {pkg.minGuests} guests
              </p>
            </div>
          </div>
        </div>

        {/* What's included */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pkg.features.map((feature) => (
            <div
              key={feature.label}
              className={`flex items-center gap-3 rounded-none border border-border px-4 py-3 text-sm ${
                feature.included
                  ? "bg-card text-ink"
                  : "bg-muted/50 text-ink/35"
              }`}
            >
              {feature.included ? (
                <Check className="h-4 w-4 shrink-0 text-brand-gold" />
              ) : (
                <X className="h-4 w-4 shrink-0 text-ink/25" />
              )}
              {feature.label}
            </div>
          ))}
        </div>

        {/* Dishes by course */}
        <div className="mt-12">
          <h2 className="font-kaushan text-2xl text-ink sm:text-3xl">
            Dishes in this package
          </h2>
          <p className="mt-2 text-sm font-light text-ink/60">
            Choose your dishes from each course when you confirm your order.
          </p>

          <div className="mt-8 space-y-10">
            {cateringCourses.map((course) => {
              const dishes = dishesForCourse(course.id);
              if (dishes.length === 0) {
                return null;
              }

              return (
                <section key={course.id}>
                  <div className="mb-4 flex items-baseline justify-between border-b border-border pb-2">
                    <h3 className="font-kaushan text-lg text-ink">
                      {course.label}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">
                      {dishes.length} options
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {dishes.map((dish) => (
                      <div
                        key={dish.id}
                        className="flex gap-3 rounded-none border border-border bg-card p-3"
                      >
                        {dish.img ? (
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm">
                            <Image
                              fill
                              src={dish.img}
                              alt={dish.name}
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        ) : null}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              role="img"
                              className={`flex h-3.5 w-3.5 items-center justify-center rounded-sm border ${
                                dish.diet === "veg"
                                  ? "border-emerald-600"
                                  : "border-red-600"
                              }`}
                              aria-label={
                                dish.diet === "veg" ? "Vegetarian" : "Non-veg"
                              }
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  dish.diet === "veg"
                                    ? "bg-emerald-600"
                                    : "bg-red-600"
                                }`}
                              />
                            </span>
                            <p className="truncate text-sm font-semibold text-ink">
                              {dish.name}
                            </p>
                          </div>
                          <p className="mt-1 line-clamp-2 text-xs font-light leading-relaxed text-ink/55">
                            {dish.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 rounded-none bg-accent px-6 py-10 text-center">
          <Leaf className="h-6 w-6 text-brand-gold" />
          <h2 className="font-kaushan text-2xl text-ink">
            Ready to book the {pkg.name} feast?
          </h2>
          <p className="max-w-md text-sm font-light leading-relaxed text-ink/60">
            Send us your date and guest count — we&apos;ll confirm dish choices
            and a final quote within one business day.
          </p>
          <RequestQuoteButton subject={quoteSubject} />
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-cream/95 p-3 backdrop-blur-md sm:hidden">
        <RequestQuoteButton
          subject={quoteSubject}
          label={`Request Quote · ${pkg.pricePerHead}/guest`}
          className="flex w-full items-center justify-center gap-2 bg-brand-gold px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-brand-dark"
        />
      </div>
    </div>
  );
}
