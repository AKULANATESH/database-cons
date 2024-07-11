/*
  Warnings:

  - You are about to drop the `LoginCreds` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LoginCreds";

-- CreateTable
CREATE TABLE "Accounts" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);
