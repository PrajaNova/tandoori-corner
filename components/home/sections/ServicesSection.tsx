import { Bike, ChefHat, ShoppingBag, Utensils } from "lucide-react";

import { Separator } from "@/components/ui/separator";

const services = [
  { icon: Utensils, label: "Dine-In" },
  { icon: ShoppingBag, label: "Take Away" },
  { icon: Bike, label: "Home Delivery" },
  { icon: ChefHat, label: "Catering" },
];

export function ServicesSection() {
  return (
    <section className="bg-card py-12 text-brand-dark relative z-10">
      <div className="container mx-auto px-6 text-center max-w-5xl">
        <h2 className="font-space text-3xl font-bold mb-4">Our Services</h2>
        <Separator className="mx-auto mb-6 h-1 w-12 bg-curry" />
        <p className="text-gray-600 font-light mb-10 leading-relaxed max-w-2xl mx-auto">
          Tandoori Corner –Promises to serve fine dining quality North Indian
          food in a casual setting.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                className="flex flex-col items-center group"
                key={service.label}
              >
                <div className="w-16 h-16 mb-4 flex items-center justify-center text-leaf group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <h4 className="font-space font-bold text-lg text-brand-dark">
                  {service.label}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
