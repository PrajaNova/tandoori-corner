"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

type DeleteButtonProps = {
  resource: "categories" | "items";
  id: string;
  label: string;
};

export function DeleteButton({ resource, id, label }: DeleteButtonProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setError(null);

    const response = await fetch(`/api/${resource}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.message ?? "Delete failed.");
      return;
    }

    dialogRef.current?.close();
    startTransition(() => router.refresh());
  }

  return (
    <span className="inline-flex flex-col items-end">
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        disabled={isPending}
        className="text-red-600 hover:underline disabled:opacity-50"
      >
        {isPending ? "Deleting…" : "Delete"}
      </button>
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
      <dialog ref={dialogRef} className="confirm-dialog">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-red-700">Delete item</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">
              Delete {label}?
            </h2>
            <p className="mt-2 text-sm text-black/60">
              This cannot be undone. Existing customer pages update immediately.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="rounded-full bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:opacity-50"
            >
              {isPending ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      </dialog>
    </span>
  );
}
