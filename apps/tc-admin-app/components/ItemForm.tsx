"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type CategoryOption = { id: string; title: string };

type ItemFormValues = {
  id?: string;
  categoryId: string;
  name: string;
  description: string;
  story: string;
  imageUrl: string;
  priceDollars: string;
  tags: string;
  ingredients: string;
  slug: string;
  status: "active" | "inactive";
  sortOrder?: number;
};

type ItemFormProps = {
  mode: "create" | "edit";
  categories: CategoryOption[];
  initial?: Partial<ItemFormValues>;
};

const STARTERS = [
  {
    label: "Signature curry",
    values: {
      name: "Butter Chicken",
      description:
        "Tender tandoori chicken tikka cooked in a creamy tomato sauce.",
      priceDollars: "17.00",
      tags: "Signature",
      ingredients: "Chicken, Tomatoes, Cream",
    },
  },
  {
    label: "Vegetarian main",
    values: {
      name: "Paneer Makhni",
      description: "Fresh cottage cheese cooked in a creamy tomato sauce.",
      priceDollars: "16.00",
      tags: "Vegetarian",
      ingredients: "Paneer, Tomatoes, Cream",
    },
  },
  {
    label: "Bar drink",
    values: {
      name: "House Pour",
      description: "Bar menu pour served by the glass.",
      priceDollars: "10.00",
      tags: "Bar",
      ingredients: "",
    },
  },
] satisfies Array<{ label: string; values: Partial<ItemFormValues> }>;

function toList(value: string): string[] {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function ItemForm({ mode, categories, initial }: ItemFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState<ItemFormValues>({
    categoryId: initial?.categoryId ?? categories[0]?.id ?? "",
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    story: initial?.story ?? "",
    imageUrl: initial?.imageUrl ?? "",
    priceDollars: initial?.priceDollars ?? "",
    tags: initial?.tags ?? "",
    ingredients: initial?.ingredients ?? "",
    slug: initial?.slug ?? "",
    status: initial?.status ?? "active",
    sortOrder: initial?.sortOrder,
  });

  function update<K extends keyof ItemFormValues>(
    key: K,
    value: ItemFormValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const priceCents = Math.round(Number(values.priceDollars) * 100);
    if (!Number.isFinite(priceCents) || priceCents < 0) {
      setError("Enter a valid price.");
      setSubmitting(false);
      return;
    }

    const payload: Record<string, unknown> = {
      categoryId: values.categoryId,
      name: values.name,
      description: values.description,
      priceCents,
      status: values.status,
      tags: toList(values.tags),
      ingredients: toList(values.ingredients),
    };
    if (values.story) payload.story = values.story;
    if (values.imageUrl) payload.imageUrl = values.imageUrl;
    if (values.slug) payload.slug = values.slug;
    if (typeof values.sortOrder === "number")
      payload.sortOrder = values.sortOrder;

    const url = mode === "create" ? "/api/items" : `/api/items/${initial?.id}`;
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
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      {error ? (
        <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {mode === "create" ? (
        <section className="rounded-xl border border-black/10 bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold">Start from a menu shape</h2>
              <p className="mt-1 text-sm text-black/55">
                Fills the repetitive fields. Edit the details before saving.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {STARTERS.map((starter) => (
                <button
                  key={starter.label}
                  type="button"
                  onClick={() =>
                    setValues((current) => ({
                      ...current,
                      ...starter.values,
                    }))
                  }
                  className="rounded-full border border-black/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5"
                >
                  {starter.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Field label="Category">
        <select
          value={values.categoryId}
          onChange={(event) => update("categoryId", event.target.value)}
          className="input"
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Name">
        <input
          required
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          className="input"
        />
      </Field>

      <Field label="Description">
        <textarea
          required
          rows={3}
          value={values.description}
          onChange={(event) => update("description", event.target.value)}
          className="input"
        />
      </Field>

      <Field label="Story (optional)">
        <textarea
          rows={2}
          value={values.story}
          onChange={(event) => update("story", event.target.value)}
          className="input"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Price (SGD)">
          <input
            required
            type="number"
            step="0.01"
            min="0"
            value={values.priceDollars}
            onChange={(event) => update("priceDollars", event.target.value)}
            className="input"
            placeholder="22.00"
          />
        </Field>

        <Field label="Image URL (optional)">
          <input
            value={values.imageUrl}
            onChange={(event) => update("imageUrl", event.target.value)}
            className="input"
          />
        </Field>
      </div>

      <Field label="Tags (comma-separated)">
        <input
          value={values.tags}
          onChange={(event) => update("tags", event.target.value)}
          className="input"
          placeholder="Signature, Spicy"
        />
      </Field>

      <Field label="Ingredients (comma-separated)">
        <input
          value={values.ingredients}
          onChange={(event) => update("ingredients", event.target.value)}
          className="input"
          placeholder="Chicken, Tomatoes, Cream"
        />
      </Field>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Slug (optional)">
          <input
            value={values.slug}
            onChange={(event) => update("slug", event.target.value)}
            className="input"
            placeholder="auto"
          />
        </Field>

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

        <Field label="Sort order">
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
            ? "Create item"
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
