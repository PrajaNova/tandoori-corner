import type { FastifyInstance } from "fastify";

import type { CatalogService } from "../services/catalog-service.js";

interface MenuRouteOptions {
  catalogService: CatalogService;
}

export async function registerMenuRoutes(
  app: FastifyInstance,
  { catalogService }: MenuRouteOptions,
) {
  app.get("/", async () => ({
    categories: await catalogService.listCategories(),
  }));

  app.get("/:categorySlug", async (request, reply) => {
    const { categorySlug } = request.params as { categorySlug: string };
    const category = await catalogService.getCategory(categorySlug);

    if (!category) {
      return reply.code(404).send({
        error: "MENU_CATEGORY_NOT_FOUND",
        message: "Menu category was not found.",
      });
    }

    return { category };
  });
}
