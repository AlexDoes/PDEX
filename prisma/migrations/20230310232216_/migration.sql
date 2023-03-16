/*
  Warnings:

  - You are about to drop the column `userId` on the `UniquePlant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UniquePlant" DROP CONSTRAINT "UniquePlant_userId_fkey";

-- AlterTable
ALTER TABLE "UniquePlant" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_FavoritePlant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritePlant_AB_unique" ON "_FavoritePlant"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritePlant_B_index" ON "_FavoritePlant"("B");

-- AddForeignKey
ALTER TABLE "_FavoritePlant" ADD CONSTRAINT "_FavoritePlant_A_fkey" FOREIGN KEY ("A") REFERENCES "UniquePlant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritePlant" ADD CONSTRAINT "_FavoritePlant_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
