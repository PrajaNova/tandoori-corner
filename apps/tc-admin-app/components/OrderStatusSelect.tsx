"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { OrderStatus } from "@/lib/api";

type OrderStatusSelectProps = {
  id: string;
  status: OrderStatus;
};

const statuses: OrderStatus[] = [
  "pending_payment",
  "paid",
  "confirmed",
  "preparing",
  "ready",
  "completed",
  "cancelled",
];

export function OrderStatusSelect({ id, status }: OrderStatusSelectProps) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function update(nextStatus: OrderStatus) {
    setValue(nextStatus);
    setError(null);
    const response = await fetch(`/api/orders/${id}/status`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setValue(status);
      setError(body.message ?? "Status update failed.");
      return;
    }

    startTransition(() => router.refresh());
  }

  return (
    <span className="inline-flex flex-col gap-1">
      <select
        value={value}
        disabled={isPending}
        onChange={(event) => update(event.target.value as OrderStatus)}
        className="rounded border border-black/10 px-2 py-1 text-sm"
        aria-label="Order status"
      >
        {statuses.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </span>
  );
}
