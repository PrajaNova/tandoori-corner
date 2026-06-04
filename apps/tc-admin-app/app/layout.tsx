import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "Tandoori Corner — Menu Admin",
  description: "Manage the Tandoori Corner menu catalog.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="border-b border-black/10 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/menu" className="text-lg font-semibold">
              Tandoori Corner · Menu Admin
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/menu" className="hover:underline">
                Menu
              </Link>
              <Link href="/categories/new" className="hover:underline">
                + Category
              </Link>
              <Link href="/items/new" className="hover:underline">
                + Item
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
