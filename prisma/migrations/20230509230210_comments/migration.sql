-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "plantId" TEXT NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionComments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "CollectionComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "UniquePlant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionComments" ADD CONSTRAINT "CollectionComments_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "PlantCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
