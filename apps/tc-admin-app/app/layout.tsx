import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "Tandoori Corner — Menu Admin",
  description: "Manage the Tandoori Corner menu catalog.",
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/menu", label: "Menu" },
  { href: "/menu/bulk-upload", label: "Bulk Upload" },
  { href: "/bookings", label: "Bookings" },
  { href: "/event-enquiries", label: "Event Enquiries" },
  { href: "/orders", label: "Orders" },
  { href: "/content", label: "Content" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Link
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-black"
        >
          Skip to Content
        </Link>
        <div className="min-h-screen lg:grid lg:grid-cols-[13rem_minmax(0,1fr)]">
          <aside className="border-black/10 border-b bg-[#17120f] text-white lg:sticky lg:top-0 lg:h-screen lg:border-r lg:border-b-0">
            <div className="flex h-full flex-col gap-3 p-3 lg:p-4">
              <nav aria-label="Admin sections" className="grid gap-1 text-sm">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="min-w-0 rounded-lg px-3 py-2.5 font-medium text-white/80 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#bf5820] focus-visible:outline-offset-2"
                  >
                    <span className="block truncate">{item.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-auto grid gap-3 border-white/10 border-t pt-4 text-sm">
                <Link
                  href="/items/new"
                  className="rounded-lg bg-[#bf5820] px-3 py-2.5 text-center font-medium text-white hover:bg-[#9e4418] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  New Item
                </Link>
              </div>
            </div>
          </aside>
          <main id="main" className="min-w-0 px-5 py-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
