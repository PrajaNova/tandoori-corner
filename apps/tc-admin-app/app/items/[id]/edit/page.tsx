import Link from "next/link";
import { notFound } from "next/navigation";

import { ItemForm } from "@/components/ItemForm";
import { findItem, listCategories } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function EditItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [found, categories] = await Promise.all([
    findItem(id),
    listCategories(),
  ]);
  if (!found) notFound();

  const { item } = found;
  const options = categories.map((category) => ({
    id: category.id,
    title: category.title,
  }));

  return (
    <div className="space-y-6">
      <div>
        <Link href="/menu" className="text-sm text-black/50 hover:underline">
          ← Back to menu
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">Edit Item</h1>
      </div>
      <ItemForm
        mode="edit"
        categories={options}
        initial={{
          id: item.id,
          categoryId: item.categoryId,
          name: item.name,
          description: item.description,
          story: item.story ?? "",
          imageUrl: item.imageUrl ?? "",
          priceDollars: (item.priceCents / 100).toFixed(2),
          tags: item.tags.join(", "),
          ingredients: item.ingredients.join(", "),
          slug: item.slug,
          status: item.status,
          sortOrder: item.sortOrder,
        }}
      />
    </div>
  );
}
