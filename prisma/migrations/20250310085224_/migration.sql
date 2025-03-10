/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('LANDSCAPE', 'ARCHITECTURAL', 'STRUCTURAL', 'INTERIOR');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'ARCHITECTURAL',
ALTER COLUMN "status" SET DEFAULT 'COMPLETED';

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
