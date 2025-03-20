/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR', 'USER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
