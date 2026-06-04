import Link from "next/link";
import { notFound } from "next/navigation";

import { CategoryForm } from "@/components/CategoryForm";
import { findCategory } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await findCategory(id);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/menu" className="text-sm text-black/50 hover:underline">
          ← Back to menu
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">Edit Category</h1>
      </div>
      <CategoryForm
        mode="edit"
        initial={{
          id: category.id,
          title: category.title,
          subtitle: category.subtitle,
          icon: category.icon,
          slug: category.slug,
          status: category.status,
          sortOrder: category.sortOrder,
        }}
      />
    </div>
  );
}
