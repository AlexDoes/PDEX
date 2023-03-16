/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Plant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Plant_name_key" ON "Plant"("name");
