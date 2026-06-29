"use client";

import { ArrowLeft, Check, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FormField } from "@/components/common/forms/FormField";
import {
  cateringCourses,
  cateringMenu,
  type CateringDish,
  type Diet,
} from "@/data/catering";
import { contact } from "@/lib/seo";

type Step = "select" | "review" | "done";
type CourseFilter = "all" | string;
type DietFilter = "all" | Diet;

const inputClassName =
  "w-full border-b border-border bg-transparent pb-2 text-ink placeholder:text-ink/30 focus:border-brand-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/30";

function DietDot({ diet }: { diet: Diet }) {
  const isVeg = diet === "veg";
  return (
    <span
      role="img"
      className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border ${
        isVeg ? "border-emerald-600" : "border-red-600"
      }`}
      aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isVeg ? "bg-emerald-600" : "bg-red-600"
        }`}
      />
    </span>
  );
}

export function BuildClient() {
  const [step, setStep] = useState<Step>("select");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [courseFilter, setCourseFilter] = useState<CourseFilter>("all");
  const [dietFilter, setDietFilter] = useState<DietFilter>("all");
  const [submitted, setSubmitted] = useState(false);
  const [mailtoHref, setMailtoHref] = useState("");

  const filteredDishes = useMemo(
    () =>
      cateringMenu.filter((dish) => {
        const courseOk = courseFilter === "all" || dish.course === courseFilter;
        const dietOk = dietFilter === "all" || dish.diet === dietFilter;
        return courseOk && dietOk;
      }),
    [courseFilter, dietFilter],
  );

  const selectedDishes = useMemo(
    () => cateringMenu.filter((dish) => selectedIds.includes(dish.id)),
    [selectedIds],
  );

  function toggleDish(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const lines = cateringCourses.flatMap((course) => {
      const dishes = selectedDishes.filter((d) => d.course === course.id);
      if (dishes.length === 0) return [];
      return [`${course.label}:`, ...dishes.map((d) => `  • ${d.name}`)];
    });

    const bodyLines = [
      "Build Your Own catering enquiry",
      "",
      ...lines,
      "",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email")}`,
      `Guests: ${data.get("guests")}`,
      `Event date: ${data.get("date")}`,
      data.get("notes") ? `Notes: ${data.get("notes")}` : "",
    ].filter(Boolean);

    const href = `${contact.emailHref}?subject=${encodeURIComponent(
      "Catering Quote — Build Your Own",
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    setMailtoHref(href);
    setSubmitted(true);
    setStep("done");
  }

  return (
    <div className="min-h-screen bg-background pb-32">
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
            Build your feast
          </span>
          <h1 className="font-kaushan text-5xl md:text-6xl text-white capitalize mb-6 leading-tight">
            Custom Catering Menu
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
            <li className="text-primary">Build</li>
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

        {/* Stepper */}
        <div className="mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
          {(["select", "review", "done"] as const).map((s, index) => {
            const labels = ["Choose dishes", "Review & date", "Done"];
            const active = step === s;
            const passed =
              (["select", "review", "done"] as const).indexOf(step) > index;
            return (
              <div key={s} className="flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    active || passed
                      ? "bg-brand-gold text-brand-dark"
                      : "bg-muted text-ink/40"
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={active ? "text-ink" : "text-ink/40"}
                >
                  {labels[index]}
                </span>
                {index < 2 ? <span className="text-ink/20">—</span> : null}
              </div>
            );
          })}
        </div>

        {step === "select" ? (
          <div className="mt-8">
            <h2 className="font-kaushan text-3xl text-ink sm:text-4xl">
              Build Your Own Feast
            </h2>
            <p className="mt-2 max-w-xl text-sm font-light leading-7 text-ink/60">
              Pick the dishes you love. Filter by course and veg / non-veg, then
              review and request a quote.
            </p>

            {/* Filters */}
            <div className="mt-7 flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                <FilterChip
                  active={courseFilter === "all"}
                  onClick={() => setCourseFilter("all")}
                >
                  All Courses
                </FilterChip>
                {cateringCourses.map((course) => (
                  <FilterChip
                    key={course.id}
                    active={courseFilter === course.id}
                    onClick={() => setCourseFilter(course.id)}
                  >
                    {course.label}
                  </FilterChip>
                ))}
              </div>

              <div className="flex gap-2">
                <FilterChip
                  active={dietFilter === "all"}
                  onClick={() => setDietFilter("all")}
                >
                  All
                </FilterChip>
                <FilterChip
                  active={dietFilter === "veg"}
                  onClick={() => setDietFilter("veg")}
                >
                  🟢 Veg
                </FilterChip>
                <FilterChip
                  active={dietFilter === "nonveg"}
                  onClick={() => setDietFilter("nonveg")}
                >
                  🔴 Non-Veg
                </FilterChip>
              </div>
            </div>

            {/* Dish grid */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDishes.map((dish) => {
                const selected = selectedIds.includes(dish.id);
                return (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    selected={selected}
                    onToggle={() => toggleDish(dish.id)}
                  />
                );
              })}
            </div>

            {filteredDishes.length === 0 ? (
              <p className="mt-10 text-center text-sm text-ink/50">
                No dishes match that filter.
              </p>
            ) : null}
          </div>
        ) : null}

        {step === "review" ? (
          <ReviewStep
            selectedDishes={selectedDishes}
            onRemove={toggleDish}
            onBack={() => setStep("select")}
            onSubmit={handleSubmit}
            inputClassName={inputClassName}
          />
        ) : null}

        {step === "done" && submitted ? (
          <div className="mx-auto mt-16 flex max-w-md flex-col items-center gap-4 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
              <Check className="h-8 w-8" />
            </span>
            <h2 className="font-kaushan text-3xl text-ink">
              Almost there!
            </h2>
            <p className="text-sm font-light leading-relaxed text-ink/60">
              Tap below to send your menu — our catering team will reply within
              one business day with a tailored quote. Prefer to talk? Call{" "}
              <a href={contact.phoneHref} className="font-semibold text-brand-gold">
                {contact.phoneDisplay}
              </a>
              .
            </p>
            <a
              href={mailtoHref}
              className="mt-2 w-full bg-brand-gold px-6 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-brand-dark transition-colors hover:bg-brand-dark hover:text-cream"
            >
              Send Enquiry Email
            </a>
            <Link
              href="/catering"
              className="text-[11px] font-bold uppercase tracking-widest text-ink/40 hover:text-ink"
            >
              Back to options
            </Link>
          </div>
        ) : null}
      </div>

      {/* Sticky select bar */}
      {step === "select" ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-cream/95 backdrop-blur-md">
          <div className="container mx-auto flex items-center justify-between gap-4 px-5 py-3.5 sm:px-6 lg:px-12">
            <span className="text-sm font-medium text-ink">
              <span className="font-raleway text-xl font-bold text-brand-gold">
                {selectedIds.length}
              </span>{" "}
              dish{selectedIds.length === 1 ? "" : "es"} selected
            </span>
            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={() => setStep("review")}
              className="bg-brand-gold px-7 py-3 text-xs font-bold uppercase tracking-widest text-brand-dark transition-colors hover:bg-brand-dark hover:text-cream disabled:cursor-not-allowed disabled:opacity-50"
            >
              Review Selection
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${
        active
          ? "bg-brand-dark text-cream"
          : "border border-border bg-card text-ink/60 hover:border-primary hover:text-brand-gold"
      }`}
    >
      {children}
    </button>
  );
}

function DishCard({
  dish,
  selected,
  onToggle,
}: {
  dish: CateringDish;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`flex gap-3 rounded-none border bg-card p-3 transition-colors ${
        selected ? "border-brand-gold" : "border-border"
      }`}
    >
      {dish.img ? (
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm">
          <Image
            fill
            src={dish.img}
            alt={dish.name}
            className="object-cover"
            sizes="80px"
          />
        </div>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2">
          <DietDot diet={dish.diet} />
          <p className="truncate text-sm font-semibold text-ink">{dish.name}</p>
        </div>
        <p className="mt-1 line-clamp-2 flex-1 text-xs font-light leading-relaxed text-ink/55">
          {dish.desc}
        </p>
        <button
          type="button"
          onClick={onToggle}
          className={`mt-2 inline-flex w-fit items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${
            selected
              ? "bg-brand-gold text-brand-dark"
              : "border border-border text-ink/60 hover:border-primary hover:text-brand-gold"
          }`}
        >
          {selected ? (
            <>
              <Check className="h-3 w-3" /> Added
            </>
          ) : (
            <>
              <Plus className="h-3 w-3" /> Add
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function ReviewStep({
  selectedDishes,
  onRemove,
  onBack,
  onSubmit,
  inputClassName,
}: {
  selectedDishes: CateringDish[];
  onRemove: (id: string) => void;
  onBack: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  inputClassName: string;
}) {
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      {/* Selected list grouped by course */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-kaushan text-2xl text-ink sm:text-3xl">
            Review your menu
          </h2>
          <button
            type="button"
            onClick={onBack}
            className="text-[11px] font-bold uppercase tracking-widest text-brand-gold hover:underline"
          >
            + Add more
          </button>
        </div>

        <div className="mt-6 space-y-7">
          {cateringCourses.map((course) => {
            const dishes = selectedDishes.filter((d) => d.course === course.id);
            if (dishes.length === 0) return null;
            return (
              <section key={course.id}>
                <h3 className="mb-3 border-b border-border pb-2 font-kaushan text-base text-ink">
                  {course.label}
                </h3>
                <ul className="space-y-2">
                  {dishes.map((dish) => (
                    <li
                      key={dish.id}
                      className="flex items-center justify-between gap-3 rounded-none border border-border bg-card px-4 py-2.5"
                    >
                      <span className="flex items-center gap-2 text-sm text-ink">
                        <DietDot diet={dish.diet} />
                        {dish.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemove(dish.id)}
                        className="text-ink/40 transition-colors hover:text-red-500"
                        aria-label={`Remove ${dish.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>

      {/* Quote form */}
      <div className="h-fit rounded-none border border-border bg-card p-6 lg:sticky lg:top-28">
        <h2 className="font-kaushan text-xl text-ink">
          Your details
        </h2>
        <p className="mt-1 text-xs font-light text-ink/55">
          Pick your event date and we&apos;ll send a tailored quote.
        </p>

        <form onSubmit={onSubmit} className="mt-5 space-y-5">
          <FormField label="Event Date" htmlFor="date" required>
            <input
              id="date"
              name="date"
              type="date"
              required
              className={inputClassName}
            />
          </FormField>
          <div className="grid grid-cols-2 gap-5">
            <FormField label="Guests" htmlFor="guests" required>
              <input
                id="guests"
                name="guests"
                inputMode="numeric"
                type="number"
                min={1}
                required
                placeholder="30"
                className={inputClassName}
              />
            </FormField>
            <FormField label="Phone" htmlFor="phone" required>
              <input
                id="phone"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                type="tel"
                required
                placeholder="+65 9XXX XXXX"
                className={inputClassName}
              />
            </FormField>
          </div>
          <FormField label="Full Name" htmlFor="name" required>
            <input
              id="name"
              name="name"
              autoComplete="name"
              type="text"
              required
              placeholder="Priya Sharma"
              className={inputClassName}
            />
          </FormField>
          <FormField label="Email" htmlFor="email" required>
            <input
              id="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              type="email"
              required
              placeholder="you@email.com"
              className={inputClassName}
            />
          </FormField>
          <FormField label="Notes / Dietary Needs" htmlFor="notes">
            <textarea
              id="notes"
              name="notes"
              rows={2}
              placeholder="Jain options, allergies, delivery vs on-site…"
              className={`${inputClassName} resize-none`}
            />
          </FormField>

          <button
            type="submit"
            className="w-full bg-brand-gold px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-brand-dark transition-colors hover:bg-brand-dark hover:text-cream"
          >
            Request Quote
          </button>
        </form>
      </div>
    </div>
  );
}
