import { randomUUID } from "node:crypto";

import type {
  PrismaClient,
  EventEnquiryStatus as PrismaEventEnquiryStatus,
} from "../generated/prisma/client.js";

export type EventEnquiryStatus =
  | "new"
  | "contacted"
  | "confirmed"
  | "cancelled"
  | "closed";

export interface EventEnquiry {
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
}

export interface CreateEventEnquiryInput {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  guests: number;
  date?: string;
  notes?: string;
  source?: string;
  externalId?: string;
}

export type EventEnquiryErrorCode = "NOT_FOUND" | "INVALID_EVENT_ENQUIRY";

export class EventEnquiryError extends Error {
  constructor(public code: EventEnquiryErrorCode) {
    super(code);
    this.name = "EventEnquiryError";
  }
}

export interface EventEnquiryService {
  createEnquiry: (input: CreateEventEnquiryInput) => Promise<EventEnquiry>;
  listEnquiries: () => Promise<EventEnquiry[]>;
  getEnquiry: (id: string) => Promise<EventEnquiry | undefined>;
  updateStatus: (
    id: string,
    status: EventEnquiryStatus,
  ) => Promise<EventEnquiry>;
}

type PrismaEventEnquiryClient = Pick<PrismaClient, "eventEnquiry">;

type PrismaEventEnquiry = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  eventType: string;
  guestCount: number;
  preferredDate: Date | null;
  notes: string | null;
  source: string;
  externalId: string | null;
  status: PrismaEventEnquiryStatus;
  createdAt: Date;
  updatedAt: Date;
};

function cleanText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function cleanOptional(value?: string) {
  const next = value?.trim();
  return next ? next : undefined;
}

function parsePreferredDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime()))
    throw new EventEnquiryError("INVALID_EVENT_ENQUIRY");
  return date;
}

function toStatus(status: PrismaEventEnquiryStatus | EventEnquiryStatus) {
  return status.toLowerCase() as EventEnquiryStatus;
}

function toPrismaStatus(status: EventEnquiryStatus) {
  return status.toUpperCase() as PrismaEventEnquiryStatus;
}

function mapEnquiry(enquiry: PrismaEventEnquiry): EventEnquiry {
  return {
    id: enquiry.id,
    customerName: enquiry.customerName,
    email: enquiry.email,
    phone: enquiry.phone,
    eventType: enquiry.eventType,
    guestCount: enquiry.guestCount,
    preferredDate: enquiry.preferredDate?.toISOString(),
    notes: enquiry.notes ?? undefined,
    source: enquiry.source,
    externalId: enquiry.externalId ?? undefined,
    status: toStatus(enquiry.status),
    createdAt: enquiry.createdAt.toISOString(),
    updatedAt: enquiry.updatedAt.toISOString(),
  };
}

function validate(input: CreateEventEnquiryInput) {
  const customerName = cleanText(input.name);
  const email = cleanText(input.email).toLowerCase();
  const phone = cleanText(input.phone);
  const eventType = cleanText(input.eventType);
  const notes = cleanOptional(input.notes);
  const source = cleanOptional(input.source) ?? "form";
  const externalId = cleanOptional(input.externalId);
  const preferredDate = parsePreferredDate(input.date);

  if (
    customerName.length < 1 ||
    !email.includes("@") ||
    phone.length < 6 ||
    eventType.length < 1 ||
    input.guests < 1 ||
    input.guests > 500
  ) {
    throw new EventEnquiryError("INVALID_EVENT_ENQUIRY");
  }

  return {
    customerName,
    email,
    phone,
    eventType,
    guestCount: input.guests,
    preferredDate,
    notes,
    source,
    externalId,
  };
}

function sortEnquiries(enquiries: EventEnquiry[]) {
  return [...enquiries].sort((first, second) =>
    first.createdAt < second.createdAt ? 1 : -1,
  );
}

export function createMemoryEventEnquiryService(
  seed: EventEnquiry[] = [],
): EventEnquiryService {
  const enquiries = [...seed];

  return {
    createEnquiry: async (input) => {
      const data = validate(input);
      const now = new Date().toISOString();
      const enquiry: EventEnquiry = {
        id: `event_${randomUUID()}`,
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        eventType: data.eventType,
        guestCount: data.guestCount,
        preferredDate: data.preferredDate?.toISOString(),
        notes: data.notes,
        source: data.source,
        externalId: data.externalId,
        status: "new",
        createdAt: now,
        updatedAt: now,
      };
      enquiries.push(enquiry);
      return enquiry;
    },
    listEnquiries: async () => sortEnquiries(enquiries),
    getEnquiry: async (id) => enquiries.find((enquiry) => enquiry.id === id),
    updateStatus: async (id, status) => {
      const enquiry = enquiries.find((candidate) => candidate.id === id);
      if (!enquiry) throw new EventEnquiryError("NOT_FOUND");
      enquiry.status = status;
      enquiry.updatedAt = new Date().toISOString();
      return enquiry;
    },
  };
}

export function createPrismaEventEnquiryService(
  prisma: PrismaEventEnquiryClient,
): EventEnquiryService {
  return {
    createEnquiry: async (input) => {
      const data = validate(input);
      const enquiry = await prisma.eventEnquiry.create({ data });
      return mapEnquiry(enquiry);
    },
    listEnquiries: async () => {
      const enquiries = await prisma.eventEnquiry.findMany({
        orderBy: { createdAt: "desc" },
      });
      return enquiries.map(mapEnquiry);
    },
    getEnquiry: async (id) => {
      const enquiry = await prisma.eventEnquiry.findUnique({ where: { id } });
      return enquiry ? mapEnquiry(enquiry) : undefined;
    },
    updateStatus: async (id, status) => {
      try {
        const enquiry = await prisma.eventEnquiry.update({
          where: { id },
          data: { status: toPrismaStatus(status) },
        });
        return mapEnquiry(enquiry);
      } catch {
        throw new EventEnquiryError("NOT_FOUND");
      }
    },
  };
}
