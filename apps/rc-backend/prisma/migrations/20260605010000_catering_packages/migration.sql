-- CreateTable
CREATE TABLE "catering_packages" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "accent" TEXT NOT NULL DEFAULT 'dark',
    "price_cents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'SGD',
    "min_guests" INTEGER NOT NULL,
    "badge" TEXT,
    "features" JSONB NOT NULL DEFAULT '[]',
    "status" TEXT NOT NULL DEFAULT 'active',
    "sort_order" INTEGER NOT NULL,

    CONSTRAINT "catering_packages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "catering_packages_slug_key" ON "catering_packages"("slug");

-- CreateIndex
CREATE INDEX "catering_packages_status_idx" ON "catering_packages"("status");
