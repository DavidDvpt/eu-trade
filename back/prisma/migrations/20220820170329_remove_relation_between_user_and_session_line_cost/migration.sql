/*
  Warnings:

  - You are about to drop the column `userId` on the `sessionLineCost` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `sessionLineCost` DROP FOREIGN KEY `sessionLineCost_userId_fkey`;

-- AlterTable
ALTER TABLE `sessionLineCost` DROP COLUMN `userId`;
