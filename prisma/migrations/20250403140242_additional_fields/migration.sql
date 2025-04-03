/*
  Warnings:

  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "name",
ADD COLUMN     "client" VARCHAR(100) NOT NULL DEFAULT 'Gomor',
ADD COLUMN     "location" VARCHAR(255) NOT NULL DEFAULT 'Addis Ababa',
ADD COLUMN     "size" VARCHAR(255) NOT NULL DEFAULT '12x14',
ADD COLUMN     "title" VARCHAR(255) NOT NULL DEFAULT 'Gomor Building',
ADD COLUMN     "typology" VARCHAR(255) NOT NULL DEFAULT 'culture',
ADD COLUMN     "year" VARCHAR(4) NOT NULL DEFAULT '2025';
