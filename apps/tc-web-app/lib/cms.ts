import { testimonialContent } from "@/content/testimonial";
import { contact } from "@/lib/seo";

export type Promotion = {
  id: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  placement: string;
};

export type GalleryImage = {
  id: string;
  title: string;
  alt: string;
  imageUrl: string;
  category: string;
};

export type Testimonial = {
  id: string;
  author: string;
  quote: string;
  source?: string;
  rating?: number;
};

export type SiteSetting = {
  key: string;
  value: unknown;
};

function apiBaseUrl(): string {
  return (
    process.env.RC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:4000"
  );
}

async function getJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${apiBaseUrl()}${path}`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return fallback;
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

const fallbackGallery: GalleryImage[] = [
  {
    id: "food",
    title: "Tandoori grills",
    alt: "Tandoori Corner grilled North Indian dishes",
    imageUrl: "/granny/granny_specials_1.jpg",
    category: "food",
  },
  {
    id: "dining",
    title: "Balestier dining room",
    alt: "Tandoori Corner dining space at Balestier Plaza",
    imageUrl: "/granny/granny_background_11.jpg",
    category: "restaurant",
  },
  {
    id: "events",
    title: "TCB Bar events",
    alt: "Private event setup at TCB Bar",
    imageUrl: "/granny/granny_banners_11.jpg",
    category: "events",
  },
];

const fallbackTestimonials: Testimonial[] = testimonialContent.items
  .slice(0, 6)
  .map((item, index) => ({
    id: `fallback-${index}`,
    author: item.author.replace(/^- /, ""),
    quote: item.quote,
    source: "Guest review",
    rating: 5,
  }));

export async function getPromotions(): Promise<Promotion[]> {
  const body = await getJson<{ promotions: Promotion[] }>(
    "/api/cms/promotions",
    {
      promotions: [],
    },
  );
  return body.promotions;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const body = await getJson<{ images: GalleryImage[] }>("/api/cms/gallery", {
    images: fallbackGallery,
  });
  return body.images.length ? body.images : fallbackGallery;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const body = await getJson<{ testimonials: Testimonial[] }>(
    "/api/cms/testimonials",
    { testimonials: fallbackTestimonials },
  );
  return body.testimonials.length ? body.testimonials : fallbackTestimonials;
}

export async function getSiteSettings(): Promise<Record<string, unknown>> {
  const body = await getJson<{ settings: SiteSetting[] }>("/api/cms/settings", {
    settings: [],
  });
  return Object.fromEntries(
    body.settings.map((setting) => [setting.key, setting.value]),
  );
}

export async function getContactSetting() {
  const settings = await getSiteSettings();
  const override = settings.contact;
  return typeof override === "object" && override
    ? { ...contact, ...override }
    : contact;
}
