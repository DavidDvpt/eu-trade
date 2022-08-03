-- AlterTable
ALTER TABLE `item` MODIFY `isLimited` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `isStackable` BOOLEAN NOT NULL DEFAULT false;
