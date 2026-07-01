import {
  Accessibility,
  Car,
  PawPrint,
  Truck,
  Utensils,
  Wine,
} from "lucide-react";
import type { ElementType } from "react";

export interface Amenity {
  icon: ElementType;
  title: string;
  desc: string;
}

export const amenitiesContent = {
  cursiveText: "Why choose us",
  mainText: "Your Comfort, Our Priority",
  backgroundImage: "/granny/granny_background_1.webp",
  items: [
    {
      icon: Accessibility,
      title: "Wheelchair Accessible",
      desc: "Our ground-floor entrance and dining areas are accessible for a comfortable visit.",
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
  ],
};
