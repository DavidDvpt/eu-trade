-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('USER', 'MANAGER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `foundOn` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isActif` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `foundOn_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isActif` BOOLEAN NOT NULL DEFAULT true,
    `categoryId` INTEGER NOT NULL,
    `value` INTEGER NOT NULL DEFAULT 0,
    `ttMax` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `item_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itemOnFoundOn` (
    `itemId` INTEGER NOT NULL,
    `foundOnId` INTEGER NOT NULL,

    PRIMARY KEY (`itemId`, `foundOnId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itemOnFoundOn` ADD CONSTRAINT `itemOnFoundOn_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itemOnFoundOn` ADD CONSTRAINT `itemOnFoundOn_foundOnId_fkey` FOREIGN KEY (`foundOnId`) REFERENCES `foundOn`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
