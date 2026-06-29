import type { FastifyInstance } from "fastify";

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, request, reply) => {
    const fastifyError = error as { validation?: unknown };
    if (fastifyError.validation) {
      return reply.code(400).send({
        error: "VALIDATION_ERROR",
        message: "Request body or parameters are invalid.",
      });
    }

    request.log.error({ error }, "Unhandled request error");
    return reply.code(500).send({
      error: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong.",
    });
  });
}
