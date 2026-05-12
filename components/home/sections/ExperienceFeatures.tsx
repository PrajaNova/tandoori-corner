import {
  Bike,
  ChefHat,
  PawPrint,
  ShoppingBag,
  SquareParking,
  Utensils,
} from "lucide-react";

const experienceItems = [
  {
    icon: PawPrint,
    label: "Pet-Friendly Alfresco",
  },
  {
    icon: SquareParking,
    label: "Plenty of Parking",
  },
  { icon: Utensils, label: "Dine-In" },
  { icon: ShoppingBag, label: "Take Away" },
  { icon: Bike, label: "Home Delivery" },
  { icon: ChefHat, label: "Catering" },
];

export function ExperienceFeatures() {
  return (
    <section className="relative z-20 border-b border-border bg-cream">
      <div className="container mx-auto px-6 py-8 lg:px-12">
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {experienceItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                className="group flex flex-col items-center text-center"
                key={item.label}
              >
                <div className="mb-2 flex h-12 w-12 items-center justify-center text-leaf transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <h3 className="font-space text-lg leading-tight text-brand-dark">
                  {item.label}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
