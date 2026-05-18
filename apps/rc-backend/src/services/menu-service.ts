export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
}

export interface MenuCategory {
  slug: string;
  title: string;
  subtitle: string;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    slug: "chefs-signatures",
    title: "Chef's Signatures",
    subtitle: "The Master's Touch",
    items: [
      {
        id: "tandoori-mixed-seafood-platter",
        name: "The Tandoori Mixed Seafood Platter",
        description:
          "Jumbo prawns, fish, and calamari marinated with handcrafted spice blends and fired in the tandoor.",
        price: 48,
        tags: ["Signature", "Sharing"],
      },
      {
        id: "reshmi-tandoori-chicken",
        name: "Reshmi Tandoori Chicken",
        description:
          "Tender chicken on the bone with yogurt, kashmiri chili, and garam masala.",
        price: 28,
        tags: ["Signature"],
      },
    ],
  },
  {
    slug: "curry-corner",
    title: "The Curry Corner",
    subtitle: "Silken & Robust Gravies",
    items: [
      {
        id: "og-butter-chicken",
        name: "OG Butter Chicken",
        description:
          "Tandoor-charred chicken in a rich slow-cooked tomato gravy finished with butter and cream.",
        price: 22,
        tags: ["Bestseller"],
      },
      {
        id: "saag-mutton",
        name: "Saag Mutton",
        description:
          "Tender mutton in spinach gravy with ginger, garlic, and gentle heat.",
        price: 24,
        tags: ["Heritage"],
      },
    ],
  },
];

export interface MenuService {
  listCategories: () => MenuCategory[];
  getCategory: (slug: string) => MenuCategory | undefined;
  getItem: (id: string) => MenuItem | undefined;
}

export function createMenuService(): MenuService {
  const itemsById = new Map(
    menuCategories.flatMap((category) =>
      category.items.map((item) => [item.id, item] as const),
    ),
  );

  return {
    listCategories: () => menuCategories,
    getCategory: (slug) =>
      menuCategories.find((category) => category.slug === slug),
    getItem: (id) => itemsById.get(id),
  };
}
