-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "default_image" TEXT[],
ADD COLUMN     "other_names" TEXT[],
ADD COLUMN     "scientific_name" TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;
