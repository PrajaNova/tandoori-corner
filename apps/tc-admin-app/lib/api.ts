export type AdminItem = {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  description: string;
  story?: string;
  imageUrl?: string;
  priceCents: number;
  currency: "SGD";
  tags: string[];
  ingredients: string[];
  status: "active" | "inactive";
  sortOrder: number;
};

export type AdminCategory = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  status: "active" | "inactive";
  sortOrder: number;
  items: AdminItem[];
};

export type CategoryInput = {
  title: string;
  subtitle: string;
  icon: string;
  slug?: string;
  status?: "active" | "inactive";
  sortOrder?: number;
};

export type ItemInput = {
  categoryId: string;
  name: string;
  description: string;
  priceCents: number;
  story?: string;
  imageUrl?: string;
  tags?: string[];
  ingredients?: string[];
  slug?: string;
  status?: "active" | "inactive";
  sortOrder?: number;
};

function baseUrl(): string {
  return process.env.RC_BACKEND_URL ?? "http://localhost:4000";
}

async function handle(response: Response) {
  if (response.status === 204) return null;
  const body = (await response.json().catch(() => ({}))) as {
    message?: string;
    error?: string;
  };
  if (!response.ok) {
    throw new Error(
      body.message ?? body.error ?? `Request failed (${response.status})`,
    );
  }
  return body;
}

export async function listCategories(): Promise<AdminCategory[]> {
  const response = await fetch(`${baseUrl()}/api/catalog/categories`, {
    cache: "no-store",
  });
  const body = (await handle(response)) as { categories: AdminCategory[] };
  return body.categories;
}

export async function findCategory(
  id: string,
): Promise<AdminCategory | undefined> {
  const categories = await listCategories();
  return categories.find((category) => category.id === id);
}

export async function findItem(
  id: string,
): Promise<{ item: AdminItem; category: AdminCategory } | undefined> {
  const categories = await listCategories();
  for (const category of categories) {
    const item = category.items.find((candidate) => candidate.id === id);
    if (item) return { item, category };
  }
  return undefined;
}

export async function createCategory(input: CategoryInput) {
  return handle(
    await fetch(`${baseUrl()}/api/catalog/categories`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    }),
  );
}

export async function updateCategory(
  id: string,
  input: Partial<CategoryInput>,
) {
  return handle(
    await fetch(`${baseUrl()}/api/catalog/categories/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    }),
  );
}

export async function deleteCategory(id: string) {
  return handle(
    await fetch(`${baseUrl()}/api/catalog/categories/${id}`, {
      method: "DELETE",
    }),
  );
}

export async function createItem(input: ItemInput) {
  return handle(
    await fetch(`${baseUrl()}/api/catalog/items`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    }),
  );
}

export async function updateItem(id: string, input: Partial<ItemInput>) {
  return handle(
    await fetch(`${baseUrl()}/api/catalog/items/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    }),
  );
}

export async function deleteItem(id: string) {
  return handle(
    await fetch(`${baseUrl()}/api/catalog/items/${id}`, {
      method: "DELETE",
    }),
  );
}

export const ICON_OPTIONS = [
  "chefHat",
  "flame",
  "leaf",
  "sparkles",
  "utensils",
  "glassWater",
  "shoppingBag",
] as const;
