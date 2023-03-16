-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'EDITOR', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plants" TEXT[],
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "species" TEXT,
    "water" TEXT,
    "light" TEXT,
    "humidity" TEXT,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniquePlant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "species" TEXT,
    "water" TEXT,
    "light" TEXT,
    "humidity" TEXT,
    "ownerId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "UniquePlant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plantCollection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plants" TEXT[],
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "plantCollection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "email" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UniquePlant" ADD CONSTRAINT "UniquePlant_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniquePlant" ADD CONSTRAINT "UniquePlant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plantCollection" ADD CONSTRAINT "plantCollection_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
