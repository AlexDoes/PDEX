/*
  Warnings:

  - You are about to drop the column `collectionId` on the `UniquePlant` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `UniquePlant` table. All the data in the column will be lost.
  - You are about to drop the `PlantCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoritePlant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `explicitCollectionToUniquePlant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `explicitUsertoUniquePlant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `UniquePlant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlantCollection" DROP CONSTRAINT "PlantCollection_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "UniquePlant" DROP CONSTRAINT "UniquePlant_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "UniquePlant" DROP CONSTRAINT "UniquePlant_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritePlant" DROP CONSTRAINT "_FavoritePlant_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritePlant" DROP CONSTRAINT "_FavoritePlant_B_fkey";

-- DropForeignKey
ALTER TABLE "explicitCollectionToUniquePlant" DROP CONSTRAINT "explicitCollectionToUniquePlant_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "explicitCollectionToUniquePlant" DROP CONSTRAINT "explicitCollectionToUniquePlant_uniquePlantId_fkey";

-- DropForeignKey
ALTER TABLE "explicitUsertoUniquePlant" DROP CONSTRAINT "explicitUsertoUniquePlant_uniquePlantId_fkey";

-- DropForeignKey
ALTER TABLE "explicitUsertoUniquePlant" DROP CONSTRAINT "explicitUsertoUniquePlant_userId_fkey";

-- AlterTable
ALTER TABLE "UniquePlant" DROP COLUMN "collectionId",
DROP COLUMN "ownerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "PlantCollection";

-- DropTable
DROP TABLE "_FavoritePlant";

-- DropTable
DROP TABLE "explicitCollectionToUniquePlant";

-- DropTable
DROP TABLE "explicitUsertoUniquePlant";

-- CreateTable
CREATE TABLE "plantCollection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "plantCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersToUniquePlants" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "uniquePlantId" TEXT NOT NULL,

    CONSTRAINT "usersToUniquePlants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniquePlantsToCollections" (
    "id" TEXT NOT NULL,
    "uniquePlantId" TEXT NOT NULL,
    "plantCollectionId" TEXT NOT NULL,

    CONSTRAINT "UniquePlantsToCollections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UniquePlant" ADD CONSTRAINT "UniquePlant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersToUniquePlants" ADD CONSTRAINT "usersToUniquePlants_uniquePlantId_fkey" FOREIGN KEY ("uniquePlantId") REFERENCES "UniquePlant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersToUniquePlants" ADD CONSTRAINT "usersToUniquePlants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniquePlantsToCollections" ADD CONSTRAINT "UniquePlantsToCollections_uniquePlantId_fkey" FOREIGN KEY ("uniquePlantId") REFERENCES "UniquePlant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniquePlantsToCollections" ADD CONSTRAINT "UniquePlantsToCollections_plantCollectionId_fkey" FOREIGN KEY ("plantCollectionId") REFERENCES "plantCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
