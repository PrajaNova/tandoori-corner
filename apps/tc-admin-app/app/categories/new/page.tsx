import Link from "next/link";

import { CategoryForm } from "@/components/CategoryForm";

export const dynamic = "force-dynamic";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/menu" className="text-sm text-black/50 hover:underline">
          ← Back to menu
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">New Category</h1>
      </div>
      <CategoryForm mode="create" />
    </div>
  );
}
