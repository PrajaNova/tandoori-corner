"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type DeleteButtonProps = {
  resource: "categories" | "items";
  id: string;
  label: string;
};

export function DeleteButton({ resource, id, label }: DeleteButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!window.confirm(`Delete ${label}? This cannot be undone.`)) return;
    setError(null);

    const response = await fetch(`/api/${resource}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.message ?? "Delete failed.");
      return;
    }

    startTransition(() => router.refresh());
  }

  return (
    <span className="inline-flex flex-col items-end">
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="text-red-600 hover:underline disabled:opacity-50"
      >
        {isPending ? "Deleting…" : "Delete"}
      </button>
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </span>
  );
}
