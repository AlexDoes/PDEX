/*
  Warnings:

  - You are about to drop the column `userId` on the `UniquePlant` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `UniquePlant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UniquePlant" DROP CONSTRAINT "UniquePlant_userId_fkey";

-- AlterTable
ALTER TABLE "UniquePlant" DROP COLUMN "userId",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UniquePlant" ADD CONSTRAINT "UniquePlant_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
