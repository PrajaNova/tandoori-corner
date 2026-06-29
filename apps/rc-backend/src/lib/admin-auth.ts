import type { FastifyReply, FastifyRequest } from "fastify";

export function createAdminAuthGuard(token?: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!token) {
      return reply.code(503).send({
        error: "ADMIN_AUTH_NOT_CONFIGURED",
        message: "Admin access is not configured.",
      });
    }

    if (request.headers.authorization !== `Bearer ${token}`) {
      return reply.code(401).send({
        error: "ADMIN_UNAUTHORIZED",
        message: "Admin access is required.",
      });
    }
  };
}

export function getAdminActor(request: FastifyRequest): string {
  const header = request.headers["x-admin-user"];
  return typeof header === "string" && header.trim() ? header : "admin";
}
