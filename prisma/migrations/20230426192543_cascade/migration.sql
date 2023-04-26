-- DropForeignKey
ALTER TABLE "ImageOrderCollection" DROP CONSTRAINT "ImageOrderCollection_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "ImageOrderCollection" DROP CONSTRAINT "ImageOrderCollection_plantId_fkey";

-- AddForeignKey
ALTER TABLE "ImageOrderCollection" ADD CONSTRAINT "ImageOrderCollection_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "UniquePlant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageOrderCollection" ADD CONSTRAINT "ImageOrderCollection_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "PlantCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
