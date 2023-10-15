/*
  Warnings:

  - You are about to drop the column `hashedToken` on the `RefreshToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "hashedToken",
ADD COLUMN     "refreshToken" TEXT[];
