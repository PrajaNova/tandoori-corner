CREATE TYPE "booking_status" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

CREATE TABLE "bookings" (
  "id" TEXT NOT NULL,
  "customer_name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "party_size" INTEGER NOT NULL,
  "booked_for" TIMESTAMP(3) NOT NULL,
  "notes" TEXT,
  "status" "booking_status" NOT NULL DEFAULT 'PENDING',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "bookings_booked_for_idx" ON "bookings"("booked_for");
CREATE INDEX "bookings_status_idx" ON "bookings"("status");
