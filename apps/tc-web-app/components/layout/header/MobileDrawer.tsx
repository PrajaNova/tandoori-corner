import { DrawerLink } from "@/components/layout/header/DrawerLink";

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
      {/* CSS-Only Backdrop (label targeting the checkbox to uncheck it on click) */}
      <label
        htmlFor="mobile-drawer-toggle"
        className="fixed inset-0 z-40 bg-black/60 opacity-0 pointer-events-none transition-opacity duration-300 peer-checked:opacity-100 peer-checked:pointer-events-auto min-[1080px]:hidden"
      />

      {/* CSS-Only Side Drawer */}
      <div className="fixed left-0 top-0 z-50 h-full w-[82%] max-w-xs bg-ink text-white shadow-2xl -translate-x-full transition-transform duration-300 ease-in-out peer-checked:translate-x-0 min-[1080px]:hidden flex flex-col">
        {/* Drawer Links */}
        <nav className="flex flex-col px-2 py-4">
          {items.map((item) => (
            <DrawerLink key={item.label} href={item.href}>
              {item.label}
            </DrawerLink>
          ))}
        </nav>

        {/* Mobile Order Button */}
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
