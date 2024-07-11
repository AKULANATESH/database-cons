/*
  Warnings:

  - You are about to drop the column `OrderItemId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `OrderId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_OrderItemId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "OrderItemId";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN "OrderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_OrderId_fkey" FOREIGN KEY ("OrderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
