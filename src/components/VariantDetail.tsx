import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  LayoutTemplate,
  Palette,
  Type,
} from "lucide-react";
import { motion } from "motion/react";
import type { Variant } from "../data";

export function VariantDetail({ variant }: { variant: Variant }) {
  return (
    <motion.div
      key={variant.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-12 lg:p-16 max-w-5xl mx-auto space-y-20"
    >
      {/* Header */}
      <header className="space-y-6">
        <h1 className="text-6xl font-serif italic leading-[1.05] tracking-tighter text-[#1A1A1A]">
          {variant.name}
        </h1>
        <p className="text-lg leading-relaxed text-[#4A4A4A] max-w-3xl">
          {variant.tagline}
        </p>
      </header>

      {/* Hero Preview Mockup */}
      <section className="space-y-6">
        <h2 className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A]/50 flex items-center gap-2">
          <LayoutTemplate className="w-4 h-4" /> Hero Section Preview
        </h2>
        <div
          className={`relative w-full h-[450px] border border-[#1A1A1A]/10 overflow-hidden ${variant.heroMockup.bgStyle} flex items-center`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <div className="relative z-20 p-12 max-w-2xl space-y-8">
            <h2
              className={`text-5xl leading-[1.05] ${variant.heroMockup.textClass} ${variant.heroMockup.heroFontClass}`}
            >
              {variant.heroMockup.headline}
            </h2>
            <p
              className={`text-lg opacity-90 leading-relaxed ${variant.heroMockup.textClass}`}
            >
              {variant.heroMockup.subheadline}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button
                type="button"
                style={{
                  backgroundColor: variant.colors[1].hex,
                  color: variant.colors[2].hex,
                }}
                className="px-8 py-4 text-xs tracking-widest uppercase font-bold hover:opacity-90 transition-opacity"
              >
                {variant.heroMockup.primaryCta}
              </button>
              <button
                type="button"
                className={`text-xs tracking-widest uppercase font-bold flex items-center gap-2 hover:opacity-80 transition-opacity border-b-2 border-transparent hover:border-current pb-1 ${variant.heroMockup.textClass}`}
              >
                {variant.heroMockup.secondaryCta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Grid */}
      <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-[#1A1A1A]/10">
        <div className="space-y-6">
          <h2 className="text-3xl font-serif italic text-[#1A1A1A]">
            Strategic Focus
          </h2>
          <p className="text-[#4A4A4A] leading-relaxed text-lg">
            {variant.focus}
          </p>
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-serif italic text-[#1A1A1A]">
            Business Impact
          </h2>
          <div className="p-8 bg-[#FAF9F6] border border-[#1A1A1A]/10">
            <p className="text-[#4A4A4A] leading-relaxed text-lg">
              {variant.businessImpact}
            </p>
          </div>
        </div>
      </div>

      {/* Design System */}
      <section className="space-y-8 pt-8 border-t border-[#1A1A1A]/10">
        <h2 className="text-3xl font-serif italic text-[#1A1A1A]">
          Design System
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Colors */}
          <div className="space-y-8">
            <h3 className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A]/50 flex items-center gap-2">
              <Palette className="w-4 h-4" /> Color Palette
            </h3>
            <div className="grid grid-cols-3 gap-6">
              {variant.colors.map((color) => (
                <div key={color.hex} className="space-y-3">
                  <div
                    className="w-full aspect-square border border-[#1A1A1A]/10"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <p className="font-bold text-[#1A1A1A] text-xs uppercase tracking-widest">
                      {color.name}
                    </p>
                    <p className="font-mono text-[#1A1A1A]/50 text-[10px] uppercase mt-1">
                      {color.hex}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-8">
            <h3 className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A]/50 flex items-center gap-2">
              <Type className="w-4 h-4" /> Typography
            </h3>
            <div className="space-y-4">
              {variant.typography.map((type) => (
                <div
                  key={type.role}
                  className="p-6 border border-[#1A1A1A]/10 bg-white"
                >
                  <h4 className="text-[10px] text-[#1A1A1A]/50 uppercase tracking-widest font-bold">
                    {type.role}
                  </h4>
                  <p className="text-2xl font-serif italic text-[#1A1A1A] mt-2">
                    {type.font}
                  </p>
                  <p className="text-[#4A4A4A] text-sm mt-3 leading-relaxed">
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* User Journey */}
      <section className="space-y-8 pt-8 border-t border-[#1A1A1A]/10">
        <h2 className="text-3xl font-serif italic text-[#1A1A1A]">
          The User Journey
        </h2>
        <div className="relative">
          <div className="absolute left-[11px] top-4 bottom-4 w-px bg-[#1A1A1A]/10" />
          <div className="space-y-10">
            {variant.userJourney.map((step, idx) => {
              const [phase, ...descParts] = step.split(": ");
              const desc = descParts.join(": ");
              return (
                <div key={idx} className="relative pl-12 flex flex-col">
                  <div className="absolute left-0 top-1.5 w-6 h-6 bg-[#FAF9F6] border-2 border-[#1A1A1A] flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-[#1A1A1A] uppercase tracking-widest text-xs mb-2">
                    {phase}
                  </h4>
                  <p className="text-[#4A4A4A] text-lg leading-relaxed">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Page Structure */}
      <section className="space-y-8 pt-8 border-t border-[#1A1A1A]/10">
        <h2 className="text-3xl font-serif italic text-[#1A1A1A]">
          Page-by-Page Architecture
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {variant.pageStructure.map((page) => (
            <div
              key={page.page}
              className="p-8 border border-[#1A1A1A]/10 bg-white group hover:border-[#1A1A1A] transition-colors"
            >
              <h3 className="text-xl font-serif italic text-[#1A1A1A] flex items-center justify-between">
                {page.page}
                <ChevronRight className="w-5 h-5 text-[#1A1A1A]/20 group-hover:text-[#D97706] transition-colors" />
              </h3>
              <p className="text-sm text-[#4A4A4A] mt-3 mb-6 leading-relaxed">
                {page.purpose}
              </p>
              <ul className="space-y-3">
                {page.sections.map((sec, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-[#1A1A1A] flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#D97706] mt-0.5 shrink-0" />
                    <span className="font-medium">{sec}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-12 pb-16">
        <button
          type="button"
          className="w-full py-5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#D97706] transition-colors flex items-center justify-center gap-3"
        >
          Select {variant.name.split(": ")[0]}{" "}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
