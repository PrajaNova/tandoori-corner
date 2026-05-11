import { Clock, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-cream/10 border-t bg-ink px-4 pt-20 pb-10 text-cream">
      <div className="mx-auto mb-16 flex max-w-7xl flex-col justify-between gap-12 md:flex-row">
        <div className="w-full md:w-1/3">
          <Link
            className="mb-6 block font-serif font-bold text-3xl text-brand tracking-tight"
            href="/"
          >
            Tandoori Corner
          </Link>
          <p className="mb-8 max-w-sm text-cream/70 leading-relaxed">
            Experience the culinary heritage of North Indian cuisine. Crafted
            with passion, served with warmth.
          </p>
        </div>

        <div className="flex flex-col gap-12 md:flex-row md:gap-24">
          <div>
            <h4 className="mb-6 font-bold text-cream/50 text-xs uppercase tracking-widest">
              Balestier Outlet
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-cream/80">
                <MapPin className="mt-0.5 shrink-0 text-brand" size={18} />
                <span>
                  400 Balestier Road,
                  <br />
                  #01-12 Balestier Plaza,
                  <br />
                  Singapore 329802
                </span>
              </li>
              <li className="flex items-center space-x-3 text-cream/80">
                <Phone className="shrink-0 text-brand" size={18} />
                <span>+65 6250 0170</span>
              </li>
              <li className="flex items-start space-x-3 text-cream/80">
                <Clock className="mt-0.5 shrink-0 text-brand" size={18} />
                <span>
                  Tue - Sun: 11:30 AM - 10:00 PM
                  <br />
                  Closed on Mondays
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-cream/50 text-xs uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-4 text-cream/80 text-sm">
              <li>
                <Link
                  className="transition-colors hover:text-brand"
                  href="/menu"
                >
                  Menu & Order
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-brand"
                  href="/reservations"
                >
                  Reservations
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-brand" href="/">
                  Locations
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between border-cream/10 border-t pt-8 text-cream/50 text-xs md:flex-row">
        <p>Tandoori Corner Singapore. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
