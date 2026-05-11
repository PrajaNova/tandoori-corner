import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
