import { highlightsContent } from "@/content/highlights";
import { HighlightSection } from "./HighlightSection";

export function Highlights() {
  return (
    <>
      {highlightsContent.map((highlight) => (
        <HighlightSection
          key={highlight.id}
          cursive={highlight.cursive}
          heading={highlight.heading}
          description={highlight.description}
          price={highlight.price}
          ctaHref={highlight.ctaHref}
          ctaLabel={highlight.ctaLabel}
          images={highlight.images}
          imagePosition={highlight.imagePosition}
          className={highlight.paddingClass}
        />
      ))}
    </>
  );
}
