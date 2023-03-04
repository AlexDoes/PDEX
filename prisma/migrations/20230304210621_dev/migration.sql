-- DropForeignKey
ALTER TABLE "UniquePlant" DROP CONSTRAINT "UniquePlant_ownerId_fkey";

-- CreateTable
CREATE TABLE "_UsersUniquePlant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UsersUniquePlant_AB_unique" ON "_UsersUniquePlant"("A", "B");

-- CreateIndex
CREATE INDEX "_UsersUniquePlant_B_index" ON "_UsersUniquePlant"("B");

-- AddForeignKey
ALTER TABLE "_UsersUniquePlant" ADD CONSTRAINT "_UsersUniquePlant_A_fkey" FOREIGN KEY ("A") REFERENCES "UniquePlant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersUniquePlant" ADD CONSTRAINT "_UsersUniquePlant_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
