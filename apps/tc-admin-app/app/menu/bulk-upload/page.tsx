import Link from "next/link";

import { BulkImageUpdater } from "@/components/BulkImageUpdater";
import { MenuCsvTools } from "@/components/MenuCsvTools";
import { listCategories } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function MenuBulkUploadPage() {
  let categories: Awaited<ReturnType<typeof listCategories>> = [];
  let loadError: string | null = null;

  try {
    categories = await listCategories();
  } catch (error) {
    loadError = (error as Error).message;
  }

  const items = categories.flatMap((category) => category.items);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">Bulk Upload</h1>
        <Link
          href="/menu"
          className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium hover:bg-black/5"
        >
          Back to menu
        </Link>
      </div>

      {loadError ? (
        <div className="rounded border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          Could not load the catalog from the backend: {loadError}. Make sure
          rc-backend is running and its database is configured.
        </div>
      ) : null}

      {!loadError ? (
        <MenuCsvTools
          items={items.map((item) => ({
            id: item.id,
            categoryId: item.categoryId,
            slug: item.slug,
            name: item.name,
            description: item.description,
            priceCents: item.priceCents,
            status: item.status,
            imageUrl: item.imageUrl,
            tags: item.tags,
            ingredients: item.ingredients,
            sortOrder: item.sortOrder,
          }))}
        />
      ) : null}

      {!loadError ? (
        <BulkImageUpdater
          items={items.map((item) => ({
            id: item.id,
            slug: item.slug,
            name: item.name,
            categoryTitle:
              categories.find((category) => category.id === item.categoryId)
                ?.title ?? "Menu",
            imageUrl: item.imageUrl,
          }))}
        />
      ) : null}
    </div>
  );
}
