ALTER TABLE "customer_otps" ADD COLUMN "failed_attempts" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "customer_otps" ADD COLUMN "locked_at" TIMESTAMP(3);
