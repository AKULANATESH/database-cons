/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Accounts_username_key" ON "Accounts"("username");
