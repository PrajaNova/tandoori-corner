import { X } from "lucide-react";

interface NavigationItem {
  href: string;
  label: string;
}

interface MobileDrawerProps {
  items: NavigationItem[];
}

export function MobileDrawer({ items }: MobileDrawerProps) {
  return (
    <>
      <label
        htmlFor="mobile-drawer-toggle"
        className="fixed inset-0 z-40 bg-black/60 opacity-0 pointer-events-none transition-opacity duration-300 peer-checked:opacity-100 peer-checked:pointer-events-auto min-[1080px]:hidden"
      />

      <div className="fixed left-0 top-0 z-50 h-full w-[82%] max-w-xs bg-ink text-white shadow-2xl -translate-x-full transition-transform duration-300 ease-in-out peer-checked:translate-x-0 min-[1080px]:hidden flex flex-col">
        {/* Drawer Links */}
        <nav className="flex flex-col px-2 py-4">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="border-b border-white/5 px-4 py-4 font-raleway text-sm font-bold uppercase tracking-widest transition-colors hover:text-primary text-white block"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="px-6 py-6 mt-auto">
          <a
            href="/order"
            className="flex w-full items-center justify-center bg-primary px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-ink text-center"
          >
            Order Online
          </a>
        </div>
      </div>
    </>
  );
}
