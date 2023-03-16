/*
  Warnings:

  - Added the required column `ownerId` to the `plantCollection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "plantCollection" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "plantCollection" ADD CONSTRAINT "plantCollection_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
