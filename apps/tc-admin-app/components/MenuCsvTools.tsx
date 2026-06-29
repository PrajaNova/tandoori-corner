"use client";

import { useRef, useState, useTransition } from "react";

type CsvItem = {
  id: string;
  categoryId: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  status: "active" | "inactive";
  imageUrl?: string;
  tags: string[];
  ingredients: string[];
  sortOrder: number;
};

type MenuCsvToolsProps = {
  items: CsvItem[];
};

const HEADERS = [
  "id",
  "categoryId",
  "slug",
  "name",
  "description",
  "priceCents",
  "status",
  "imageUrl",
  "tags",
  "ingredients",
  "sortOrder",
];

export function csvCell(value: unknown) {
  const raw = String(value ?? "");
  const text = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((candidate) => candidate.some(Boolean));
}

export function MenuCsvTools({ items }: MenuCsvToolsProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function downloadCsv() {
    const rows = [
      HEADERS,
      ...items.map((item) => [
        item.id,
        item.categoryId,
        item.slug,
        item.name,
        item.description,
        item.priceCents,
        item.status,
        item.imageUrl ?? "",
        item.tags.join("|"),
        item.ingredients.join("|"),
        item.sortOrder,
      ]),
    ];
    const blob = new Blob(
      [rows.map((row) => row.map(csvCell).join(",")).join("\n")],
      { type: "text/csv;charset=utf-8" },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tandoori-menu-items.csv";
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  async function uploadCsv(file: File) {
    const rows = parseCsv(await file.text());
    const [headers, ...body] = rows;
    const index = new Map(
      headers.map((header, position) => [header, position]),
    );
    let ok = 0;
    const failed: string[] = [];

    for (const row of body) {
      const id = row[index.get("id") ?? -1];
      if (!id) continue;
      const priceCents = Number(row[index.get("priceCents") ?? -1]);
      const sortOrder = Number(row[index.get("sortOrder") ?? -1]);
      if (!Number.isFinite(priceCents)) {
        failed.push(id);
        continue;
      }
      const payload = {
        categoryId: row[index.get("categoryId") ?? -1],
        slug: row[index.get("slug") ?? -1],
        name: row[index.get("name") ?? -1],
        description: row[index.get("description") ?? -1],
        priceCents,
        status: row[index.get("status") ?? -1],
        imageUrl: row[index.get("imageUrl") ?? -1] || undefined,
        tags: (row[index.get("tags") ?? -1] ?? "").split("|").filter(Boolean),
        ingredients: (row[index.get("ingredients") ?? -1] ?? "")
          .split("|")
          .filter(Boolean),
        sortOrder: Number.isFinite(sortOrder) ? sortOrder : undefined,
      };

      try {
        const response = await fetch(`/api/items/${id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error();
        ok += 1;
      } catch {
        failed.push(id);
      }
    }
    setStatus(
      `Updated ${ok} item${ok === 1 ? "" : "s"}${
        failed.length ? ` · Failed: ${failed.join(", ")}` : ""
      }`,
    );
  }

  return (
    <section className="rounded-xl border border-black/10 bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#9e4418]">Excel workflow</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">
            Download, edit, re-upload menu
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-black/60">
            Open the CSV in Excel, edit rows, then upload the same file to patch
            existing menu items.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={downloadCsv}
            className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/5"
          >
            Download Excel CSV
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isPending}
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 disabled:opacity-50"
          >
            {isPending ? "Uploading..." : "Upload edited CSV"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              setStatus(null);
              startTransition(() => uploadCsv(file));
              event.target.value = "";
            }}
          />
        </div>
      </div>
      {status ? <p className="mt-4 text-sm text-black/65">{status}</p> : null}
    </section>
  );
}
