import { CalendarDays, MessageCircle, ShoppingBag } from "lucide-react";
import { restaurant } from "./site-data";

const actions = [
  {
    href: "/reserve",
    icon: CalendarDays,
    label: "Reserve Table",
  },
  {
    href: "/menu",
    icon: ShoppingBag,
    label: "Order Online",
  },
  {
    href: restaurant.whatsappHref,
    icon: MessageCircle,
    label: "WhatsApp",
  },
];

export function MobileActionStrip() {
  return (
    <nav
      aria-label="Quick booking actions"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-madison/95 px-2 py-2 text-white shadow-lifted backdrop-blur md:hidden"
    >
      <div className="grid grid-cols-3 gap-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <a
              className="inline-flex min-h-14 flex-col items-center justify-center gap-1 rounded-card border border-white/10 bg-white/6 px-2 text-center text-[0.68rem] font-black uppercase tracking-[0.05em] transition hover:border-brand hover:bg-brand hover:text-madison focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              href={action.href}
              key={action.label}
              rel={action.href.startsWith("http") ? "noreferrer" : undefined}
              target={action.href.startsWith("http") ? "_blank" : undefined}
            >
              <Icon aria-hidden="true" className="size-4" />
              {action.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
