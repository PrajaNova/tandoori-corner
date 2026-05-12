import type { Metadata } from "next";
import "./globals.css";
import { HomeChatBot } from "@/components/home/HomeChatBot";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";

export const metadata: Metadata = {
  title: {
    default: "Tandoori Corner | North Indian Curry House",
    template: "%s | Tandoori Corner",
  },
  description:
    "Tandoori Corner is a North Indian curry house at Balestier Plaza serving alfresco dining, home delivery, catering, and table bookings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body className="font-sans antialiased text-foreground bg-background selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col pt-safe">
        <AppHeader />
        <main className="flex-1 w-full">{children}</main>
        <AppFooter />
        <HomeChatBot />
      </body>
    </html>
  );
}
