import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/component/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tandoori Corner Singapore",
  description:
    "Tandoori Corner Singapore restaurant site with menu ordering and reservation flows.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
