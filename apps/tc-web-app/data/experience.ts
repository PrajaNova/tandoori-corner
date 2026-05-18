import type { IconKey } from "@/data/types";

type ReservationMode = "table" | "tcb";

export interface ExperienceCardItem {
  id: ReservationMode | "order";
  title: string;
  description: string;
  icon: IconKey;
  image: string;
  actionText: string;
}

export interface ExperienceField {
  id: string;
  label: string;
  type: "text" | "email" | "date" | "time" | "number" | "select" | "textarea";
  placeholder?: string;
  options?: string[];
  cols?: 1 | 2;
}

export const experienceCards: ExperienceCardItem[] = [
  {
    id: "order",
    title: "Order Now",
    description:
      "Browse our full digital menu. Add items to your cart and order for takeaway or island-wide delivery.",
    icon: "shoppingBag",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80",
    actionText: "View Menu & Order",
  },
  {
    id: "table",
    title: "Reserve & Book",
    description:
      "Book a table at our alfresco dining area, or reserve the TCB Bar for a private corporate event or gathering.",
    icon: "calendarDays",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80",
    actionText: "See Booking Options",
  },
];

export const tableReservationFields: ExperienceField[] = [
  {
    id: "date",
    label: "Date",
    type: "date",
    cols: 1,
  },
  {
    id: "time",
    label: "Time",
    type: "time",
    cols: 1,
  },
  {
    id: "guests",
    label: "Guests",
    type: "select",
    options: ["1 Person", "2 People", "3 People", "4 People", "5+ People"],
    cols: 1,
  },
  {
    id: "preference",
    label: "Preference",
    type: "select",
    options: ["Alfresco (Pet Friendly)", "Indoor Dining (TCB)"],
    cols: 1,
  },
];

export const tcbReservationFields: ExperienceField[] = [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "John Doe",
    cols: 1,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "john@example.com",
    cols: 1,
  },
  {
    id: "date",
    label: "Preferred Date",
    type: "date",
    cols: 1,
  },
  {
    id: "guests",
    label: "Estimated Guests",
    type: "number",
    placeholder: "e.g. 30",
    cols: 1,
  },
  {
    id: "details",
    label: "Additional Details",
    type: "textarea",
    cols: 2,
  },
];
