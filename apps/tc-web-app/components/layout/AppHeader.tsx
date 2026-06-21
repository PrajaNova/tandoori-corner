import { HeaderNav } from "@/components/layout/HeaderNav";

const navigationItems = [
  { href: "/", label: "HOME" },
  { href: "/menu", label: "MENU" },
  { href: "/story", label: "ABOUT" },
  { href: "/order", label: "ORDER ONLINE" },
  { href: "/private-events", label: "EVENT SPACE" },
  { href: "/catering", label: "CATERING" },
];

export function AppHeader() {
  return (
    <>
      <HeaderNav items={navigationItems} />
    </>
  );
}
