import { createHash, randomBytes, randomInt } from "node:crypto";

import type { PrismaClient } from "../generated/prisma/client.js";

export interface Customer {
  id: string;
  googleSub?: string;
  name?: string;
  email?: string;
  phone?: string;
  marketingOptIn: boolean;
  createdAt: string;
}

export interface AccountSummary {
  customer: Customer;
  defaultDelivery?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  orders: unknown[];
  bookings: unknown[];
  eventEnquiries: unknown[];
}

export type LoginChannel = "email" | "whatsapp";

export interface LoginRequest {
  name?: string;
  email?: string;
  phone?: string;
  channel?: LoginChannel;
}

export interface LoginChallenge {
  customer: Customer;
  channel: LoginChannel;
  destination: string;
  code: string;
  expiresAt: string;
}

export interface GoogleAccountProfile {
  sub: string;
  email?: string;
  name?: string;
}

export type AccountErrorCode =
  | "INVALID_IDENTITY"
  | "INVALID_CODE"
  | "SESSION_NOT_FOUND";

export class AccountError extends Error {
  constructor(public code: AccountErrorCode) {
    super(code);
    this.name = "AccountError";
  }
}

export interface AccountService {
  linkCustomer: (input: {
    name?: string;
    email?: string;
    phone?: string;
  }) => Promise<Customer | undefined>;
  requestLogin: (input: LoginRequest) => Promise<LoginChallenge>;
  verifyLogin: (input: {
    email?: string;
    phone?: string;
    code: string;
  }) => Promise<{ token: string; account: AccountSummary }>;
  signInWithGoogle: (
    profile: GoogleAccountProfile,
  ) => Promise<{ token: string; account: AccountSummary }>;
  getAccountByToken: (token: string) => Promise<AccountSummary>;
}

type PrismaAccountClient = Pick<
  PrismaClient,
  | "customer"
  | "customerOtp"
  | "customerSession"
  | "order"
  | "booking"
  | "eventEnquiry"
>;

export function createNullAccountService(): AccountService {
  return {
    linkCustomer: async () => undefined,
    requestLogin: async () => {
      throw new AccountError("INVALID_IDENTITY");
    },
    verifyLogin: async () => {
      throw new AccountError("INVALID_CODE");
    },
    signInWithGoogle: async () => {
      throw new AccountError("INVALID_CODE");
    },
    getAccountByToken: async () => {
      throw new AccountError("SESSION_NOT_FOUND");
    },
  };
}

function clean(value?: string) {
  const next = value?.trim().replace(/\s+/g, " ");
  return next || undefined;
}

function cleanEmail(value?: string) {
  return clean(value)?.toLowerCase();
}

function cleanPhone(value?: string) {
  return clean(value)?.replace(/[^\d+]/g, "");
}

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function codeHash(customerId: string, code: string) {
  return hash(`${customerId}:${code}`);
}

function loginDestination(
  input: LoginRequest | { email?: string; phone?: string },
) {
  const email = cleanEmail(input.email);
  const phone = cleanPhone(input.phone);
  const channel: LoginChannel =
    "channel" in input && input.channel
      ? input.channel
      : email
        ? "email"
        : "whatsapp";
  const destination = channel === "email" ? email : phone;
  if (!destination) throw new AccountError("INVALID_IDENTITY");
  return { channel, destination, email, phone };
}

function mapCustomer(customer: {
  id: string;
  googleSub: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  marketingOptIn: boolean;
  createdAt: Date;
}): Customer {
  return {
    id: customer.id,
    googleSub: customer.googleSub ?? undefined,
    name: customer.name ?? undefined,
    email: customer.email ?? undefined,
    phone: customer.phone ?? undefined,
    marketingOptIn: customer.marketingOptIn,
    createdAt: customer.createdAt.toISOString(),
  };
}

async function findCustomer(
  prisma: PrismaAccountClient,
  email?: string,
  phone?: string,
) {
  if (!email && !phone) return undefined;
  return prisma.customer.findFirst({
    where: {
      OR: [...(email ? [{ email }] : []), ...(phone ? [{ phone }] : [])],
    },
  });
}

async function accountSummary(
  prisma: PrismaAccountClient,
  customer: Awaited<ReturnType<typeof findCustomer>>,
): Promise<AccountSummary> {
  if (!customer) throw new AccountError("SESSION_NOT_FOUND");
  const [orders, bookings, eventEnquiries] = await Promise.all([
    prisma.order.findMany({
      where: { customerId: customer.id },
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
    prisma.booking.findMany({
      where: { customerId: customer.id },
      orderBy: { bookedFor: "desc" },
    }),
    prisma.eventEnquiry.findMany({
      where: { customerId: customer.id },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    customer: mapCustomer(customer),
    defaultDelivery: {
      name: orders[0]?.customerName ?? customer.name ?? undefined,
      email: orders[0]?.email ?? customer.email ?? undefined,
      phone: orders[0]?.phone ?? customer.phone ?? undefined,
      address: orders.find((order) => order.address)?.address ?? undefined,
    },
    orders: orders.map((order) => ({
      ...order,
      status: order.status.toLowerCase(),
      paymentStatus: order.paymentStatus.toLowerCase(),
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
      requestedAt: order.requestedAt?.toISOString(),
      items: order.items,
    })),
    bookings: bookings.map((booking) => ({
      ...booking,
      status: booking.status.toLowerCase(),
      bookedFor: booking.bookedFor.toISOString(),
      createdAt: booking.createdAt.toISOString(),
      updatedAt: booking.updatedAt.toISOString(),
    })),
    eventEnquiries: eventEnquiries.map((enquiry) => ({
      ...enquiry,
      status: enquiry.status.toLowerCase(),
      preferredDate: enquiry.preferredDate?.toISOString(),
      createdAt: enquiry.createdAt.toISOString(),
      updatedAt: enquiry.updatedAt.toISOString(),
    })),
  };
}

export function createPrismaAccountService(
  prisma: PrismaAccountClient,
): AccountService {
  const upsertCustomer = async ({
    name,
    email,
    phone,
    googleSub,
  }: {
    name?: string;
    email?: string;
    phone?: string;
    googleSub?: string;
  }) => {
    const nextName = clean(name);
    const nextEmail = cleanEmail(email);
    const nextPhone = cleanPhone(phone);
    const nextGoogleSub = clean(googleSub);
    if (!nextEmail && !nextPhone && !nextGoogleSub) {
      throw new AccountError("INVALID_IDENTITY");
    }

    const existing = nextGoogleSub
      ? await prisma.customer.findUnique({
          where: { googleSub: nextGoogleSub },
        })
      : await findCustomer(prisma, nextEmail, nextPhone);
    const linked =
      existing ?? (await findCustomer(prisma, nextEmail, nextPhone));
    if (linked) {
      return prisma.customer.update({
        where: { id: linked.id },
        data: {
          googleSub: linked.googleSub ?? nextGoogleSub,
          name: linked.name ?? nextName,
        },
      });
    }

    return prisma.customer.create({
      data: {
        googleSub: nextGoogleSub,
        name: nextName,
        email: nextEmail,
        phone: nextPhone,
      },
    });
  };

  const createSession = async (
    customer: Awaited<ReturnType<typeof upsertCustomer>>,
  ) => {
    const token = randomBytes(32).toString("base64url");
    await prisma.customerSession.create({
      data: {
        customerId: customer.id,
        tokenHash: hash(token),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60_000),
      },
    });
    return { token, account: await accountSummary(prisma, customer) };
  };

  return {
    linkCustomer: async (input) => {
      try {
        return mapCustomer(await upsertCustomer(input));
      } catch (error) {
        if (error instanceof AccountError) return undefined;
        throw error;
      }
    },
    requestLogin: async (input) => {
      const { channel, destination } = loginDestination(input);
      const customer =
        (await findCustomer(
          prisma,
          channel === "email" ? destination : undefined,
          channel === "whatsapp" ? destination : undefined,
        )) ??
        (await prisma.customer.create({
          data: {
            name: clean(input.name),
            email: channel === "email" ? destination : undefined,
            phone: channel === "whatsapp" ? destination : undefined,
          },
        }));

      const code = String(randomInt(100000, 1000000));
      const expiresAt = new Date(Date.now() + 10 * 60_000);
      await prisma.customerOtp.create({
        data: {
          customerId: customer.id,
          channel,
          destination,
          codeHash: codeHash(customer.id, code),
          expiresAt,
        },
      });

      return {
        customer: mapCustomer(customer),
        channel,
        destination,
        code,
        expiresAt: expiresAt.toISOString(),
      };
    },
    verifyLogin: async (input) => {
      const { channel, destination } = loginDestination(input);
      const customer = await findCustomer(
        prisma,
        channel === "email" ? destination : undefined,
        channel === "whatsapp" ? destination : undefined,
      );
      if (!customer) throw new AccountError("INVALID_CODE");

      const otp = await prisma.customerOtp.findFirst({
        where: {
          customerId: customer.id,
          destination,
          consumedAt: null,
          expiresAt: { gt: new Date() },
        },
        orderBy: { createdAt: "desc" },
      });
      if (otp?.lockedAt) throw new AccountError("INVALID_CODE");
      if (
        !otp ||
        otp.codeHash !== codeHash(customer.id, clean(input.code) ?? "")
      ) {
        if (otp) {
          await prisma.customerOtp.update({
            where: { id: otp.id },
            data: {
              failedAttempts: { increment: 1 },
              lockedAt: otp.failedAttempts >= 4 ? new Date() : undefined,
            },
          });
        }
        throw new AccountError("INVALID_CODE");
      }

      await prisma.customerOtp.update({
        where: { id: otp.id },
        data: { consumedAt: new Date(), failedAttempts: 0 },
      });

      return createSession(customer);
    },
    signInWithGoogle: async (profile) => {
      const customer = await upsertCustomer({
        googleSub: profile.sub,
        email: profile.email,
        name: profile.name,
      });
      return createSession(customer);
    },
    getAccountByToken: async (token) => {
      const session = await prisma.customerSession.findUnique({
        where: { tokenHash: hash(token) },
        include: { customer: true },
      });
      if (!session || session.expiresAt < new Date()) {
        throw new AccountError("SESSION_NOT_FOUND");
      }
      return accountSummary(prisma, session.customer);
    },
  };
}
