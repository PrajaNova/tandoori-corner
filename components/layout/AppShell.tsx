import type { ReactNode } from "react";

import { HomeChatBot } from "@/components/home/HomeChatBot";

import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div
      id="top"
      className="font-sans antialiased text-foreground bg-background selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col pt-safe"
    >
      <AppHeader />
      <main className="flex-1 w-full">{children}</main>
      <AppFooter />
      <HomeChatBot />
    </div>
  );
}
