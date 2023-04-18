/*
  Warnings:

  - You are about to drop the column `humidity` on the `UniquePlant` table. All the data in the column will be lost.
  - You are about to drop the `UniquePlantsToCollections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plantCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usersToUniquePlants` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nickname]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UniquePlantsToCollections" DROP CONSTRAINT "UniquePlantsToCollections_plantCollectionId_fkey";

-- DropForeignKey
ALTER TABLE "UniquePlantsToCollections" DROP CONSTRAINT "UniquePlantsToCollections_uniquePlantId_fkey";

-- DropForeignKey
ALTER TABLE "plantCollection" DROP CONSTRAINT "plantCollection_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "usersToUniquePlants" DROP CONSTRAINT "usersToUniquePlants_uniquePlantId_fkey";

-- DropForeignKey
ALTER TABLE "usersToUniquePlants" DROP CONSTRAINT "usersToUniquePlants_userId_fkey";

-- AlterTable
ALTER TABLE "UniquePlant" DROP COLUMN "humidity",
ADD COLUMN     "plantDepth" TEXT,
ADD COLUMN     "plantHeight" TEXT,
ADD COLUMN     "plantWeight" TEXT,
ADD COLUMN     "plantWidth" TEXT,
ADD COLUMN     "species2" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "uniquePlantId" TEXT,
ALTER COLUMN "nickname" DROP DEFAULT;

-- DropTable
DROP TABLE "UniquePlantsToCollections";

-- DropTable
DROP TABLE "plantCollection";

-- DropTable
DROP TABLE "usersToUniquePlants";

-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantCollection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "PlantCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlantCollectionToUniquePlant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlantCollectionToUniquePlant_AB_unique" ON "_PlantCollectionToUniquePlant"("A", "B");

-- CreateIndex
CREATE INDEX "_PlantCollectionToUniquePlant_B_index" ON "_PlantCollectionToUniquePlant"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_uniquePlantId_fkey" FOREIGN KEY ("uniquePlantId") REFERENCES "UniquePlant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "UniquePlant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantCollection" ADD CONSTRAINT "PlantCollection_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlantCollectionToUniquePlant" ADD CONSTRAINT "_PlantCollectionToUniquePlant_A_fkey" FOREIGN KEY ("A") REFERENCES "PlantCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlantCollectionToUniquePlant" ADD CONSTRAINT "_PlantCollectionToUniquePlant_B_fkey" FOREIGN KEY ("B") REFERENCES "UniquePlant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
