"use client";

import { useRef, useState } from "react";

import { ItemForm } from "@/components/ItemForm";

type CategoryOption = { id: string; title: string };

type ItemEditDialogProps = {
  categories: CategoryOption[];
  item: {
    id: string;
    categoryId: string;
    name: string;
    description: string;
    story?: string;
    imageUrl?: string;
    priceCents: number;
    tags: string[];
    ingredients: string[];
    slug: string;
    status: "active" | "inactive";
    sortOrder: number;
  };
};

export function ItemEditDialog({ categories, item }: ItemEditDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        data-testid={`edit-item-${item.id}`}
        onClick={() => {
          setOpen(true);
          requestAnimationFrame(() => dialogRef.current?.showModal());
        }}
        className="hover:underline"
      >
        Edit
      </button>
      <dialog
        ref={dialogRef}
        className="edit-dialog"
        onClose={() => setOpen(false)}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#9e4418]">Menu item</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              Edit {item.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="rounded-full border border-black/10 px-3 py-1.5 text-sm hover:bg-black/5"
          >
            Close
          </button>
        </div>
        {open ? (
          <ItemForm
            mode="edit"
            categories={categories}
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
        ) : null}
      </dialog>
    </>
  );
}
