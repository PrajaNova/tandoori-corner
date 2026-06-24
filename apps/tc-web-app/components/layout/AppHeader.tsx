import { HeaderNav } from "@/components/layout/HeaderNav";
import { navigationItems } from "@/content/navigation";

export function AppHeader() {
  return <HeaderNav items={navigationItems} />;
}
