/*
  Warnings:

  - Added the required column `isLimited` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isStackable` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `item` ADD COLUMN `isLimited` BOOLEAN NOT NULL,
    ADD COLUMN `isStackable` BOOLEAN NOT NULL;
