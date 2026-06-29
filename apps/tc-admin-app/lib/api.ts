export type AdminItem = {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  description: string;
  story?: string;
  imageUrl?: string;
  priceCents: number;
  currency: "SGD";
  variants?: Array<{ label: string; priceCents: number }>;
  imageSlug?: string;
  veg?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  spiceLevel?: "MILD" | "MEDIUM" | "HOT" | "EXTRA";
  allergens?: string[];
  tags: string[];
  ingredients: string[];
  status: "active" | "inactive";
  sortOrder: number;
};

export type AdminCategory = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  status: "active" | "inactive";
  sortOrder: number;
  items: AdminItem[];
};

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type AdminBooking = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  partySize: number;
  bookedFor: string;
  notes?: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
};

export type EventEnquiryStatus =
  | "new"
  | "contacted"
  | "confirmed"
  | "cancelled"
  | "closed";

export type AdminEventEnquiry = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  eventType: string;
  guestCount: number;
  preferredDate?: string;
  notes?: string;
  source: string;
  externalId?: string;
  status: EventEnquiryStatus;
  createdAt: string;
  updatedAt: string;
};

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "confirmed"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export type PaymentStatus = "requires_payment" | "paid" | "failed" | "refunded";

export type AdminOrder = {
  id: string;
  customerName: string;
  email?: string;
  phone: string;
  fulfillmentType: "pickup" | "delivery" | "dine-in";
  requestedAt?: string;
  address?: string;
  notes?: string;
  subtotalCents: number;
  taxCents: number;
  deliveryFeeCents: number;
  totalCents: number;
  currency: "SGD";
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  stripePaymentIntentId?: string;
  createdAt: string;
  updatedAt: string;
  items: Array<{
    id: string;
    menuItemId: string;
    name: string;
    unitPriceCents: number;
    quantity: number;
    notes?: string;
    totalCents: number;
  }>;
};

export type AdminPromotion = {
  id: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  placement: string;
  status: "active" | "inactive";
  startsAt?: string;
  endsAt?: string;
  sortOrder: number;
};

export type AdminGalleryImage = {
  id: string;
  title: string;
  alt: string;
  imageUrl: string;
  category: string;
  status: "active" | "inactive";
  sortOrder: number;
};

export type AdminTestimonial = {
  id: string;
  author: string;
  quote: string;
  source?: string;
  rating?: number;
  status: "active" | "inactive";
  sortOrder: number;
};

export type AdminSiteSetting = {
  key: string;
  value: unknown;
};

export type CategoryInput = {
  title: string;
  subtitle: string;
  icon: string;
  slug?: string;
  status?: "active" | "inactive";
  sortOrder?: number;
};

export type ItemInput = {
  categoryId: string;
  name: string;
  description: string;
  priceCents: number;
  story?: string;
  imageUrl?: string;
  tags?: string[];
  ingredients?: string[];
  slug?: string;
  status?: "active" | "inactive";
  sortOrder?: number;
};

function baseUrl(): string {
  return process.env.RC_BACKEND_URL ?? "http://localhost:4000";
}

const menuUrl = (path: string) => `${baseUrl()}/api/menu${path}`;
const bookingUrl = (path: string) => `${baseUrl()}/api/bookings${path}`;
const eventUrl = (path: string) => `${baseUrl()}/api/event-enquiries${path}`;
const orderUrl = (path: string) => `${baseUrl()}/api/orders${path}`;
const cmsUrl = (path: string) => `${baseUrl()}/api/cms${path}`;

function adminHeaders() {
  const token = process.env.ADMIN_API_TOKEN;
  return {
    "content-type": "application/json",
    ...(token ? { authorization: `Bearer ${token}` } : {}),
  };
}

async function handle(response: Response) {
  if (response.status === 204) return null;
  const body = (await response.json().catch(() => ({}))) as {
    message?: string;
    error?: string;
  };
  if (!response.ok) {
    throw new Error(
      body.message ?? body.error ?? `Request failed (${response.status})`,
    );
  }
  return body;
}

export async function listCategories(): Promise<AdminCategory[]> {
  const response = await fetch(menuUrl("/admin/categories"), {
    cache: "no-store",
    headers: adminHeaders(),
  });
  const body = (await handle(response)) as { categories: AdminCategory[] };
  return body.categories;
}

export async function findCategory(
  id: string,
): Promise<AdminCategory | undefined> {
  const categories = await listCategories();
  return categories.find((category) => category.id === id);
}

export async function findItem(
  id: string,
): Promise<{ item: AdminItem; category: AdminCategory } | undefined> {
  const categories = await listCategories();
  for (const category of categories) {
    const item = category.items.find((candidate) => candidate.id === id);
    if (item) return { item, category };
  }
  return undefined;
}

export async function createCategory(input: CategoryInput) {
  return handle(
    await fetch(menuUrl("/categories"), {
      method: "POST",
      headers: adminHeaders(),
      body: JSON.stringify({ ...input, name: input.title }),
    }),
  );
}

export async function updateCategory(
  id: string,
  input: Partial<CategoryInput>,
) {
  return handle(
    await fetch(menuUrl(`/categories/${id}`), {
      method: "PATCH",
      headers: adminHeaders(),
      body: JSON.stringify(
        input.title ? { ...input, name: input.title } : input,
      ),
    }),
  );
}

export async function deleteCategory(id: string) {
  return handle(
    await fetch(menuUrl(`/categories/${id}`), {
      method: "DELETE",
      headers: adminHeaders(),
    }),
  );
}

export async function createItem(input: ItemInput) {
  return handle(
    await fetch(menuUrl("/items"), {
      method: "POST",
      headers: adminHeaders(),
      body: JSON.stringify(input),
    }),
  );
}

export async function updateItem(id: string, input: Partial<ItemInput>) {
  return handle(
    await fetch(menuUrl(`/items/${id}`), {
      method: "PATCH",
      headers: adminHeaders(),
      body: JSON.stringify(input),
    }),
  );
}

export async function deleteItem(id: string) {
  return handle(
    await fetch(menuUrl(`/items/${id}`), {
      method: "DELETE",
      headers: adminHeaders(),
    }),
  );
}

export async function listBookings(): Promise<AdminBooking[]> {
  const response = await fetch(bookingUrl(""), {
    cache: "no-store",
    headers: adminHeaders(),
  });
  const body = (await handle(response)) as { bookings: AdminBooking[] };
  return body.bookings;
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  return handle(
    await fetch(bookingUrl(`/${id}/status`), {
      method: "PATCH",
      headers: adminHeaders(),
      body: JSON.stringify({ status }),
    }),
  );
}

export async function listEventEnquiries(): Promise<AdminEventEnquiry[]> {
  const response = await fetch(eventUrl(""), {
    cache: "no-store",
    headers: adminHeaders(),
  });
  const body = (await handle(response)) as {
    enquiries: AdminEventEnquiry[];
  };
  return body.enquiries;
}

export async function updateEventEnquiryStatus(
  id: string,
  status: EventEnquiryStatus,
) {
  return handle(
    await fetch(eventUrl(`/${id}/status`), {
      method: "PATCH",
      headers: adminHeaders(),
      body: JSON.stringify({ status }),
    }),
  );
}

export async function listOrders(): Promise<AdminOrder[]> {
  const response = await fetch(orderUrl(""), {
    cache: "no-store",
    headers: adminHeaders(),
  });
  const body = (await handle(response)) as { orders: AdminOrder[] };
  return body.orders;
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  return handle(
    await fetch(orderUrl(`/${id}/status`), {
      method: "PATCH",
      headers: adminHeaders(),
      body: JSON.stringify({ status }),
    }),
  );
}

export async function listAdminPromotions(): Promise<AdminPromotion[]> {
  const response = await fetch(cmsUrl("/admin/promotions"), {
    cache: "no-store",
    headers: adminHeaders(),
  });
  const body = (await handle(response)) as { promotions: AdminPromotion[] };
  return body.promotions;
}

export async function savePromotion(input: Partial<AdminPromotion>) {
  const id = input.id;
  return handle(
    await fetch(cmsUrl(id ? `/admin/promotions/${id}` : "/admin/promotions"), {
      method: id ? "PATCH" : "POST",
      headers: adminHeaders(),
      body: JSON.stringify(input),
    }),
  );
}

export async function deletePromotion(id: string) {
  return handle(
    await fetch(cmsUrl(`/admin/promotions/${id}`), {
      method: "DELETE",
      headers: adminHeaders(),
    }),
  );
}

export async function listAdminGalleryImages(): Promise<AdminGalleryImage[]> {
  const response = await fetch(cmsUrl("/admin/gallery"), {
    cache: "no-store",
    headers: adminHeaders(),
  });
  const body = (await handle(response)) as { images: AdminGalleryImage[] };
  return body.images;
}

export async function saveGalleryImage(input: Partial<AdminGalleryImage>) {
  const id = input.id;
  return handle(
    await fetch(cmsUrl(id ? `/admin/gallery/${id}` : "/admin/gallery"), {
      method: id ? "PATCH" : "POST",
      headers: adminHeaders(),
      body: JSON.stringify(input),
    }),
  );
}

export async function deleteGalleryImage(id: string) {
  return handle(
    await fetch(cmsUrl(`/admin/gallery/${id}`), {
      method: "DELETE",
      headers: adminHeaders(),
    }),
  );
}

export async function listAdminTestimonials(): Promise<AdminTestimonial[]> {
  const response = await fetch(cmsUrl("/admin/testimonials"), {
    cache: "no-store",
    headers: adminHeaders(),
  });
  const body = (await handle(response)) as { testimonials: AdminTestimonial[] };
  return body.testimonials;
}

export async function saveTestimonial(input: Partial<AdminTestimonial>) {
  const id = input.id;
  return handle(
    await fetch(
      cmsUrl(id ? `/admin/testimonials/${id}` : "/admin/testimonials"),
      {
        method: id ? "PATCH" : "POST",
        headers: adminHeaders(),
        body: JSON.stringify(input),
      },
    ),
  );
}

export async function deleteTestimonial(id: string) {
  return handle(
    await fetch(cmsUrl(`/admin/testimonials/${id}`), {
      method: "DELETE",
      headers: adminHeaders(),
    }),
  );
}

export async function listAdminSettings(): Promise<AdminSiteSetting[]> {
  const response = await fetch(cmsUrl("/admin/settings"), {
    cache: "no-store",
    headers: adminHeaders(),
  });
  const body = (await handle(response)) as { settings: AdminSiteSetting[] };
  return body.settings;
}

export async function saveSetting(key: string, value: unknown) {
  return handle(
    await fetch(cmsUrl(`/admin/settings/${key}`), {
      method: "PUT",
      headers: adminHeaders(),
      body: JSON.stringify({ value }),
    }),
  );
}

export const ICON_OPTIONS = [
  "chefHat",
  "flame",
  "leaf",
  "sparkles",
  "utensils",
  "glassWater",
  "shoppingBag",
] as const;
