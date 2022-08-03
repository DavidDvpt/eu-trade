/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `item` DROP COLUMN `imageUrl`,
    ADD COLUMN `imageUrlId` VARCHAR(191) NULL;
