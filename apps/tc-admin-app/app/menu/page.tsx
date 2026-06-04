import Link from "next/link";

import { DeleteButton } from "@/components/DeleteButton";
import { listCategories } from "@/lib/api";

export const dynamic = "force-dynamic";

function formatPrice(priceCents: number) {
  return `$${(priceCents / 100).toFixed(2)}`;
}

export default async function MenuAdminPage() {
  let categories: Awaited<ReturnType<typeof listCategories>> = [];
  let loadError: string | null = null;

  try {
    categories = await listCategories();
  } catch (error) {
    loadError = (error as Error).message;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Menu Catalog</h1>
        <div className="flex gap-3 text-sm">
          <Link
            href="/categories/new"
            className="rounded bg-black px-3 py-2 text-white"
          >
            + Category
          </Link>
          <Link
            href="/items/new"
            className="rounded bg-black px-3 py-2 text-white"
          >
            + Item
          </Link>
        </div>
      </div>

      {loadError ? (
        <div className="rounded border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          Could not load the catalog from the backend: {loadError}. Make sure
          rc-backend is running and its database is configured.
        </div>
      ) : null}

      {!loadError && categories.length === 0 ? (
        <p className="text-black/60">
          No categories yet. Add one to get started.
        </p>
      ) : null}

      {categories.map((category) => (
        <section
          key={category.id}
          className="rounded-lg border border-black/10 bg-white"
        >
          <header className="flex items-center justify-between border-b border-black/10 px-5 py-3">
            <div>
              <h2 className="text-lg font-semibold">
                {category.title}{" "}
                {category.status === "inactive" ? (
                  <span className="ml-2 rounded bg-black/10 px-2 py-0.5 text-xs">
                    inactive
                  </span>
                ) : null}
              </h2>
              <p className="text-sm text-black/50">
                {category.subtitle} · {category.slug} · {category.items.length}{" "}
                items
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link
                href={`/categories/${category.id}/edit`}
                className="hover:underline"
              >
                Edit
              </Link>
              <DeleteButton
                resource="categories"
                id={category.id}
                label={`category "${category.title}"`}
              />
            </div>
          </header>

          {category.items.length === 0 ? (
            <p className="px-5 py-4 text-sm text-black/50">No items.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/10 text-left text-black/50">
                  <th className="px-5 py-2 font-medium">Name</th>
                  <th className="px-5 py-2 font-medium">Price</th>
                  <th className="px-5 py-2 font-medium">Tags</th>
                  <th className="px-5 py-2 font-medium">Status</th>
                  <th className="px-5 py-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {category.items.map((item) => (
                  <tr key={item.id} className="border-b border-black/5">
                    <td className="px-5 py-2">{item.name}</td>
                    <td className="px-5 py-2">
                      {formatPrice(item.priceCents)}
                    </td>
                    <td className="px-5 py-2 text-black/60">
                      {item.tags.join(", ") || "—"}
                    </td>
                    <td className="px-5 py-2">{item.status}</td>
                    <td className="px-5 py-2">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/items/${item.id}/edit`}
                          className="hover:underline"
                        >
                          Edit
                        </Link>
                        <DeleteButton
                          resource="items"
                          id={item.id}
                          label={`item "${item.name}"`}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      ))}
    </div>
  );
}
