import { Car, PawPrint, Accessibility, Utensils, Wine, Truck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const amenities = [
  {
    icon: Accessibility,
    title: "Wheelchair Accessible",
    desc: "Our ground-floor entrance and dining areas are fully accessible, ensuring every guest enjoys a comfortable visit.",
  },
  {
    icon: Car,
    title: "Ample Parking",
    desc: "Balestier Plaza offers convenient covered parking right at our doorstep, seven days a week.",
  },
  {
    icon: PawPrint,
    title: "Pet-Friendly Alfresco",
    desc: "Bring your furry companions — our beloved balcony alfresco terrace warmly welcomes well-behaved pets.",
  },
  {
    icon: Utensils,
    title: "Dine-In & Take Away",
    desc: "Savour your meal in our relaxed indoor or alfresco setting, or let us pack your favourites for home.",
  },
  {
    icon: Wine,
    title: "TCB Bar & Lounge",
    desc: "Unwind at our stylish TCB indoor bar featuring curated cocktails, wines and a refined dining room for every occasion.",
  },
  {
    icon: Truck,
    title: "Home Delivery & Catering",
    desc: "We deliver across Singapore and provide full-service catering for corporate events, weddings and private celebrations.",
  },
];

export function GrannyAmenities() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading
          cursiveText="Why choose us"
          mainText="Your Comfort, Our Priority"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14 mt-14 text-center">
          {amenities.map((item) => (
            <div key={item.title} className="flex flex-col items-center">
              <div className="mb-6 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <item.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-raleway text-base font-bold uppercase tracking-wide mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
