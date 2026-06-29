CREATE TYPE "order_status" AS ENUM ('PENDING_PAYMENT', 'PAID', 'CONFIRMED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED');
CREATE TYPE "payment_status" AS ENUM ('REQUIRES_PAYMENT', 'PAID', 'FAILED', 'REFUNDED');

CREATE TABLE "orders" (
  "id" TEXT NOT NULL,
  "customer_name" TEXT NOT NULL,
  "email" TEXT,
  "phone" TEXT NOT NULL,
  "fulfillment_type" TEXT NOT NULL,
  "requested_at" TIMESTAMP(3),
  "address" TEXT,
  "notes" TEXT,
  "subtotal_cents" INTEGER NOT NULL,
  "tax_cents" INTEGER NOT NULL,
  "delivery_fee_cents" INTEGER NOT NULL,
  "total_cents" INTEGER NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'SGD',
  "status" "order_status" NOT NULL DEFAULT 'PENDING_PAYMENT',
  "payment_status" "payment_status" NOT NULL DEFAULT 'REQUIRES_PAYMENT',
  "stripe_payment_intent_id" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "order_items" (
  "id" TEXT NOT NULL,
  "order_id" TEXT NOT NULL,
  "menu_item_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "unit_price_cents" INTEGER NOT NULL,
  "quantity" INTEGER NOT NULL,
  "notes" TEXT,
  "total_cents" INTEGER NOT NULL,

  CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "orders_stripe_payment_intent_id_key" ON "orders"("stripe_payment_intent_id");
CREATE INDEX "orders_status_idx" ON "orders"("status");
CREATE INDEX "orders_payment_status_idx" ON "orders"("payment_status");
CREATE INDEX "orders_created_at_idx" ON "orders"("created_at");
CREATE INDEX "order_items_order_id_idx" ON "order_items"("order_id");
CREATE INDEX "order_items_menu_item_id_idx" ON "order_items"("menu_item_id");

ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
