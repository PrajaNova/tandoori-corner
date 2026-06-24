import { NewsletterForm } from "@/components/layout/footer/NewsletterForm";
import { OpeningHours } from "@/components/layout/footer/OpeningHours";
import { SocialLinks } from "@/components/layout/footer/SocialLinks";
import { operationalHours } from "@/content/hours";
import { contact } from "@/lib/seo";

export function AppFooter() {
  return (
    <footer className="bg-[#1a1a1a] pt-24 pb-8 text-white relative mt-auto">
      {/* Top "Make A Reservation" tab */}
      <div className="absolute left-1/2 -top-[20px] -translate-x-1/2 w-[260px] h-[44px] bg-[#1a1a1a] rounded-t-[60px] flex items-center justify-center">
        <h3 className="font-script text-white text-2xl -mt-2">
          Make A Reservation
        </h3>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 mb-16 text-center">
          {/* Left Column: Our address */}
          <div className="flex flex-col items-center">
            <h3 className="font-script text-primary text-3xl mb-6">
              Our address
            </h3>
            <p className="text-muted-foreground text-sm leading-loose mb-6">
              400 Balestier Road #01-12
              <br />
              Balestier Plaza, Singapore 329802
            </p>
            <a
              href={contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold text-xs tracking-widest uppercase hover:text-white transition-colors"
            >
              View On Map
            </a>
          </div>

          {/* Center Column: Hours box */}
          <OpeningHours hours={operationalHours} />

          {/* Right Column: Contact us */}
          <div className="flex flex-col items-center">
            <h3 className="font-script text-primary text-3xl mb-6">
              Contact us
            </h3>
            <p className="text-muted-foreground text-sm leading-loose mb-6">
              Email: {contact.email}
              <br />
              Phone: {contact.phoneLandlineDisplay} / {contact.phoneDisplay}
            </p>
            <a
              href={contact.emailHref}
              className="text-primary font-bold text-xs tracking-widest uppercase hover:text-white transition-colors"
            >
              Send A Message
            </a>
          </div>
        </div>

        {/* Socials and Newsletter */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
          <SocialLinks />
          <NewsletterForm />
        </div>

        <div className="text-center text-xs text-white/40 pt-8 border-t border-white/10 font-light">
          © 2024 Tandoori Corner. North Indian Curry House, Singapore.
        </div>
      </div>
    </footer>
  );
}
