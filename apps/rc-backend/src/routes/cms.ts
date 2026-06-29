import type { FastifyInstance, FastifyReply } from "fastify";

import { createAdminAuthGuard, getAdminActor } from "../lib/admin-auth.js";
import type { AuditService } from "../services/audit-service.js";
import {
  CmsError,
  type CmsService,
  type GalleryImageInput,
  type PromotionInput,
  type TestimonialInput,
} from "../services/cms-service.js";

interface CmsRouteOptions {
  adminApiToken?: string;
  auditService: AuditService;
  cmsService: CmsService;
}

const status = { type: "string", enum: ["active", "inactive"] } as const;

const promotionSchema = {
  body: {
    type: "object",
    required: ["title", "description"],
    additionalProperties: false,
    properties: {
      title: { type: "string", minLength: 1, maxLength: 160 },
      description: { type: "string", minLength: 1, maxLength: 2000 },
      ctaLabel: { type: "string", maxLength: 80 },
      ctaHref: { type: "string", maxLength: 300 },
      placement: { type: "string", minLength: 1, maxLength: 80 },
      status,
      startsAt: { type: "string", maxLength: 80 },
      endsAt: { type: "string", maxLength: 80 },
      sortOrder: { type: "integer", minimum: 0 },
    },
  },
} as const;

const gallerySchema = {
  body: {
    type: "object",
    required: ["title", "alt", "imageUrl"],
    additionalProperties: false,
    properties: {
      title: { type: "string", minLength: 1, maxLength: 160 },
      alt: { type: "string", minLength: 1, maxLength: 240 },
      imageUrl: { type: "string", minLength: 1, maxLength: 500 },
      category: { type: "string", minLength: 1, maxLength: 80 },
      status,
      sortOrder: { type: "integer", minimum: 0 },
    },
  },
} as const;

const testimonialSchema = {
  body: {
    type: "object",
    required: ["author", "quote"],
    additionalProperties: false,
    properties: {
      author: { type: "string", minLength: 1, maxLength: 120 },
      quote: { type: "string", minLength: 1, maxLength: 2000 },
      source: { type: "string", maxLength: 120 },
      rating: { type: "integer", minimum: 1, maximum: 5 },
      status,
      sortOrder: { type: "integer", minimum: 0 },
    },
  },
} as const;

const idParamsSchema = {
  params: {
    type: "object",
    required: ["id"],
    additionalProperties: false,
    properties: { id: { type: "string", minLength: 1 } },
  },
} as const;

const settingSchema = {
  params: {
    type: "object",
    required: ["key"],
    additionalProperties: false,
    properties: { key: { type: "string", minLength: 1, maxLength: 80 } },
  },
  body: {
    type: "object",
    required: ["value"],
    additionalProperties: false,
    properties: { value: {} },
  },
} as const;

function sendCmsError(reply: FastifyReply, error: unknown) {
  if (error instanceof CmsError) {
    if (error.code === "NOT_FOUND") {
      return reply.code(404).send({
        error: "CMS_ENTRY_NOT_FOUND",
        message: "CMS entry was not found.",
      });
    }
    return reply.code(400).send({
      error: "INVALID_CMS_ENTRY",
      message: "Please check the content fields and try again.",
    });
  }
  throw error;
}

export async function registerCmsRoutes(
  app: FastifyInstance,
  { adminApiToken, auditService, cmsService }: CmsRouteOptions,
) {
  app.get("/promotions", async () => ({
    promotions: await cmsService.listPromotions(),
  }));
  app.get("/gallery", async () => ({
    images: await cmsService.listGalleryImages(),
  }));
  app.get("/testimonials", async () => ({
    testimonials: await cmsService.listTestimonials(),
  }));
  app.get("/settings", async () => ({
    settings: await cmsService.listSettings(),
  }));

  await app.register(async (admin) => {
    admin.addHook("preHandler", createAdminAuthGuard(adminApiToken));

    admin.get("/admin/promotions", async () => ({
      promotions: await cmsService.listPromotions(true),
    }));
    admin.post(
      "/admin/promotions",
      { schema: promotionSchema },
      async (request, reply) => {
        try {
          const body = request.body as PromotionInput;
          const promotion = await cmsService.savePromotion({
            ...body,
            placement: body.placement ?? "home",
            status: body.status ?? "active",
            sortOrder: body.sortOrder ?? 0,
          });
          await auditService.record({
            actor: getAdminActor(request),
            action: "upsert",
            entityType: "promotion",
            entityId: promotion.id,
            after: promotion,
          });
          return reply.code(201).send({ promotion });
        } catch (error) {
          return sendCmsError(reply, error);
        }
      },
    );
    admin.patch(
      "/admin/promotions/:id",
      { schema: { ...idParamsSchema, ...promotionSchema } },
      async (request, reply) => {
        const { id } = request.params as { id: string };
        try {
          const before = await cmsService.getPromotion(id);
          const body = request.body as PromotionInput;
          const promotion = await cmsService.savePromotion({
            ...body,
            placement: body.placement ?? before?.placement ?? "home",
            status: body.status ?? before?.status ?? "active",
            sortOrder: body.sortOrder ?? before?.sortOrder ?? 0,
            id,
          });
          await auditService.record({
            actor: getAdminActor(request),
            action: "update",
            entityType: "promotion",
            entityId: id,
            before,
            after: promotion,
          });
          return reply.send({ promotion });
        } catch (error) {
          return sendCmsError(reply, error);
        }
      },
    );
    admin.delete(
      "/admin/promotions/:id",
      { schema: idParamsSchema },
      async (request, reply) => {
        const { id } = request.params as { id: string };
        try {
          const before = await cmsService.getPromotion(id);
          await cmsService.deletePromotion(id);
          await auditService.record({
            actor: getAdminActor(request),
            action: "delete",
            entityType: "promotion",
            entityId: id,
            before,
          });
          return reply.code(204).send();
        } catch (error) {
          return sendCmsError(reply, error);
        }
      },
    );

    admin.get("/admin/gallery", async () => ({
      images: await cmsService.listGalleryImages(true),
    }));
    admin.post(
      "/admin/gallery",
      { schema: gallerySchema },
      async (request, reply) => {
        try {
          const body = request.body as GalleryImageInput;
          const image = await cmsService.saveGalleryImage({
            ...body,
            category: body.category ?? "food",
            status: body.status ?? "active",
            sortOrder: body.sortOrder ?? 0,
          });
          await auditService.record({
            actor: getAdminActor(request),
            action: "upsert",
            entityType: "galleryImage",
            entityId: image.id,
            after: image,
          });
          return reply.code(201).send({ image });
        } catch (error) {
          return sendCmsError(reply, error);
        }
      },
    );
    admin.patch(
      "/admin/gallery/:id",
      { schema: { ...idParamsSchema, ...gallerySchema } },
      async (request, reply) => {
        const { id } = request.params as { id: string };
        try {
          const before = await cmsService.getGalleryImage(id);
          const body = request.body as GalleryImageInput;
          const image = await cmsService.saveGalleryImage({
            ...body,
            category: body.category ?? before?.category ?? "food",
            status: body.status ?? before?.status ?? "active",
            sortOrder: body.sortOrder ?? before?.sortOrder ?? 0,
            id,
          });
          await auditService.record({
            actor: getAdminActor(request),
            action: "update",
            entityType: "galleryImage",
            entityId: id,
            before,
            after: image,
          });
          return reply.send({ image });
        } catch (error) {
          return sendCmsError(reply, error);
        }
      },
    );
    admin.delete(
      "/admin/gallery/:id",
      { schema: idParamsSchema },
      async (request, reply) => {
        const { id } = request.params as { id: string };
        try {
          const before = await cmsService.getGalleryImage(id);
          await cmsService.deleteGalleryImage(id);
          await auditService.record({
            actor: getAdminActor(request),
            action: "delete",
            entityType: "galleryImage",
            entityId: id,
            before,
          });
          return reply.code(204).send();
        } catch (error) {
          return sendCmsError(reply, error);
        }
      },
    );

    admin.get("/admin/testimonials", async () => ({
      testimonials: await cmsService.listTestimonials(true),
    }));
    admin.post(
      "/admin/testimonials",
      { schema: testimonialSchema },
      async (request, reply) => {
        try {
          const body = request.body as TestimonialInput;
          const testimonial = await cmsService.saveTestimonial({
            ...body,
            status: body.status ?? "active",
            sortOrder: body.sortOrder ?? 0,
          });
          await auditService.record({
            actor: getAdminActor(request),
            action: "upsert",
            entityType: "testimonial",
            entityId: testimonial.id,
            after: testimonial,
          });
          return reply.code(201).send({ testimonial });
        } catch (error) {
          return sendCmsError(reply, error);
        }
      },
    );
    admin.patch(
      "/admin/testimonials/:id",
      { schema: { ...idParamsSchema, ...testimonialSchema } },
      async (request, reply) => {
        const { id } = request.params as { id: string };
        try {
          const before = await cmsService.getTestimonial(id);
          const body = request.body as TestimonialInput;
          const testimonial = await cmsService.saveTestimonial({
            ...body,
            status: body.status ?? before?.status ?? "active",
            sortOrder: body.sortOrder ?? before?.sortOrder ?? 0,
            id,
          });
          await auditService.record({
            actor: getAdminActor(request),
            action: "update",
            entityType: "testimonial",
            entityId: id,
            before,
            after: testimonial,
          });
          return reply.send({ testimonial });
        } catch (error) {
          return sendCmsError(reply, error);
        }
      },
    );
    admin.delete(
      "/admin/testimonials/:id",
      { schema: idParamsSchema },
      async (request, reply) => {
        const { id } = request.params as { id: string };
        try {
          const before = await cmsService.getTestimonial(id);
          await cmsService.deleteTestimonial(id);
          await auditService.record({
            actor: getAdminActor(request),
            action: "delete",
            entityType: "testimonial",
            entityId: id,
            before,
          });
          return reply.code(204).send();
        } catch (error) {
          return sendCmsError(reply, error);
        }
      },
    );

    admin.get("/admin/settings", async () => ({
      settings: await cmsService.listSettings(true),
    }));

    admin.put(
      "/admin/settings/:key",
      { schema: settingSchema },
      async (request) => {
        const { key } = request.params as { key: string };
        const { value } = request.body as { value: unknown };
        const before = await cmsService.getSetting(key);
        const setting = await cmsService.saveSetting(key, value);
        await auditService.record({
          actor: getAdminActor(request),
          action: "upsert",
          entityType: "siteSetting",
          entityId: key,
          before,
          after: setting,
        });
        return { setting };
      },
    );
  });
}
