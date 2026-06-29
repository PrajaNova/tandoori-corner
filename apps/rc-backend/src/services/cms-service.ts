import type { Prisma, PrismaClient } from "../generated/prisma/client.js";
import { isNotFound } from "../lib/prisma-errors.js";

export type CmsStatus = "active" | "inactive";

export interface Promotion {
  id: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  placement: string;
  status: CmsStatus;
  startsAt?: string;
  endsAt?: string;
  sortOrder: number;
}

export interface GalleryImage {
  id: string;
  title: string;
  alt: string;
  imageUrl: string;
  category: string;
  status: CmsStatus;
  sortOrder: number;
}

export interface Testimonial {
  id: string;
  author: string;
  quote: string;
  source?: string;
  rating?: number;
  status: CmsStatus;
  sortOrder: number;
}

export interface SiteSetting {
  key: string;
  value: unknown;
}

export type PromotionInput = Omit<Promotion, "id"> & { id?: string };
export type GalleryImageInput = Omit<GalleryImage, "id"> & { id?: string };
export type TestimonialInput = Omit<Testimonial, "id"> & { id?: string };

export type CmsErrorCode = "NOT_FOUND" | "INVALID_CMS_ENTRY";

export class CmsError extends Error {
  constructor(public code: CmsErrorCode) {
    super(code);
    this.name = "CmsError";
  }
}

export interface CmsService {
  listPromotions: (includeInactive?: boolean) => Promise<Promotion[]>;
  getPromotion: (id: string) => Promise<Promotion | undefined>;
  savePromotion: (input: PromotionInput) => Promise<Promotion>;
  deletePromotion: (id: string) => Promise<void>;
  listGalleryImages: (includeInactive?: boolean) => Promise<GalleryImage[]>;
  getGalleryImage: (id: string) => Promise<GalleryImage | undefined>;
  saveGalleryImage: (input: GalleryImageInput) => Promise<GalleryImage>;
  deleteGalleryImage: (id: string) => Promise<void>;
  listTestimonials: (includeInactive?: boolean) => Promise<Testimonial[]>;
  getTestimonial: (id: string) => Promise<Testimonial | undefined>;
  saveTestimonial: (input: TestimonialInput) => Promise<Testimonial>;
  deleteTestimonial: (id: string) => Promise<void>;
  listSettings: (includePrivate?: boolean) => Promise<SiteSetting[]>;
  getSetting: (key: string) => Promise<SiteSetting | undefined>;
  saveSetting: (key: string, value: unknown) => Promise<SiteSetting>;
}

type PrismaCmsClient = Pick<
  PrismaClient,
  "promotion" | "galleryImage" | "testimonial" | "siteSetting"
>;

function clean(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function optional(value?: string) {
  const next = value?.trim();
  return next ? next : undefined;
}

function safeHttpHref(value?: string) {
  const next = optional(value);
  if (!next) return undefined;
  if (next.startsWith("/") && !next.startsWith("//")) return next;
  try {
    const url = new URL(next);
    if (url.protocol === "https:" || url.protocol === "http:") return next;
  } catch {
    // handled below
  }
  return undefined;
}

function optionalHttpHref(value?: string) {
  const next = safeHttpHref(value);
  if (optional(value) && !next) {
    throw new CmsError("INVALID_CMS_ENTRY");
  }
  return next;
}

function parseDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new CmsError("INVALID_CMS_ENTRY");
  return date;
}

function toJson(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

function mapPromotion(entry: {
  id: string;
  title: string;
  description: string;
  ctaLabel: string | null;
  ctaHref: string | null;
  placement: string;
  status: string;
  startsAt: Date | null;
  endsAt: Date | null;
  sortOrder: number;
}): Promotion {
  return {
    id: entry.id,
    title: entry.title,
    description: entry.description,
    ctaLabel: entry.ctaLabel ?? undefined,
    ctaHref: safeHttpHref(entry.ctaHref ?? undefined),
    placement: entry.placement,
    status: entry.status as CmsStatus,
    startsAt: entry.startsAt?.toISOString(),
    endsAt: entry.endsAt?.toISOString(),
    sortOrder: entry.sortOrder,
  };
}

function mapGalleryImage(entry: {
  id: string;
  title: string;
  alt: string;
  imageUrl: string;
  category: string;
  status: string;
  sortOrder: number;
}): GalleryImage {
  return {
    id: entry.id,
    title: entry.title,
    alt: entry.alt,
    imageUrl: entry.imageUrl,
    category: entry.category,
    status: entry.status as CmsStatus,
    sortOrder: entry.sortOrder,
  };
}

function mapTestimonial(entry: {
  id: string;
  author: string;
  quote: string;
  source: string | null;
  rating: number | null;
  status: string;
  sortOrder: number;
}): Testimonial {
  return {
    id: entry.id,
    author: entry.author,
    quote: entry.quote,
    source: entry.source ?? undefined,
    rating: entry.rating ?? undefined,
    status: entry.status as CmsStatus,
    sortOrder: entry.sortOrder,
  };
}

function activeWhere(includeInactive?: boolean) {
  return includeInactive ? {} : { status: "active" };
}

const PUBLIC_SETTING_KEYS = new Set(["contact"]);

export function createPrismaCmsService(prisma: PrismaCmsClient): CmsService {
  return {
    listPromotions: async (includeInactive) => {
      const now = new Date();
      const promotions = await prisma.promotion.findMany({
        where: includeInactive
          ? {}
          : {
              status: "active",
              OR: [{ startsAt: null }, { startsAt: { lte: now } }],
              AND: [{ OR: [{ endsAt: null }, { endsAt: { gte: now } }] }],
            },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      });
      return promotions.map(mapPromotion);
    },
    getPromotion: async (id) => {
      const promotion = await prisma.promotion.findUnique({ where: { id } });
      return promotion ? mapPromotion(promotion) : undefined;
    },
    savePromotion: async (input) => {
      const data = {
        title: clean(input.title),
        description: input.description.trim(),
        ctaLabel: optional(input.ctaLabel),
        ctaHref: optionalHttpHref(input.ctaHref),
        placement: clean(input.placement || "home"),
        status: input.status,
        startsAt: parseDate(input.startsAt),
        endsAt: parseDate(input.endsAt),
        sortOrder: input.sortOrder,
      };
      if (!data.title || !data.description)
        throw new CmsError("INVALID_CMS_ENTRY");
      const promotion = input.id
        ? await prisma.promotion.update({ where: { id: input.id }, data })
        : await prisma.promotion.create({ data });
      return mapPromotion(promotion);
    },
    deletePromotion: async (id) => {
      try {
        await prisma.promotion.delete({ where: { id } });
      } catch (error) {
        if (isNotFound(error)) throw new CmsError("NOT_FOUND");
        throw error;
      }
    },
    listGalleryImages: async (includeInactive) => {
      const images = await prisma.galleryImage.findMany({
        where: activeWhere(includeInactive),
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      });
      return images.map(mapGalleryImage);
    },
    getGalleryImage: async (id) => {
      const image = await prisma.galleryImage.findUnique({ where: { id } });
      return image ? mapGalleryImage(image) : undefined;
    },
    saveGalleryImage: async (input) => {
      const data = {
        title: clean(input.title),
        alt: clean(input.alt),
        imageUrl: input.imageUrl.trim(),
        category: clean(input.category || "food"),
        status: input.status,
        sortOrder: input.sortOrder,
      };
      if (!data.title || !data.alt || !data.imageUrl) {
        throw new CmsError("INVALID_CMS_ENTRY");
      }
      const image = input.id
        ? await prisma.galleryImage.update({ where: { id: input.id }, data })
        : await prisma.galleryImage.create({ data });
      return mapGalleryImage(image);
    },
    deleteGalleryImage: async (id) => {
      try {
        await prisma.galleryImage.delete({ where: { id } });
      } catch (error) {
        if (isNotFound(error)) throw new CmsError("NOT_FOUND");
        throw error;
      }
    },
    listTestimonials: async (includeInactive) => {
      const testimonials = await prisma.testimonial.findMany({
        where: activeWhere(includeInactive),
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      });
      return testimonials.map(mapTestimonial);
    },
    getTestimonial: async (id) => {
      const testimonial = await prisma.testimonial.findUnique({
        where: { id },
      });
      return testimonial ? mapTestimonial(testimonial) : undefined;
    },
    saveTestimonial: async (input) => {
      const data = {
        author: clean(input.author),
        quote: input.quote.trim(),
        source: optional(input.source),
        rating: input.rating,
        status: input.status,
        sortOrder: input.sortOrder,
      };
      if (!data.author || !data.quote) throw new CmsError("INVALID_CMS_ENTRY");
      const testimonial = input.id
        ? await prisma.testimonial.update({ where: { id: input.id }, data })
        : await prisma.testimonial.create({ data });
      return mapTestimonial(testimonial);
    },
    deleteTestimonial: async (id) => {
      try {
        await prisma.testimonial.delete({ where: { id } });
      } catch (error) {
        if (isNotFound(error)) throw new CmsError("NOT_FOUND");
        throw error;
      }
    },
    listSettings: async (includePrivate = false) => {
      const settings = await prisma.siteSetting.findMany({
        where: includePrivate
          ? undefined
          : { key: { in: [...PUBLIC_SETTING_KEYS] } },
        orderBy: { key: "asc" },
      });
      return settings.map((setting) => ({
        key: setting.key,
        value: setting.value,
      }));
    },
    getSetting: async (key) => {
      const setting = await prisma.siteSetting.findUnique({ where: { key } });
      return setting ? { key: setting.key, value: setting.value } : undefined;
    },
    saveSetting: async (key, value) => {
      const setting = await prisma.siteSetting.upsert({
        where: { key },
        update: { value: toJson(value) },
        create: { key, value: toJson(value) },
      });
      return { key: setting.key, value: setting.value };
    },
  };
}
