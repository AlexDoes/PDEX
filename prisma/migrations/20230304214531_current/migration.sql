/*
  Warnings:

  - You are about to drop the column `collections` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `plants` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UniquePlant" ADD COLUMN     "collectionId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "collections",
DROP COLUMN "plants";

-- CreateTable
CREATE TABLE "plantCollection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "plantCollection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "email" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UniquePlant" ADD CONSTRAINT "UniquePlant_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "plantCollection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plantCollection" ADD CONSTRAINT "plantCollection_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
