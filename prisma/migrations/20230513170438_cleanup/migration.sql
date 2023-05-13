/*
  Warnings:

  - You are about to drop the column `userId` on the `UniquePlant` table. All the data in the column will be lost.
  - You are about to drop the column `uniquePlantId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UniquePlant" DROP CONSTRAINT "UniquePlant_userId_fkey";

-- AlterTable
ALTER TABLE "UniquePlant" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "uniquePlantId";
