import Link from "next/link";

import { DeleteButton } from "@/components/DeleteButton";
import { ItemEditDialog } from "@/components/ItemEditDialog";
import { listCategories } from "@/lib/api";

export const dynamic = "force-dynamic";

function formatPrice(priceCents: number) {
  return `$${(priceCents / 100).toFixed(2)}`;
}

type MenuSearchParams = Promise<Record<string, string | string[] | undefined>>;

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function MenuAdminPage({
  searchParams,
}: {
  searchParams?: MenuSearchParams;
}) {
  let categories: Awaited<ReturnType<typeof listCategories>> = [];
  let loadError: string | null = null;
  const params = await searchParams;
  const query = (firstParam(params?.q) ?? "").trim();
  const normalizedQuery = query.toLowerCase();
  const categoryFilter = firstParam(params?.category) ?? "";
  const statusFilter = firstParam(params?.status) ?? "all";
  const imageFilter = firstParam(params?.image) ?? "all";

  try {
    categories = await listCategories();
  } catch (error) {
    loadError = (error as Error).message;
  }

  const items = categories.flatMap((category) => category.items);
  const activeItems = items.filter((item) => item.status === "active");
  const vegetarianItems = items.filter((item) =>
    item.tags.includes("Vegetarian"),
  );
  const drinks = categories
    .filter((category) =>
      [
        "beer",
        "wines",
        "soft-drinks",
        "hard-drinks",
        "fruit-juice",
        "lassi",
      ].includes(category.slug),
    )
    .reduce((total, category) => total + category.items.length, 0);
  const latestCategory = categories.at(-1);
  const categoryOptions = categories.map((category) => ({
    id: category.id,
    title: category.title,
  }));
  const filteredCategories = categories
    .filter((category) => !categoryFilter || category.id === categoryFilter)
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => {
        const text = [
          category.title,
          item.name,
          item.slug,
          item.description,
          ...item.tags,
          ...item.ingredients,
        ]
          .join(" ")
          .toLowerCase();
        const matchesQuery = !normalizedQuery || text.includes(normalizedQuery);
        const matchesStatus =
          statusFilter === "all" || item.status === statusFilter;
        const matchesImage =
          imageFilter === "all" ||
          (imageFilter === "missing" ? !item.imageUrl : Boolean(item.imageUrl));
        return matchesQuery && matchesStatus && matchesImage;
      }),
    }))
    .filter((category) => category.items.length > 0);
  const filteredItems = filteredCategories.flatMap(
    (category) => category.items,
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">Menu Catalog</h1>
        <div className="flex gap-2 text-sm">
          <Link
            href="/categories/new"
            className="rounded-full border border-black/10 bg-white px-4 py-2 font-medium hover:bg-black/5"
          >
            + Category
          </Link>
          <Link
            href="/items/new"
            className="rounded-full bg-[#bf5820] px-4 py-2 font-medium text-white hover:bg-[#9e4418]"
          >
            + Item
          </Link>
          <Link
            href="/menu/bulk-upload"
            className="rounded-full bg-black px-4 py-2 font-medium text-white hover:bg-black/80"
          >
            Bulk upload
          </Link>
        </div>
      </div>

      {!loadError ? (
        <section className="grid gap-3 md:grid-cols-4">
          <Metric
            label="Categories"
            value={categories.length}
            detail={latestCategory?.title ?? "No categories"}
          />
          <Metric
            label="Active items"
            value={activeItems.length}
            detail={`${items.length} total`}
          />
          <Metric
            label="Vegetarian"
            value={vegetarianItems.length}
            detail="Tagged for quick filtering"
          />
          <Metric
            label="Drinks"
            value={drinks}
            detail="Bar and beverage items"
          />
        </section>
      ) : null}

      {!loadError ? (
        <form
          action="/menu"
          className="grid gap-3 rounded-xl border border-black/10 bg-white p-4 md:grid-cols-[1.5fr_1fr_0.8fr_0.8fr_auto_auto]"
        >
          <input
            name="q"
            defaultValue={query}
            className="input"
            placeholder="Search item, tag, ingredient..."
          />
          <select
            name="category"
            defaultValue={categoryFilter}
            className="input"
          >
            <option value="">All categories</option>
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          <select name="status" defaultValue={statusFilter} className="input">
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select name="image" defaultValue={imageFilter} className="input">
            <option value="all">All images</option>
            <option value="missing">Missing image</option>
            <option value="with-image">Has image</option>
          </select>
          <button
            type="submit"
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80"
          >
            Filter
          </button>
          <Link
            href="/menu"
            className="rounded-full border border-black/10 px-4 py-2 text-center text-sm font-medium hover:bg-black/5"
          >
            Clear
          </Link>
          <p className="md:col-span-full text-sm text-black/55">
            Showing {filteredItems.length} of {items.length} items
          </p>
        </form>
      ) : null}

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

      {!loadError && categories.length > 0 && filteredItems.length === 0 ? (
        <p className="rounded-xl border border-black/10 bg-white p-5 text-sm text-black/60">
          No menu items match this search.
        </p>
      ) : null}

      <div className="grid gap-4">
        {filteredCategories.map((category) => (
          <section
            key={category.id}
            className="overflow-hidden rounded-xl border border-black/10 bg-white"
          >
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 bg-[#fbfaf7] px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  {category.title}{" "}
                  {category.status === "inactive" ? (
                    <span className="ml-2 rounded bg-black/10 px-2 py-0.5 text-xs">
                      inactive
                    </span>
                  ) : null}
                </h2>
                <p className="text-sm text-black/55">
                  {category.subtitle} · {category.slug} ·{" "}
                  {category.items.length} items
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
                  <tr className="border-b border-black/10 bg-white text-left text-black/50">
                    <th className="px-5 py-2 font-medium">Name</th>
                    <th className="px-5 py-2 font-medium">Price</th>
                    <th className="px-5 py-2 font-medium">Tags</th>
                    <th className="px-5 py-2 font-medium">Status</th>
                    <th className="px-5 py-2 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {category.items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-black/5 hover:bg-[#fbfaf7]"
                    >
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
                          <ItemEditDialog
                            categories={categoryOptions}
                            item={item}
                          />
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
    </div>
  );
}

function Metric({
  label,
  value,
  detail,
}: {
  label: string;
  value: number;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4">
      <div className="text-sm text-black/55">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-black/45">{detail}</div>
    </div>
  );
}
