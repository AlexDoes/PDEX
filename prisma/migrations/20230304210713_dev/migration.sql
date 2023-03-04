/*
  Warnings:

  - You are about to drop the `_UsersUniquePlant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UsersUniquePlant" DROP CONSTRAINT "_UsersUniquePlant_A_fkey";

-- DropForeignKey
ALTER TABLE "_UsersUniquePlant" DROP CONSTRAINT "_UsersUniquePlant_B_fkey";

-- DropTable
DROP TABLE "_UsersUniquePlant";

-- AddForeignKey
ALTER TABLE "UniquePlant" ADD CONSTRAINT "UniquePlant_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
