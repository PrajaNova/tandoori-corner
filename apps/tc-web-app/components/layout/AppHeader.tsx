import { HeaderNav } from "@/components/layout/HeaderNav";

const navigationItems = [
  { href: "/", label: "HOME" },
  { href: "/story", label: "ABOUT" },
  { href: "/menu", label: "MENU" },
  { href: "#features", label: "FEATURES" },
  { href: "#gallery", label: "GALLERY" },
  { href: "#blog", label: "BLOG" },
  { href: "#shop", label: "SHOP" },
  { href: "#elements", label: "ELEMENTS" },
];

export function AppHeader() {
  return (
    <>
      <HeaderNav items={navigationItems} />
    </>
  );
}
