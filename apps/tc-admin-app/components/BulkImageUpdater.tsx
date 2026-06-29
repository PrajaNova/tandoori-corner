"use client";

import { useMemo, useState, useTransition } from "react";

type BulkImageItem = {
  id: string;
  slug: string;
  name: string;
  categoryTitle: string;
  imageUrl?: string;
};

type BulkImageUpdaterProps = {
  items: BulkImageItem[];
};

type Result = { ok: number; failed: string[] };

export function BulkImageUpdater({ items }: BulkImageUpdaterProps) {
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");
  const [imageUrl, setImageUrl] = useState("");
  const [bulkText, setBulkText] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [isPending, startTransition] = useTransition();

  const selected = items.find((item) => item.id === selectedId);
  const missingImages = items.filter((item) => !item.imageUrl);
  const byKey = useMemo(
    () =>
      new Map(
        items.flatMap((item) => [
          [item.id, item],
          [item.slug, item],
        ]),
      ),
    [items],
  );

  async function patchImage(id: string, url: string) {
    const response = await fetch(`/api/items/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ imageUrl: url }),
    });
    if (!response.ok) throw new Error((await response.json()).message);
  }

  function saveSingle() {
    if (!selected || !imageUrl.trim()) return;
    setResult(null);
    startTransition(async () => {
      try {
        await patchImage(selected.id, imageUrl.trim());
        setResult({ ok: 1, failed: [] });
      } catch (error) {
        setResult({ ok: 0, failed: [(error as Error).message] });
      }
    });
  }

  function saveBulk() {
    const rows = bulkText
      .split("\n")
      .map((row) => row.trim())
      .filter(Boolean)
      .map((row) => row.split(/[\s,]+/));

    setResult(null);
    startTransition(async () => {
      let ok = 0;
      const failed: string[] = [];
      for (const [key, url] of rows) {
        const item = byKey.get(key);
        if (!item || !url) {
          failed.push(key ?? "blank row");
          continue;
        }
        try {
          await patchImage(item.id, url);
          ok += 1;
        } catch {
          failed.push(item.name);
        }
      }
      setResult({ ok, failed });
    });
  }

  return (
    <section className="rounded-xl border border-black/10 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#9e4418]">Image studio</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">
            Bulk image updates
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-black/60">
            Add public image URLs one item at a time, or paste many rows as{" "}
            <code>item-slug image-url</code>.
          </p>
        </div>
        <div className="rounded-full bg-[#f7f0e8] px-3 py-1.5 text-sm font-medium text-[#7d3613]">
          {missingImages.length} missing images
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-3 rounded-lg bg-[#fbfaf7] p-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-black/70">
              Menu item
            </span>
            <select
              value={selectedId}
              onChange={(event) => setSelectedId(event.target.value)}
              className="input"
            >
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} · {item.categoryTitle}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-black/70">
              Image URL
            </span>
            <input
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              className="input"
              placeholder={selected?.imageUrl ?? "https://..."}
            />
          </label>
          <button
            type="button"
            onClick={saveSingle}
            disabled={isPending || !selected || !imageUrl.trim()}
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 disabled:opacity-50"
          >
            Save image URL
          </button>
        </div>

        <div className="space-y-3 rounded-lg bg-[#fbfaf7] p-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-black/70">
              Bulk paste
            </span>
            <textarea
              value={bulkText}
              onChange={(event) => setBulkText(event.target.value)}
              rows={6}
              className="input font-mono text-xs"
              placeholder={`butter-chicken https://cdn.example.com/butter.jpg\nmenu_item_id https://cdn.example.com/item.jpg`}
            />
          </label>
          <button
            type="button"
            onClick={saveBulk}
            disabled={isPending || !bulkText.trim()}
            className="rounded-full bg-[#bf5820] px-4 py-2 text-sm font-medium text-white hover:bg-[#9e4418] disabled:opacity-50"
          >
            Apply bulk images
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-3">
        {missingImages.slice(0, 6).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setSelectedId(item.id);
              setImageUrl("");
            }}
            className="rounded-lg border border-black/10 px-3 py-2 text-left text-sm hover:bg-[#fbfaf7]"
          >
            <span className="block font-medium">{item.name}</span>
            <span className="text-xs text-black/50">{item.slug}</span>
          </button>
        ))}
      </div>

      {result ? (
        <p className="mt-4 text-sm text-black/65">
          Updated {result.ok} image{result.ok === 1 ? "" : "s"}
          {result.failed.length ? ` · Failed: ${result.failed.join(", ")}` : ""}
        </p>
      ) : null}
    </section>
  );
}
