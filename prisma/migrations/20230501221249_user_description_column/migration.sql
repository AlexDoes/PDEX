-- AlterTable
ALTER TABLE "UniquePlant" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT DEFAULT 'I love plants! I''m not sure what to say about myself yet but check in later!';
