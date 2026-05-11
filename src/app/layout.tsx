import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tandoori Corner",
  description:
    "Tandoori Corner restaurant experience, menu, ordering, and reservations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
