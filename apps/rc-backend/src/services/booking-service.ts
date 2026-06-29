import { randomUUID } from "node:crypto";

import type {
  BookingStatus,
  PrismaClient,
} from "../generated/prisma/client.js";

export type PublicBookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export interface Booking {
  id: string;
  customerId?: string;
  customerName: string;
  email: string;
  phone: string;
  partySize: number;
  bookedFor: string;
  notes?: string;
  status: PublicBookingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingInput {
  customerId?: string;
  name: string;
  email: string;
  phone: string;
  partySize: number;
  date: string;
  time: string;
  notes?: string;
}

export interface UpdateBookingStatusInput {
  status: PublicBookingStatus;
}

export type BookingErrorCode = "NOT_FOUND" | "INVALID_BOOKING";

export class BookingError extends Error {
  constructor(public code: BookingErrorCode) {
    super(code);
    this.name = "BookingError";
  }
}

export interface BookingService {
  createBooking: (input: CreateBookingInput) => Promise<Booking>;
  listBookings: () => Promise<Booking[]>;
  getBooking: (id: string) => Promise<Booking | undefined>;
  updateBookingStatus: (
    id: string,
    input: UpdateBookingStatusInput,
  ) => Promise<Booking>;
}

type PrismaBookingClient = Pick<PrismaClient, "booking">;

type PrismaBooking = {
  id: string;
  customerId: string | null;
  customerName: string;
  email: string;
  phone: string;
  partySize: number;
  bookedFor: Date;
  notes: string | null;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
};

function normalizeStatus(status: BookingStatus | PublicBookingStatus) {
  return status.toLowerCase() as PublicBookingStatus;
}

function toPrismaStatus(status: PublicBookingStatus) {
  return status.toUpperCase() as BookingStatus;
}

function cleanText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function cleanNotes(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function parseBookingDate(date: string, time: string) {
  const bookedFor = new Date(`${date}T${time}:00`);
  if (Number.isNaN(bookedFor.getTime()))
    throw new BookingError("INVALID_BOOKING");
  return bookedFor;
}

function isServiceTime(time: string) {
  return (
    (time >= "12:00" && time <= "14:45") || (time >= "18:00" && time <= "21:45")
  );
}

function mapBooking(booking: PrismaBooking): Booking {
  return {
    id: booking.id,
    customerId: booking.customerId ?? undefined,
    customerName: booking.customerName,
    email: booking.email,
    phone: booking.phone,
    partySize: booking.partySize,
    bookedFor: booking.bookedFor.toISOString(),
    notes: booking.notes ?? undefined,
    status: normalizeStatus(booking.status),
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
  };
}

function validate(input: CreateBookingInput) {
  const customerName = cleanText(input.name);
  const email = cleanText(input.email).toLowerCase();
  const phone = cleanText(input.phone);
  const notes = cleanNotes(input.notes);
  const bookedFor = parseBookingDate(input.date, input.time);

  if (
    customerName.length < 1 ||
    !email.includes("@") ||
    phone.length < 6 ||
    input.partySize < 1 ||
    input.partySize > 30 ||
    !isServiceTime(input.time) ||
    bookedFor.getTime() <= Date.now()
  ) {
    throw new BookingError("INVALID_BOOKING");
  }

  return {
    customerName,
    email,
    phone,
    partySize: input.partySize,
    bookedFor,
    notes,
  };
}

function sortBookings(bookings: Booking[]) {
  return [...bookings].sort((first, second) =>
    first.bookedFor.localeCompare(second.bookedFor),
  );
}

export function createMemoryBookingService(
  seed: Booking[] = [],
): BookingService {
  const bookings = [...seed];

  return {
    createBooking: async (input) => {
      const data = validate(input);
      const now = new Date().toISOString();
      const booking: Booking = {
        id: `booking_${randomUUID()}`,
        customerId: input.customerId,
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        partySize: data.partySize,
        bookedFor: data.bookedFor.toISOString(),
        notes: data.notes,
        status: "pending",
        createdAt: now,
        updatedAt: now,
      };
      bookings.push(booking);
      return booking;
    },
    listBookings: async () => sortBookings(bookings),
    getBooking: async (id) => bookings.find((booking) => booking.id === id),
    updateBookingStatus: async (id, input) => {
      const booking = bookings.find((candidate) => candidate.id === id);
      if (!booking) throw new BookingError("NOT_FOUND");
      booking.status = input.status;
      booking.updatedAt = new Date().toISOString();
      return booking;
    },
  };
}

export function createPrismaBookingService(
  prisma: PrismaBookingClient,
): BookingService {
  return {
    createBooking: async (input) => {
      const data = validate(input);
      const booking = await prisma.booking.create({
        data: {
          customerName: data.customerName,
          customerId: input.customerId,
          email: data.email,
          phone: data.phone,
          partySize: data.partySize,
          bookedFor: data.bookedFor,
          notes: data.notes,
        },
      });
      return mapBooking(booking);
    },
    listBookings: async () => {
      const bookings = await prisma.booking.findMany({
        orderBy: { bookedFor: "asc" },
      });
      return bookings.map(mapBooking);
    },
    getBooking: async (id) => {
      const booking = await prisma.booking.findUnique({ where: { id } });
      return booking ? mapBooking(booking) : undefined;
    },
    updateBookingStatus: async (id, input) => {
      try {
        const booking = await prisma.booking.update({
          where: { id },
          data: { status: toPrismaStatus(input.status) },
        });
        return mapBooking(booking);
      } catch {
        throw new BookingError("NOT_FOUND");
      }
    },
  };
}
