CREATE TYPE "dietary_spice_level" AS ENUM ('MILD', 'MEDIUM', 'HOT', 'EXTRA');

CREATE TABLE "menu_categories" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "menu_categories_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "menu_items" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price_cents" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'SGD',
    "variants" JSONB NOT NULL DEFAULT '[]',
    "image_slug" TEXT NOT NULL,
    "veg" BOOLEAN NOT NULL DEFAULT false,
    "vegan" BOOLEAN,
    "gluten_free" BOOLEAN,
    "spice_level" "dietary_spice_level",
    "allergens" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" TEXT NOT NULL DEFAULT 'active',
    "sort_order" INTEGER NOT NULL,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "menu_categories_slug_key" ON "menu_categories"("slug");
CREATE UNIQUE INDEX "menu_items_slug_key" ON "menu_items"("slug");
CREATE INDEX "menu_items_category_id_sort_order_idx" ON "menu_items"("category_id", "sort_order");
CREATE INDEX "menu_items_status_idx" ON "menu_items"("status");

ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "menu_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
