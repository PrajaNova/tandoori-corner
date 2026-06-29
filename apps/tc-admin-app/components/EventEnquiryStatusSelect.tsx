"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { EventEnquiryStatus } from "@/lib/api";

type EventEnquiryStatusSelectProps = {
  id: string;
  status: EventEnquiryStatus;
};

const statuses: EventEnquiryStatus[] = [
  "new",
  "contacted",
  "confirmed",
  "cancelled",
  "closed",
];

export function EventEnquiryStatusSelect({
  id,
  status,
}: EventEnquiryStatusSelectProps) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function update(nextStatus: EventEnquiryStatus) {
    setValue(nextStatus);
    setError(null);
    const response = await fetch(`/api/event-enquiries/${id}/status`, {
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
        onChange={(event) => update(event.target.value as EventEnquiryStatus)}
        className="rounded border border-black/10 px-2 py-1 text-sm"
        aria-label="Event enquiry status"
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
