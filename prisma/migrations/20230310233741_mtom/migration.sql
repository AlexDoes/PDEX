/*
  Warnings:

  - You are about to drop the `plantCollection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UniquePlant" DROP CONSTRAINT "UniquePlant_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "plantCollection" DROP CONSTRAINT "plantCollection_ownerId_fkey";

-- DropTable
DROP TABLE "plantCollection";

-- CreateTable
CREATE TABLE "PlantCollection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "PlantCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "explicitUsertoUniquePlant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "uniquePlantId" TEXT NOT NULL,

    CONSTRAINT "explicitUsertoUniquePlant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "explicitCollectionToUniquePlant" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "uniquePlantId" TEXT NOT NULL,

    CONSTRAINT "explicitCollectionToUniquePlant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UniquePlant" ADD CONSTRAINT "UniquePlant_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "PlantCollection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantCollection" ADD CONSTRAINT "PlantCollection_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "explicitUsertoUniquePlant" ADD CONSTRAINT "explicitUsertoUniquePlant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "explicitUsertoUniquePlant" ADD CONSTRAINT "explicitUsertoUniquePlant_uniquePlantId_fkey" FOREIGN KEY ("uniquePlantId") REFERENCES "UniquePlant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "explicitCollectionToUniquePlant" ADD CONSTRAINT "explicitCollectionToUniquePlant_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "PlantCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "explicitCollectionToUniquePlant" ADD CONSTRAINT "explicitCollectionToUniquePlant_uniquePlantId_fkey" FOREIGN KEY ("uniquePlantId") REFERENCES "UniquePlant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
