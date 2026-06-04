import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../generated/prisma/client.js";

export function createPrismaClient(
  databaseUrl: string | undefined,
): PrismaClient {
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Configure it in apps/rc-backend/.env before starting the server.",
    );
  }

  const adapter = new PrismaPg({ connectionString: databaseUrl });
  return new PrismaClient({ adapter });
}
