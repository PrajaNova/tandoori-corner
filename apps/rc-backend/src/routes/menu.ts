import type { FastifyInstance, FastifyReply } from "fastify";

import { createAdminAuthGuard, getAdminActor } from "../lib/admin-auth.js";
import type { AuditService } from "../services/audit-service.js";
import {
  type CreateMenuCategoryInput,
  type CreateMenuItemInput,
  MenuError,
  type MenuService,
  type UpdateMenuCategoryInput,
  type UpdateMenuItemInput,
} from "../services/menu-service.js";

interface MenuRouteOptions {
  adminApiToken?: string;
  auditService: AuditService;
  menuService: MenuService;
}

const categoryProperties = {
  name: { type: "string", minLength: 1 },
  title: { type: "string", minLength: 1 },
  slug: { type: "string", minLength: 1 },
  status: { type: "string", enum: ["active", "inactive"] },
  sortOrder: { type: "integer", minimum: 0 },
} as const;

const createCategorySchema = {
  body: {
    type: "object",
    anyOf: [{ required: ["name"] }, { required: ["title"] }],
    additionalProperties: true,
    properties: categoryProperties,
  },
} as const;

const updateCategorySchema = {
  body: {
    type: "object",
    additionalProperties: true,
    minProperties: 1,
    properties: categoryProperties,
  },
} as const;

const itemProperties = {
  categoryId: { type: "string", minLength: 1 },
  name: { type: "string", minLength: 1 },
  description: { type: "string", minLength: 1 },
  priceCents: { type: "integer", minimum: 0 },
  currency: { type: "string", enum: ["SGD"] },
  variants: {
    type: "array",
    items: {
      type: "object",
      required: ["label", "priceCents"],
      additionalProperties: false,
      properties: {
        label: { type: "string", minLength: 1 },
        priceCents: { type: "integer", minimum: 0 },
      },
    },
  },
  imageSlug: { type: "string", minLength: 1 },
  imageUrl: { type: "string" },
  veg: { type: "boolean" },
  vegan: { type: "boolean" },
  glutenFree: { type: "boolean" },
  spiceLevel: { type: "string", enum: ["MILD", "MEDIUM", "HOT", "EXTRA"] },
  allergens: { type: "array", items: { type: "string" } },
  tags: { type: "array", items: { type: "string" } },
  ingredients: { type: "array", items: { type: "string" } },
  slug: { type: "string", minLength: 1 },
  status: { type: "string", enum: ["active", "inactive"] },
  sortOrder: { type: "integer", minimum: 0 },
} as const;

const createItemSchema = {
  body: {
    type: "object",
    required: ["categoryId", "name", "description"],
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

function sendMenuError(reply: FastifyReply, error: unknown) {
  if (error instanceof MenuError) {
    switch (error.code) {
      case "NOT_FOUND":
        return reply.code(404).send({
          error: "MENU_NOT_FOUND",
          message: "Menu resource was not found.",
        });
      case "CONFLICT_SLUG":
        return reply.code(409).send({
          error: "MENU_SLUG_CONFLICT",
          message: "A menu entry with this slug already exists.",
        });
      case "CONFLICT_CATEGORY_MISSING":
        return reply.code(409).send({
          error: "MENU_CATEGORY_MISSING",
          message: "The target menu category does not exist.",
        });
      case "CONFLICT_HAS_REFERENCES":
        return reply.code(409).send({
          error: "MENU_HAS_REFERENCES",
          message: "Cannot delete: the category still has items.",
        });
    }
  }
  throw error;
}

export async function registerMenuRoutes(
  app: FastifyInstance,
  { adminApiToken, auditService, menuService }: MenuRouteOptions,
) {
  app.get("/", async () => ({
    categories: await menuService.listCategories(),
  }));

  app.get("/categories", async () => ({
    categories: await menuService.listCategories(),
  }));

  app.get("/categories/:categorySlug", async (request, reply) => {
    const { categorySlug } = request.params as { categorySlug: string };
    const category = await menuService.getCategory(categorySlug);

    if (!category) {
      return reply.code(404).send({
        error: "MENU_CATEGORY_NOT_FOUND",
        message: "Menu category was not found.",
      });
    }

    return { category };
  });

  await app.register(async (admin) => {
    admin.addHook("preHandler", createAdminAuthGuard(adminApiToken));

    admin.get("/admin/categories", async () => ({
      categories: await menuService.listCategories(true),
    }));

    admin.post(
      "/categories",
      { schema: createCategorySchema },
      async (request, reply) => {
        try {
          const category = await menuService.createCategory(
            request.body as CreateMenuCategoryInput,
          );
          await auditService.record({
            actor: getAdminActor(request),
            action: "create",
            entityType: "menuCategory",
            entityId: category.id,
            after: category,
          });
          return reply.code(201).send({ category });
        } catch (error) {
          return sendMenuError(reply, error);
        }
      },
    );

    admin.patch(
      "/categories/:id",
      { schema: updateCategorySchema },
      async (request, reply) => {
        const { id } = request.params as { id: string };
        try {
          const before = await menuService.getCategoryById(id);
          const category = await menuService.updateCategory(
            id,
            request.body as UpdateMenuCategoryInput,
          );
          await auditService.record({
            actor: getAdminActor(request),
            action: "update",
            entityType: "menuCategory",
            entityId: id,
            before,
            after: category,
          });
          return reply.send({ category });
        } catch (error) {
          return sendMenuError(reply, error);
        }
      },
    );

    admin.delete("/categories/:id", async (request, reply) => {
      const { id } = request.params as { id: string };
      try {
        const before = await menuService.getCategoryById(id);
        await menuService.deleteCategory(id);
        await auditService.record({
          actor: getAdminActor(request),
          action: "delete",
          entityType: "menuCategory",
          entityId: id,
          before,
        });
        return reply.code(204).send();
      } catch (error) {
        return sendMenuError(reply, error);
      }
    });

    admin.post(
      "/items",
      { schema: createItemSchema },
      async (request, reply) => {
        try {
          const item = await menuService.createItem(
            request.body as CreateMenuItemInput,
          );
          await auditService.record({
            actor: getAdminActor(request),
            action: "create",
            entityType: "menuItem",
            entityId: item.id,
            after: item,
          });
          return reply.code(201).send({ item });
        } catch (error) {
          return sendMenuError(reply, error);
        }
      },
    );

    admin.patch(
      "/items/:id",
      { schema: updateItemSchema },
      async (request, reply) => {
        const { id } = request.params as { id: string };
        try {
          const before = await menuService.getItem(id);
          const item = await menuService.updateItem(
            id,
            request.body as UpdateMenuItemInput,
          );
          await auditService.record({
            actor: getAdminActor(request),
            action: "update",
            entityType: "menuItem",
            entityId: id,
            before,
            after: item,
          });
          return reply.send({ item });
        } catch (error) {
          return sendMenuError(reply, error);
        }
      },
    );

    admin.delete("/items/:id", async (request, reply) => {
      const { id } = request.params as { id: string };
      try {
        const before = await menuService.getItem(id);
        await menuService.deleteItem(id);
        await auditService.record({
          actor: getAdminActor(request),
          action: "delete",
          entityType: "menuItem",
          entityId: id,
          before,
        });
        return reply.code(204).send();
      } catch (error) {
        return sendMenuError(reply, error);
      }
    });
  });
}
