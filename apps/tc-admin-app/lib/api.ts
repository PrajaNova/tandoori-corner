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
  const response = await fetch(menuUrl("/categories"), {
    cache: "no-store",
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

export const ICON_OPTIONS = [
  "chefHat",
  "flame",
  "leaf",
  "sparkles",
  "utensils",
  "glassWater",
  "shoppingBag",
] as const;
