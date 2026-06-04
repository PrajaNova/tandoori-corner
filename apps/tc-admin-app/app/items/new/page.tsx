import Link from "next/link";

import { ItemForm } from "@/components/ItemForm";
import { listCategories } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function NewItemPage() {
  const categories = await listCategories();
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
        <h1 className="mt-2 text-2xl font-semibold">New Item</h1>
      </div>
      {options.length === 0 ? (
        <p className="text-black/60">
          Create a category first before adding items.
        </p>
      ) : (
        <ItemForm mode="create" categories={options} />
      )}
    </div>
  );
}
