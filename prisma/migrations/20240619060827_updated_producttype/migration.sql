/*
  Warnings:

  - The values [footwear,clothes,mobiles,watches,accessories,homeneeds,domesticneeds] on the enum `ProductType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[id,productName]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductType_new" AS ENUM ('FOOTWEAR', 'CLOTHES', 'MOBILES', 'WATCHES', 'ACCESSORIES', 'HOMENEEDS', 'DOMESTICNEEDS');
ALTER TABLE "Product" ALTER COLUMN "productType" TYPE "ProductType_new" USING ("productType"::text::"ProductType_new");
ALTER TYPE "ProductType" RENAME TO "ProductType_old";
ALTER TYPE "ProductType_new" RENAME TO "ProductType";
DROP TYPE "ProductType_old";
COMMIT;

-- DropIndex
DROP INDEX "Product_id_productName_productType_key";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "productType" SET NOT NULL,
ALTER COLUMN "productType" SET DATA TYPE "ProductType";

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_productName_key" ON "Product"("id", "productName");
