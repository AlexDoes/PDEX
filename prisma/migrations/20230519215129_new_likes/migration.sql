/*
  Warnings:

  - A unique constraint covering the columns `[plantId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[collectionId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Like_plantId_collectionId_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Like_plantId_userId_key" ON "Like"("plantId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_collectionId_userId_key" ON "Like"("collectionId", "userId");
