-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `pseudo` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `role` ENUM('USER', 'MANAGER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `isActif` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isActif` BOOLEAN NOT NULL DEFAULT true,
    `familyId` INTEGER NOT NULL,

    UNIQUE INDEX `category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `family` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `isActif` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `family_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `value` FLOAT NOT NULL DEFAULT 0,
    `ttMax` FLOAT NOT NULL DEFAULT 0,
    `imageUrlId` VARCHAR(191) NULL,
    `isStackable` BOOLEAN NOT NULL DEFAULT false,
    `isLimited` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `item_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refineRelations` (
    `refinedItemId` INTEGER NOT NULL,
    `unrefinedItemId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`refinedItemId`, `unrefinedItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itemOnFoundOn` (
    `itemId` INTEGER NOT NULL,
    `foundOnId` INTEGER NOT NULL,

    PRIMARY KEY (`itemId`, `foundOnId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `number` INTEGER NOT NULL,
    `type` ENUM('TRADE', 'MINING') NOT NULL,
    `isOpen` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `closedAt` TIMESTAMP(6) NULL,
    `clics` INTEGER NOT NULL,
    `ttCost` FLOAT NOT NULL DEFAULT 0,
    `ttWin` FLOAT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessionLineCost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `sessionId` INTEGER NOT NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessionLineWin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemId` INTEGER NOT NULL,
    `quantityStorage` INTEGER NOT NULL DEFAULT 0,
    `quantityAvatar` INTEGER NOT NULL DEFAULT 0,
    `sessionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `category_familyId_fkey` FOREIGN KEY (`familyId`) REFERENCES `family`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refineRelations` ADD CONSTRAINT `refineRelations_refinedItemId_fkey` FOREIGN KEY (`refinedItemId`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refineRelations` ADD CONSTRAINT `refineRelations_unrefinedItemId_fkey` FOREIGN KEY (`unrefinedItemId`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itemOnFoundOn` ADD CONSTRAINT `itemOnFoundOn_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itemOnFoundOn` ADD CONSTRAINT `itemOnFoundOn_foundOnId_fkey` FOREIGN KEY (`foundOnId`) REFERENCES `foundOn`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessionLineCost` ADD CONSTRAINT `sessionLineCost_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessionLineCost` ADD CONSTRAINT `sessionLineCost_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessionLineCost` ADD CONSTRAINT `sessionLineCost_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessionLineWin` ADD CONSTRAINT `sessionLineWin_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessionLineWin` ADD CONSTRAINT `sessionLineWin_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
