CREATE TABLE "promotions" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "cta_label" TEXT,
  "cta_href" TEXT,
  "placement" TEXT NOT NULL DEFAULT 'home',
  "status" TEXT NOT NULL DEFAULT 'active',
  "starts_at" TIMESTAMP(3),
  "ends_at" TIMESTAMP(3),
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "gallery_images" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "alt" TEXT NOT NULL,
  "image_url" TEXT NOT NULL,
  "category" TEXT NOT NULL DEFAULT 'food',
  "status" TEXT NOT NULL DEFAULT 'active',
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "gallery_images_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "testimonials" (
  "id" TEXT NOT NULL,
  "author" TEXT NOT NULL,
  "quote" TEXT NOT NULL,
  "source" TEXT,
  "rating" INTEGER,
  "status" TEXT NOT NULL DEFAULT 'active',
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "site_settings" (
  "key" TEXT NOT NULL,
  "value" JSONB NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "site_settings_pkey" PRIMARY KEY ("key")
);

CREATE TABLE "customers" (
  "id" TEXT NOT NULL,
  "name" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "marketing_opt_in" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "customer_otps" (
  "id" TEXT NOT NULL,
  "customer_id" TEXT NOT NULL,
  "channel" TEXT NOT NULL,
  "destination" TEXT NOT NULL,
  "code_hash" TEXT NOT NULL,
  "expires_at" TIMESTAMP(3) NOT NULL,
  "consumed_at" TIMESTAMP(3),
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "customer_otps_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "customer_sessions" (
  "id" TEXT NOT NULL,
  "customer_id" TEXT NOT NULL,
  "token_hash" TEXT NOT NULL,
  "expires_at" TIMESTAMP(3) NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "customer_sessions_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "bookings" ADD COLUMN "customer_id" TEXT;
ALTER TABLE "event_enquiries" ADD COLUMN "customer_id" TEXT;
ALTER TABLE "orders" ADD COLUMN "customer_id" TEXT;

CREATE INDEX "promotions_placement_status_idx" ON "promotions"("placement", "status");
CREATE INDEX "promotions_sort_order_idx" ON "promotions"("sort_order");
CREATE INDEX "gallery_images_category_status_idx" ON "gallery_images"("category", "status");
CREATE INDEX "gallery_images_sort_order_idx" ON "gallery_images"("sort_order");
CREATE INDEX "testimonials_status_idx" ON "testimonials"("status");
CREATE INDEX "testimonials_sort_order_idx" ON "testimonials"("sort_order");
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");
CREATE UNIQUE INDEX "customers_phone_key" ON "customers"("phone");
CREATE INDEX "customers_created_at_idx" ON "customers"("created_at");
CREATE INDEX "customer_otps_customer_id_idx" ON "customer_otps"("customer_id");
CREATE INDEX "customer_otps_destination_created_at_idx" ON "customer_otps"("destination", "created_at");
CREATE UNIQUE INDEX "customer_sessions_token_hash_key" ON "customer_sessions"("token_hash");
CREATE INDEX "customer_sessions_customer_id_idx" ON "customer_sessions"("customer_id");
CREATE INDEX "customer_sessions_expires_at_idx" ON "customer_sessions"("expires_at");
CREATE INDEX "bookings_customer_id_idx" ON "bookings"("customer_id");
CREATE INDEX "event_enquiries_customer_id_idx" ON "event_enquiries"("customer_id");
CREATE INDEX "orders_customer_id_idx" ON "orders"("customer_id");

ALTER TABLE "customer_otps" ADD CONSTRAINT "customer_otps_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "customer_sessions" ADD CONSTRAINT "customer_sessions_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "event_enquiries" ADD CONSTRAINT "event_enquiries_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
