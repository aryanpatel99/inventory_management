-- CreateTable
CREATE TABLE "public"."Products" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT,
    "price" DECIMAL(12,2) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "lowStockAt" INTEGER,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_sku_key" ON "public"."Products"("sku");

-- CreateIndex
CREATE INDEX "Products_userId_name_idx" ON "public"."Products"("userId", "name");

-- CreateIndex
CREATE INDEX "Products_createAt_idx" ON "public"."Products"("createAt");
