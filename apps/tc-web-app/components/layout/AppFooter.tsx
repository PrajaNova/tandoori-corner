import { Facebook, Instagram, Mail, Map, MapPin, Twitter } from "lucide-react";
import { buttonVariantsFor } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/typography";
import { contact } from "@/lib/seo";

export function AppFooter() {
  const socialLinkClass = buttonVariantsFor({
    className: "transition-all",
    size: "iconCircle",
    variant: "outline",
  });

  return (
    <footer className="bg-cream pt-24 pb-12 border-t border-border relative mt-auto">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        <div className="md:col-span-4">
          <span className="font-space text-2xl font-bold text-ink mb-6 block">
            Tandoori<span className="text-brand-gold">Corner</span>
          </span>
          <p className="text-ink/50 text-sm pr-8 leading-relaxed mb-8">
            Tucked inside Balestier Plaza, we offer both the lush pet-friendly
            alfresco balcony and the exclusive indoor TCB Bar for a premium
            dining experience.
          </p>
          <div className="flex gap-4">
            <a
              href={contact.social.instagram}
              className={`${socialLinkClass} hover:border-brand-gold hover:bg-brand-gold hover:text-brand-dark`}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={contact.social.facebook}
              className={`${socialLinkClass} hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-ink`}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={contact.social.x}
              className={`${socialLinkClass} hover:border-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-ink`}
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={contact.emailHref}
              className={`${socialLinkClass} hover:border-[#EA4335] hover:bg-[#EA4335] hover:text-ink`}
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="md:col-span-3 md:col-start-6">
          <Eyebrow className="mb-6 block text-ink/50">
            Contact & Logistics
          </Eyebrow>

          <div className="relative mb-6 h-40 w-full overflow-hidden border border-border bg-cream">
            <iframe
              src={contact.mapEmbedUrl}
              className="h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              title="Tandoori Corner map"
            />
            <a
              href={contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 bg-cream/90 px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-ink border border-border transition-colors hover:border-brand-gold/50"
            >
              View Map
            </a>
          </div>

          <ul className="space-y-4 text-sm text-ink/70">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-brand-gold shrink-0" />
              <span>{contact.addressDisplay}</span>
            </li>
            <li className="flex items-center gap-3 mt-4">
              <Map className="w-4 h-4 text-brand-gold shrink-0" />
              <a
                href={contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-border pb-0.5 hover:text-ink hover:border-border transition-colors"
              >
                Get Directions
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <Eyebrow className="mb-6 block text-ink/50">Service Hours</Eyebrow>
          <ul className="space-y-4 text-sm text-ink/70">
            <li className="flex justify-between border-b border-border pb-2">
              <span>Lunch Service</span>
              <span className="font-medium text-ink">12:00 PM - 2:45 PM</span>
            </li>
            <li className="flex justify-between border-b border-border pb-2 text-brand-gold/60 italic text-xs">
              <span>Kitchen Reset / Closed</span>
              <span>2:45 PM - 6:00 PM</span>
            </li>
            <li className="flex justify-between border-b border-border pb-2">
              <span>Evening & TCB Bar</span>
              <span className="font-medium text-ink">6:00 PM - 9:45 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ink/40">
        <p>
          &copy; {new Date().getFullYear()} Tandoori Corner. All Rights
          Reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="#top" className="hover:text-ink transition-colors">
            Privacy Policy
          </a>
          <a href="#top" className="hover:text-ink transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
