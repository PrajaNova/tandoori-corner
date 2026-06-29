import type { Prisma, PrismaClient } from "../generated/prisma/client.js";

export interface AuditEntry {
  actor: string;
  action: string;
  entityType: string;
  entityId: string;
  before?: unknown;
  after?: unknown;
}

export interface AuditService {
  record: (entry: AuditEntry) => Promise<void>;
}

type PrismaAuditClient = Pick<PrismaClient, "auditLog">;

function toPrismaJson(value: unknown): Prisma.InputJsonValue | undefined {
  if (value === undefined || value === null) return undefined;
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

export function createNullAuditService(): AuditService {
  return {
    record: async () => {},
  };
}

export function createMemoryAuditService(
  entries: AuditEntry[] = [],
): AuditService {
  return {
    record: async (entry) => {
      entries.push(entry);
    },
  };
}

export function createPrismaAuditService(
  prisma: PrismaAuditClient,
): AuditService {
  return {
    record: async (entry) => {
      await prisma.auditLog.create({
        data: {
          actor: entry.actor,
          action: entry.action,
          entityType: entry.entityType,
          entityId: entry.entityId,
          before: toPrismaJson(entry.before),
          after: toPrismaJson(entry.after),
        },
      });
    },
  };
}
