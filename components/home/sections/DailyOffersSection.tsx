"use client";

import { DailyOffers } from "../../DailyOffers";
import { offers } from "../home-content";

export function DailyOffersSection() {
  return <DailyOffers offers={offers} />;
}
