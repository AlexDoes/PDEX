/*
  Warnings:

  - You are about to drop the column `plants` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `plants` on the `plantCollection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UniquePlant" ADD COLUMN     "collectionId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "plants";

-- AlterTable
ALTER TABLE "plantCollection" DROP COLUMN "plants";

-- AddForeignKey
ALTER TABLE "UniquePlant" ADD CONSTRAINT "UniquePlant_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "plantCollection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
