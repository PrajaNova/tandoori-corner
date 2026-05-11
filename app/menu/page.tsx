import type { Metadata } from "next";

import { AppShell } from "@/components/layout/AppShell";
import { MenuClient } from "./MenuClient";

export const metadata: Metadata = {
  description:
    "Explore Tandoori Corner's North Indian menu, chef signatures, curries, tandoori dishes, rice, breads, drinks, and sweets.",
  title: "Menu",
};

export default function MenuPage() {
  return (
    <AppShell>
      <MenuClient />
    </AppShell>
  );
}
