/*
  Warnings:

  - You are about to drop the column `orderId` on the `OrderItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "orderId";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_OrderItemId_fkey" FOREIGN KEY ("OrderItemId") REFERENCES "OrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
