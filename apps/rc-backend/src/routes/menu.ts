import type { FastifyInstance } from "fastify";

import type { MenuService } from "../services/menu-service.js";

interface MenuRouteOptions {
  menuService: MenuService;
}

export async function registerMenuRoutes(
  app: FastifyInstance,
  { menuService }: MenuRouteOptions,
) {
  app.get("/", async () => ({
    categories: menuService.listCategories(),
  }));

  app.get("/:categorySlug", async (request, reply) => {
    const { categorySlug } = request.params as { categorySlug: string };
    const category = menuService.getCategory(categorySlug);

    if (!category) {
      return reply.code(404).send({
        error: "MENU_CATEGORY_NOT_FOUND",
        message: "Menu category was not found.",
      });
    }

    return {
      category,
    };
  });
}
