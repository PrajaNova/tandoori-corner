import { Facebook, Globe2, Instagram, MapPin, Phone } from "lucide-react";

import { HeaderNav } from "@/components/layout/HeaderNav";
import { buttonVariantsFor } from "@/components/ui/button";
import { contact } from "@/lib/seo";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Our Menu" },
  { href: "/catering", label: "Catering" },
  { href: "/private-events", label: "Private Events" },
  { href: "/story", label: "Our Story" },
];

export function AppHeader() {
  const socialLinkClass = buttonVariantsFor({
    className:
      "h-6 w-6 border-0 text-cream/80 hover:bg-transparent hover:text-brand-gold focus-visible:ring-brand-gold",
    size: "iconCircle",
    variant: "ghost",
  });

  return (
    <>
      <div className="fixed top-0 z-[60] w-full border-b border-white/10 bg-brand-dark text-cream">
        <div className="container mx-auto flex h-9 items-center justify-between px-6 text-[11px] md:px-12">
          <a
            href={contact.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-cream/85 transition-colors hover:text-brand-gold"
          >
            <MapPin className="h-3.5 w-3.5" />
            <span className="hidden max-w-[330px] truncate md:inline">
              {contact.addressDisplay}
            </span>
          </a>

          <div className="flex items-center gap-3 text-cream/90">
            <a
              href={contact.phoneHref}
              className="inline-flex items-center gap-1.5 font-medium tracking-wide transition-colors hover:text-brand-gold"
              aria-label="Call Tandoori Corner"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{contact.phoneDisplay}</span>
            </a>
            <div className="h-3.5 w-px bg-cream/25" />
            <div className="flex items-center gap-1">
              <a
                href={contact.social.instagram}
                aria-label="Instagram"
                className={socialLinkClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a
                href={contact.social.facebook}
                aria-label="Facebook"
                className={socialLinkClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-3.5 w-3.5" />
              </a>
              <a
                href={contact.social.tripadvisor}
                aria-label="Tripadvisor"
                className={socialLinkClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe2 className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <HeaderNav items={navigationItems} />
    </>
  );
}
