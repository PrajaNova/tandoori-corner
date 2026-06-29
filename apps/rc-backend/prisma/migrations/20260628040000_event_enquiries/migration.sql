CREATE TYPE "event_enquiry_status" AS ENUM ('NEW', 'CONTACTED', 'CONFIRMED', 'CANCELLED', 'CLOSED');

CREATE TABLE "event_enquiries" (
  "id" TEXT NOT NULL,
  "customer_name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "event_type" TEXT NOT NULL,
  "guest_count" INTEGER NOT NULL,
  "preferred_date" TIMESTAMP(3),
  "notes" TEXT,
  "source" TEXT NOT NULL DEFAULT 'form',
  "external_id" TEXT,
  "status" "event_enquiry_status" NOT NULL DEFAULT 'NEW',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "event_enquiries_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "event_enquiries_status_idx" ON "event_enquiries"("status");
CREATE INDEX "event_enquiries_preferred_date_idx" ON "event_enquiries"("preferred_date");
