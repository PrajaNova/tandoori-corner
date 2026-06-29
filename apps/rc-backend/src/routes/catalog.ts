import type { FastifyInstance, FastifyReply } from "fastify";

import { createAdminAuthGuard, getAdminActor } from "../lib/admin-auth.js";
import type { AuditService } from "../services/audit-service.js";
import {
  CatalogError,
  type CatalogService,
  type CreateCategoryInput,
  type CreateItemInput,
  type UpdateCategoryInput,
  type UpdateItemInput,
} from "../services/catalog-service.js";

interface CatalogRouteOptions {
  adminApiToken?: string;
  auditService: AuditService;
  catalogService: CatalogService;
}

const categoryProperties = {
  title: { type: "string", minLength: 1 },
  subtitle: { type: "string", minLength: 1 },
  icon: { type: "string", minLength: 1 },
  slug: { type: "string", minLength: 1 },
  status: { type: "string", enum: ["active", "inactive"] },
  sortOrder: { type: "integer", minimum: 0 },
} as const;

const createCategorySchema = {
  body: {
    type: "object",
    required: ["title", "subtitle", "icon"],
    additionalProperties: false,
    properties: categoryProperties,
  },
} as const;

const updateCategorySchema = {
  body: {
    type: "object",
    additionalProperties: false,
    minProperties: 1,
    properties: categoryProperties,
  },
} as const;

const itemProperties = {
  categoryId: { type: "string", minLength: 1 },
  name: { type: "string", minLength: 1 },
  description: { type: "string", minLength: 1 },
  story: { type: "string" },
  imageUrl: { type: "string" },
  priceCents: { type: "integer", minimum: 0 },
  currency: { type: "string", enum: ["SGD"] },
  tags: { type: "array", items: { type: "string" } },
  ingredients: { type: "array", items: { type: "string" } },
  slug: { type: "string", minLength: 1 },
  status: { type: "string", enum: ["active", "inactive"] },
  sortOrder: { type: "integer", minimum: 0 },
} as const;

const createItemSchema = {
  body: {
    type: "object",
    required: ["categoryId", "name", "description", "priceCents"],
    additionalProperties: false,
    properties: itemProperties,
  },
} as const;

const updateItemSchema = {
  body: {
    type: "object",
    additionalProperties: false,
    minProperties: 1,
    properties: itemProperties,
  },
} as const;

function sendCatalogError(reply: FastifyReply, error: unknown) {
  if (error instanceof CatalogError) {
    switch (error.code) {
      case "NOT_FOUND":
        return reply.code(404).send({
          error: "CATALOG_NOT_FOUND",
          message: "Catalog resource was not found.",
        });
      case "CONFLICT_SLUG":
        return reply.code(409).send({
          error: "CATALOG_SLUG_CONFLICT",
          message: "A catalog entry with this slug already exists.",
        });
      case "CONFLICT_CATEGORY_MISSING":
        return reply.code(409).send({
          error: "CATALOG_CATEGORY_MISSING",
          message: "The target category does not exist.",
        });
      case "CONFLICT_HAS_REFERENCES":
        return reply.code(409).send({
          error: "CATALOG_HAS_REFERENCES",
          message: "Cannot delete: the category still has items.",
        });
    }
  }
  throw error;
}

export async function registerCatalogRoutes(
  app: FastifyInstance,
  { adminApiToken, auditService, catalogService }: CatalogRouteOptions,
) {
  // ---- Read endpoints (public) ----
  app.get("/categories", async () => ({
    categories: await catalogService.listCategories(),
  }));

  app.get("/items", async (request) => {
    const { category, q } = request.query as {
      category?: string;
      q?: string;
    };
    return {
      items: await catalogService.listItems({
        categorySlug: category,
        query: q,
      }),
    };
  });

  app.get("/items/:itemSlug", async (request, reply) => {
    const { itemSlug } = request.params as { itemSlug: string };
    const item = await catalogService.getItemBySlug(itemSlug);
    if (!item) {
      return reply.code(404).send({
        error: "CATALOG_ITEM_NOT_FOUND",
        message: "Catalog item was not found.",
      });
    }
    return { item };
  });

  app.get("/search", async (request) => {
    const { q } = request.query as { q?: string };
    return { items: await catalogService.listItems({ query: q }) };
  });

  // ---- Write endpoints (admin) ----
  await app.register(async (admin) => {
    admin.addHook("preHandler", createAdminAuthGuard(adminApiToken));

    admin.post(
      "/categories",
      { schema: createCategorySchema },
      async (request, reply) => {
        try {
          const category = await catalogService.createCategory(
            request.body as CreateCategoryInput,
          );
          await auditService.record({
            actor: getAdminActor(request),
            action: "create",
            entityType: "catalogCategory",
            entityId: category.id,
            after: category,
          });
          return reply.code(201).send({ category });
        } catch (error) {
          return sendCatalogError(reply, error);
        }
      },
    );

    admin.patch(
      "/categories/:id",
      { schema: updateCategorySchema },
      async (request, reply) => {
        const { id } = request.params as { id: string };
        try {
          const before = (await catalogService.listCategories(true)).find(
            (category) => category.id === id,
          );
          const category = await catalogService.updateCategory(
            id,
            request.body as UpdateCategoryInput,
          );
          await auditService.record({
            actor: getAdminActor(request),
            action: "update",
            entityType: "catalogCategory",
            entityId: id,
            before,
            after: category,
          });
          return reply.send({ category });
        } catch (error) {
          return sendCatalogError(reply, error);
        }
      },
    );

    admin.delete("/categories/:id", async (request, reply) => {
      const { id } = request.params as { id: string };
      try {
        const before = (await catalogService.listCategories(true)).find(
          (category) => category.id === id,
        );
        await catalogService.deleteCategory(id);
        await auditService.record({
          actor: getAdminActor(request),
          action: "delete",
          entityType: "catalogCategory",
          entityId: id,
          before,
        });
        return reply.code(204).send();
      } catch (error) {
        return sendCatalogError(reply, error);
      }
    });

    admin.post(
      "/items",
      { schema: createItemSchema },
      async (request, reply) => {
        try {
          const item = await catalogService.createItem(
            request.body as CreateItemInput,
          );
          await auditService.record({
            actor: getAdminActor(request),
            action: "create",
            entityType: "catalogItem",
            entityId: item.id,
            after: item,
          });
          return reply.code(201).send({ item });
        } catch (error) {
          return sendCatalogError(reply, error);
        }
      },
    );

    admin.patch(
      "/items/:id",
      { schema: updateItemSchema },
      async (request, reply) => {
        const { id } = request.params as { id: string };
        try {
          const before = await catalogService.getItem(id);
          const item = await catalogService.updateItem(
            id,
            request.body as UpdateItemInput,
          );
          await auditService.record({
            actor: getAdminActor(request),
            action: "update",
            entityType: "catalogItem",
            entityId: id,
            before,
            after: item,
          });
          return reply.send({ item });
        } catch (error) {
          return sendCatalogError(reply, error);
        }
      },
    );

    admin.delete("/items/:id", async (request, reply) => {
      const { id } = request.params as { id: string };
      try {
        const before = await catalogService.getItem(id);
        await catalogService.deleteItem(id);
        await auditService.record({
          actor: getAdminActor(request),
          action: "delete",
          entityType: "catalogItem",
          entityId: id,
          before,
        });
        return reply.code(204).send();
      } catch (error) {
        return sendCatalogError(reply, error);
      }
    });
  });
}
