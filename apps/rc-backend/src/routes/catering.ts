import type { FastifyInstance, FastifyReply } from "fastify";

import {
  CateringError,
  type CateringService,
  type CreatePackageInput,
  type UpdatePackageInput,
} from "../services/catering-service.js";

interface CateringRouteOptions {
  cateringService: CateringService;
}

const featureSchema = {
  type: "object",
  required: ["label", "included"],
  additionalProperties: false,
  properties: {
    label: { type: "string", minLength: 1 },
    included: { type: "boolean" },
  },
} as const;

const packageProperties = {
  slug: { type: "string", minLength: 1 },
  name: { type: "string", minLength: 1 },
  tagline: { type: "string", minLength: 1 },
  description: { type: "string", minLength: 1 },
  accent: { type: "string", enum: ["dark", "mid", "light"] },
  priceCents: { type: "integer", minimum: 0 },
  currency: { type: "string", enum: ["SGD"] },
  minGuests: { type: "integer", minimum: 1 },
  badge: { type: "string" },
  features: { type: "array", items: featureSchema },
  status: { type: "string", enum: ["active", "inactive"] },
  sortOrder: { type: "integer", minimum: 0 },
} as const;

const createPackageSchema = {
  body: {
    type: "object",
    required: ["name", "tagline", "description", "priceCents", "minGuests"],
    additionalProperties: false,
    properties: packageProperties,
  },
} as const;

const updatePackageSchema = {
  body: {
    type: "object",
    additionalProperties: false,
    minProperties: 1,
    properties: packageProperties,
  },
} as const;

function sendCateringError(reply: FastifyReply, error: unknown) {
  if (error instanceof CateringError) {
    switch (error.code) {
      case "NOT_FOUND":
        return reply.code(404).send({
          error: "CATERING_NOT_FOUND",
          message: "Catering package was not found.",
        });
      case "CONFLICT_SLUG":
        return reply.code(409).send({
          error: "CATERING_SLUG_CONFLICT",
          message: "A catering package with this slug already exists.",
        });
    }
  }
  throw error;
}

export async function registerCateringRoutes(
  app: FastifyInstance,
  { cateringService }: CateringRouteOptions,
) {
  // ---- Read endpoints (public) ----
  app.get("/packages", async (request) => {
    const { all } = request.query as { all?: string };
    return {
      packages: await cateringService.listPackages(all === "true"),
    };
  });

  app.get("/packages/:slug", async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const pkg = await cateringService.getPackageBySlug(slug);
    if (!pkg) {
      return reply.code(404).send({
        error: "CATERING_NOT_FOUND",
        message: "Catering package was not found.",
      });
    }
    return { package: pkg };
  });

  // ---- Write endpoints (admin) ----
  app.post(
    "/packages",
    { schema: createPackageSchema },
    async (request, reply) => {
      try {
        const pkg = await cateringService.createPackage(
          request.body as CreatePackageInput,
        );
        return reply.code(201).send({ package: pkg });
      } catch (error) {
        return sendCateringError(reply, error);
      }
    },
  );

  app.patch(
    "/packages/:id",
    { schema: updatePackageSchema },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      try {
        const pkg = await cateringService.updatePackage(
          id,
          request.body as UpdatePackageInput,
        );
        return reply.send({ package: pkg });
      } catch (error) {
        return sendCateringError(reply, error);
      }
    },
  );

  app.delete("/packages/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
      await cateringService.deletePackage(id);
      return reply.code(204).send();
    } catch (error) {
      return sendCateringError(reply, error);
    }
  });
}
