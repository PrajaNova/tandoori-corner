import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CateringPackage } from "@/data/catering";
import { getCateringPackages } from "@/lib/catering";
import { BuildYourOwnCard } from "./BuildYourOwnCard";
import { OptionCard } from "./OptionCard";

export async function CateringPackages({
  packages,
}: {
  packages?: CateringPackage[];
}) {
  const cateringPackages = packages ?? (await getCateringPackages());

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          cursiveText="Choose your menu"
          mainText="Pick a Package or Build Your Own"
        />
        <p className="mx-auto mb-14 max-w-2xl text-center leading-relaxed text-muted-foreground">
          Tap any package to see the full list of dishes, then request a
          tailored quote in a few clicks — or build a custom feast from our
          complete catering menu.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cateringPackages.map((pkg) => (
            <OptionCard key={pkg.id} pkg={pkg} />
          ))}
          <BuildYourOwnCard />
        </div>
      </div>
    </section>
  );
}
