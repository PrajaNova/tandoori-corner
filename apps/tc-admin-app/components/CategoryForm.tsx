"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ICON_OPTIONS } from "@/lib/api";

type CategoryFormValues = {
  id?: string;
  title: string;
  subtitle: string;
  icon: string;
  slug?: string;
  status: "active" | "inactive";
  sortOrder?: number;
};

type CategoryFormProps = {
  mode: "create" | "edit";
  initial?: CategoryFormValues;
};

export function CategoryForm({ mode, initial }: CategoryFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState<CategoryFormValues>({
    title: initial?.title ?? "",
    subtitle: initial?.subtitle ?? "",
    icon: initial?.icon ?? ICON_OPTIONS[0],
    slug: initial?.slug ?? "",
    status: initial?.status ?? "active",
    sortOrder: initial?.sortOrder,
  });

  function update<K extends keyof CategoryFormValues>(
    key: K,
    value: CategoryFormValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload: Record<string, unknown> = {
      title: values.title,
      subtitle: values.subtitle,
      icon: values.icon,
      status: values.status,
    };
    if (values.slug) payload.slug = values.slug;
    if (typeof values.sortOrder === "number")
      payload.sortOrder = values.sortOrder;

    const url =
      mode === "create" ? "/api/categories" : `/api/categories/${initial?.id}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const response = await fetch(url, {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.message ?? "Save failed.");
      setSubmitting(false);
      return;
    }

    router.push("/menu");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      {error ? (
        <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <Field label="Title">
        <input
          required
          value={values.title}
          onChange={(event) => update("title", event.target.value)}
          className="input"
        />
      </Field>

      <Field label="Subtitle">
        <input
          required
          value={values.subtitle}
          onChange={(event) => update("subtitle", event.target.value)}
          className="input"
        />
      </Field>

      <Field label="Icon">
        <select
          value={values.icon}
          onChange={(event) => update("icon", event.target.value)}
          className="input"
        >
          {ICON_OPTIONS.map((icon) => (
            <option key={icon} value={icon}>
              {icon}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Slug (optional — derived from title if blank)">
        <input
          value={values.slug}
          onChange={(event) => update("slug", event.target.value)}
          className="input"
          placeholder="auto"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Status">
          <select
            value={values.status}
            onChange={(event) =>
              update("status", event.target.value as "active" | "inactive")
            }
            className="input"
          >
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </Field>

        <Field label="Sort order (optional)">
          <input
            type="number"
            value={values.sortOrder ?? ""}
            onChange={(event) =>
              update(
                "sortOrder",
                event.target.value === ""
                  ? undefined
                  : Number(event.target.value),
              )
            }
            className="input"
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {submitting
          ? "Saving…"
          : mode === "create"
            ? "Create category"
            : "Save changes"}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-black/70">
        {label}
      </span>
      {children}
    </label>
  );
}
