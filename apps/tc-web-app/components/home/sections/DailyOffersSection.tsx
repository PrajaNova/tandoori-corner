import { DailyOffers } from "@/components/home/DailyOffers";
import { offers } from "@/data/home";

export function DailyOffersSection() {
  return <DailyOffers offers={offers} />;
}
