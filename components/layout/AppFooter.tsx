import { Facebook, Instagram, Mail, Map, MapPin, Twitter } from "lucide-react";

export function AppFooter() {
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
              href="#top"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold hover:text-brand-dark transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#top"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-ink transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#top"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-ink transition-all"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#top"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[#EA4335] hover:border-[#EA4335] hover:text-ink transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="md:col-span-3 md:col-start-6">
          <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink/50 mb-6">
            Contact & Logistics
          </h4>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative w-full h-32 bg-cream mb-6 overflow-hidden border border-border group cursor-pointer hover:border-brand-gold transition-colors"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-all duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-gold blur-lg opacity-40 animate-pulse rounded-full" />
                <MapPin
                  className="relative w-10 h-10 text-brand-gold drop-shadow-2xl group-hover:-translate-y-2 group-hover:scale-110 transition-transform duration-300"
                  strokeWidth={1.5}
                  fill="#faf8f5"
                />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-cream/80 backdrop-blur-sm px-2 py-1 text-[8px] uppercase tracking-widest font-bold text-ink border border-border group-hover:border-brand-gold/50 transition-colors">
              View Map
            </div>
          </a>

          <ul className="space-y-4 text-sm text-ink/70">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-brand-gold shrink-0" />
              <span>
                400 Balestier Road
                <br />
                Balestier Plaza
                <br />
                Singapore 329802
              </span>
            </li>
            <li className="flex items-center gap-3 mt-4">
              <Map className="w-4 h-4 text-brand-gold shrink-0" />
              <a
                href="https://maps.google.com"
                className="border-b border-border pb-0.5 hover:text-ink hover:border-border transition-colors"
              >
                Get Directions
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink/50 mb-6">
            Service Hours
          </h4>
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
