"use client";

import { offers } from "@/data/home";
import { DailyOffers } from "../../DailyOffers";

export function DailyOffersSection() {
  return <DailyOffers offers={offers} />;
}
