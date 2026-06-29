import { useEffect } from "react";
import { DrawerLink } from "@/components/layout/header/DrawerLink";

interface NavigationItem {
  href: string;
  label: string;
}

interface MobileDrawerProps {
  items: NavigationItem[];
  onClose: () => void;
  open: boolean;
}

export function MobileDrawer({ items, onClose, open }: MobileDrawerProps) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-200 min-[1080px]:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        aria-modal="true"
        className={`fixed left-0 top-0 z-50 flex h-full w-[82%] max-w-xs flex-col bg-ink text-white shadow-2xl transition-transform duration-200 ease-out min-[1080px]:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        id="mobile-drawer"
        role="dialog"
      >
        {/* Drawer Links */}
        <nav className="flex flex-col px-2 py-4">
          {items.map((item) => (
            <DrawerLink key={item.label} href={item.href} onClick={onClose}>
              {item.label}
            </DrawerLink>
          ))}
        </nav>

        {/* Mobile Order Button */}
        <div className="px-6 py-6 mt-auto">
          <a
            href="/order"
            onClick={onClose}
            className="flex w-full items-center justify-center bg-primary px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-ink text-center"
          >
            Order Online
          </a>
        </div>
      </div>
    </>
  );
}
