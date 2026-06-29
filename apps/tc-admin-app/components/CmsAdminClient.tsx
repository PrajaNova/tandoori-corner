"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type {
  AdminGalleryImage,
  AdminPromotion,
  AdminSiteSetting,
  AdminTestimonial,
} from "@/lib/api";

type Props = {
  promotions: AdminPromotion[];
  images: AdminGalleryImage[];
  testimonials: AdminTestimonial[];
  settings: AdminSiteSetting[];
};

const emptyPromotion: Partial<AdminPromotion> = {
  title: "",
  description: "",
  placement: "home",
  status: "active",
  sortOrder: 0,
};

const emptyImage: Partial<AdminGalleryImage> = {
  title: "",
  alt: "",
  imageUrl: "",
  category: "food",
  status: "active",
  sortOrder: 0,
};

const emptyTestimonial: Partial<AdminTestimonial> = {
  author: "",
  quote: "",
  source: "Google",
  rating: 5,
  status: "active",
  sortOrder: 0,
};

export function CmsAdminClient({
  promotions,
  images,
  testimonials,
  settings,
}: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [promotion, setPromotion] = useState(emptyPromotion);
  const [image, setImage] = useState(emptyImage);
  const [testimonial, setTestimonial] = useState(emptyTestimonial);
  const [settingKey, setSettingKey] = useState(settings[0]?.key ?? "contact");
  const [settingValue, setSettingValue] = useState(
    JSON.stringify(settings[0]?.value ?? {}, null, 2),
  );

  async function save(
    path: string,
    method: "POST" | "PATCH" | "PUT",
    body: unknown,
  ) {
    setError(null);
    const response = await fetch(path, {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      setError(payload.message ?? "Save failed.");
      return false;
    }
    router.refresh();
    return true;
  }

  async function remove(path: string) {
    if (!confirm("Delete this content item?")) return;
    setError(null);
    const response = await fetch(path, { method: "DELETE" });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      setError(payload.message ?? "Delete failed.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="space-y-10">
      {error ? (
        <div className="rounded border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <section className="rounded-lg border border-black/10 bg-white p-5">
        <h2 className="text-lg font-semibold">Promotions</h2>
        <ContentTable
          rows={promotions.map((item) => ({
            id: item.id,
            title: item.title,
            subtitle: `${item.placement} · ${item.status}`,
          }))}
          onEdit={(id) =>
            setPromotion(
              promotions.find((item) => item.id === id) ?? emptyPromotion,
            )
          }
          onDelete={(id) => remove(`/api/cms/promotions/${id}`)}
        />
        <form
          className="mt-5 grid gap-3 md:grid-cols-2"
          onSubmit={async (event) => {
            event.preventDefault();
            const ok = await save(
              promotion.id
                ? `/api/cms/promotions/${promotion.id}`
                : "/api/cms/promotions",
              promotion.id ? "PATCH" : "POST",
              promotion,
            );
            if (ok) setPromotion(emptyPromotion);
          }}
        >
          <Input
            label="Title"
            value={promotion.title}
            onChange={(title) => setPromotion({ ...promotion, title })}
          />
          <Input
            label="Placement"
            value={promotion.placement}
            onChange={(placement) => setPromotion({ ...promotion, placement })}
          />
          <Input
            label="CTA label"
            value={promotion.ctaLabel}
            onChange={(ctaLabel) => setPromotion({ ...promotion, ctaLabel })}
          />
          <Input
            label="CTA href"
            value={promotion.ctaHref}
            onChange={(ctaHref) => setPromotion({ ...promotion, ctaHref })}
          />
          <TextArea
            label="Description"
            value={promotion.description}
            onChange={(description) =>
              setPromotion({ ...promotion, description })
            }
          />
          <MetaFields
            status={promotion.status}
            sortOrder={promotion.sortOrder}
            onStatus={(status) => setPromotion({ ...promotion, status })}
            onSortOrder={(sortOrder) =>
              setPromotion({ ...promotion, sortOrder })
            }
          />
          <FormActions
            editing={Boolean(promotion.id)}
            onCancel={() => setPromotion(emptyPromotion)}
          />
        </form>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5">
        <h2 className="text-lg font-semibold">Gallery</h2>
        <ContentTable
          rows={images.map((item) => ({
            id: item.id,
            title: item.title,
            subtitle: `${item.category} · ${item.status}`,
          }))}
          onEdit={(id) =>
            setImage(images.find((item) => item.id === id) ?? emptyImage)
          }
          onDelete={(id) => remove(`/api/cms/gallery/${id}`)}
        />
        <form
          className="mt-5 grid gap-3 md:grid-cols-2"
          onSubmit={async (event) => {
            event.preventDefault();
            const ok = await save(
              image.id ? `/api/cms/gallery/${image.id}` : "/api/cms/gallery",
              image.id ? "PATCH" : "POST",
              image,
            );
            if (ok) setImage(emptyImage);
          }}
        >
          <Input
            label="Title"
            value={image.title}
            onChange={(title) => setImage({ ...image, title })}
          />
          <Input
            label="Category"
            value={image.category}
            onChange={(category) => setImage({ ...image, category })}
          />
          <Input
            label="Image URL"
            value={image.imageUrl}
            onChange={(imageUrl) => setImage({ ...image, imageUrl })}
          />
          <Input
            label="Alt text"
            value={image.alt}
            onChange={(alt) => setImage({ ...image, alt })}
          />
          <MetaFields
            status={image.status}
            sortOrder={image.sortOrder}
            onStatus={(status) => setImage({ ...image, status })}
            onSortOrder={(sortOrder) => setImage({ ...image, sortOrder })}
          />
          <FormActions
            editing={Boolean(image.id)}
            onCancel={() => setImage(emptyImage)}
          />
        </form>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5">
        <h2 className="text-lg font-semibold">Testimonials</h2>
        <ContentTable
          rows={testimonials.map((item) => ({
            id: item.id,
            title: item.author,
            subtitle: `${item.source ?? "Direct"} · ${item.status}`,
          }))}
          onEdit={(id) =>
            setTestimonial(
              testimonials.find((item) => item.id === id) ?? emptyTestimonial,
            )
          }
          onDelete={(id) => remove(`/api/cms/testimonials/${id}`)}
        />
        <form
          className="mt-5 grid gap-3 md:grid-cols-2"
          onSubmit={async (event) => {
            event.preventDefault();
            const ok = await save(
              testimonial.id
                ? `/api/cms/testimonials/${testimonial.id}`
                : "/api/cms/testimonials",
              testimonial.id ? "PATCH" : "POST",
              testimonial,
            );
            if (ok) setTestimonial(emptyTestimonial);
          }}
        >
          <Input
            label="Author"
            value={testimonial.author}
            onChange={(author) => setTestimonial({ ...testimonial, author })}
          />
          <Input
            label="Source"
            value={testimonial.source}
            onChange={(source) => setTestimonial({ ...testimonial, source })}
          />
          <Input
            label="Rating"
            value={String(testimonial.rating ?? "")}
            onChange={(rating) =>
              setTestimonial({
                ...testimonial,
                rating: Number(rating) || undefined,
              })
            }
          />
          <TextArea
            label="Quote"
            value={testimonial.quote}
            onChange={(quote) => setTestimonial({ ...testimonial, quote })}
          />
          <MetaFields
            status={testimonial.status}
            sortOrder={testimonial.sortOrder}
            onStatus={(status) => setTestimonial({ ...testimonial, status })}
            onSortOrder={(sortOrder) =>
              setTestimonial({ ...testimonial, sortOrder })
            }
          />
          <FormActions
            editing={Boolean(testimonial.id)}
            onCancel={() => setTestimonial(emptyTestimonial)}
          />
        </form>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5">
        <h2 className="text-lg font-semibold">Site Settings</h2>
        <p className="mt-1 text-sm text-black/50">
          Store small JSON settings such as contact overrides or announcement
          banners.
        </p>
        <form
          className="mt-5 grid gap-3"
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              await save(`/api/cms/settings/${settingKey}`, "PUT", {
                value: JSON.parse(settingValue),
              });
            } catch {
              setError("Settings must be valid JSON.");
            }
          }}
        >
          <Input label="Key" value={settingKey} onChange={setSettingKey} />
          <TextArea
            label="JSON value"
            value={settingValue}
            onChange={setSettingValue}
          />
          <button
            type="submit"
            className="w-fit rounded bg-black px-4 py-2 text-sm text-white"
          >
            Save setting
          </button>
        </form>
      </section>
    </div>
  );
}

function ContentTable({
  rows,
  onEdit,
  onDelete,
}: {
  rows: Array<{ id: string; title: string; subtitle: string }>;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  if (rows.length === 0) {
    return <p className="mt-3 text-sm text-black/50">No entries yet.</p>;
  }
  return (
    <table className="mt-3 w-full text-sm">
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="border-t border-black/10">
            <td className="py-2 font-medium">{row.title}</td>
            <td className="py-2 text-black/50">{row.subtitle}</td>
            <td className="py-2 text-right">
              <button
                type="button"
                className="mr-3 hover:underline"
                onClick={() => onEdit(row.id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="text-red-700 hover:underline"
                onClick={() => onDelete(row.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-black/70">
        {label}
      </span>
      <input
        className="input"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block md:col-span-2">
      <span className="mb-1 block text-sm font-medium text-black/70">
        {label}
      </span>
      <textarea
        className="input min-h-24"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function MetaFields({
  status,
  sortOrder,
  onStatus,
  onSortOrder,
}: {
  status?: "active" | "inactive";
  sortOrder?: number;
  onStatus: (status: "active" | "inactive") => void;
  onSortOrder: (sortOrder: number) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-black/70">
          Status
        </span>
        <select
          className="input"
          value={status ?? "active"}
          onChange={(event) =>
            onStatus(event.target.value as "active" | "inactive")
          }
        >
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
      </label>
      <Input
        label="Sort order"
        value={String(sortOrder ?? 0)}
        onChange={(value) => onSortOrder(Number(value) || 0)}
      />
    </div>
  );
}

function FormActions({
  editing,
  onCancel,
}: {
  editing: boolean;
  onCancel: () => void;
}) {
  return (
    <div className="flex items-end gap-3">
      <button
        type="submit"
        className="rounded bg-black px-4 py-2 text-sm text-white"
      >
        {editing ? "Save changes" : "Create"}
      </button>
      {editing ? (
        <button
          type="button"
          className="text-sm hover:underline"
          onClick={onCancel}
        >
          Cancel
        </button>
      ) : null}
    </div>
  );
}
