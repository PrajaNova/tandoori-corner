import { Facebook, Globe, Instagram, Twitter } from "lucide-react";
import { contact } from "@/lib/seo";

export function SocialLinks() {
  const socialPlatforms = [
    {
      Icon: Facebook,
      href: contact.social.facebook,
      label: "Tandoori Corner on Facebook",
    },
    {
      Icon: Twitter,
      href: contact.social.x,
      label: "Tandoori Corner on X",
    },
    {
      Icon: Instagram,
      href: contact.social.instagram,
      label: "Tandoori Corner on Instagram",
    },
    {
      Icon: Globe,
      href: contact.social.tripadvisor,
      label: "Tandoori Corner on TripAdvisor",
    },
  ];

  return (
    <div className="flex space-x-3">
      {socialPlatforms.map(({ Icon, href, label }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}
