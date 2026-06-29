ALTER TABLE "customers" ADD COLUMN "google_sub" TEXT;
CREATE UNIQUE INDEX "customers_google_sub_key" ON "customers"("google_sub");
