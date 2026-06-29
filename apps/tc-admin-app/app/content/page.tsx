import { CmsAdminClient } from "@/components/CmsAdminClient";
import {
  listAdminGalleryImages,
  listAdminPromotions,
  listAdminSettings,
  listAdminTestimonials,
} from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ContentAdminPage() {
  let data: Awaited<ReturnType<typeof loadContent>> | undefined;
  let loadError: string | null = null;

  try {
    data = await loadContent();
  } catch (error) {
    loadError = (error as Error).message;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Content CMS</h1>
        <p className="mt-1 text-sm text-black/50">
          Manage promotions, gallery images, testimonials, and small site
          settings.
        </p>
      </div>

      {loadError ? (
        <div className="rounded border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          Could not load CMS content from the backend: {loadError}.
        </div>
      ) : null}

      {data ? <CmsAdminClient {...data} /> : null}
    </div>
  );
}

async function loadContent() {
  const [promotions, images, testimonials, settings] = await Promise.all([
    listAdminPromotions(),
    listAdminGalleryImages(),
    listAdminTestimonials(),
    listAdminSettings(),
  ]);
  return { promotions, images, testimonials, settings };
}
