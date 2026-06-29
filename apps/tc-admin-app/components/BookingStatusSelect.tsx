"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { BookingStatus } from "@/lib/api";

type BookingStatusSelectProps = {
  id: string;
  status: BookingStatus;
};

const statuses: BookingStatus[] = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
];

export function BookingStatusSelect({ id, status }: BookingStatusSelectProps) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function update(nextStatus: BookingStatus) {
    setValue(nextStatus);
    setError(null);
    const response = await fetch(`/api/bookings/${id}/status`, {
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
        onChange={(event) => update(event.target.value as BookingStatus)}
        className="rounded border border-black/10 px-2 py-1 text-sm"
        aria-label="Booking status"
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
