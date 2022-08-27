-- CreateTable
CREATE TABLE `setup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `finderId` INTEGER NOT NULL,
    `ampId` INTEGER NOT NULL,
    `depthEnhancer` INTEGER NOT NULL DEFAULT 0,
    `rangeEnhancer` INTEGER NOT NULL DEFAULT 0,
    `skillEnhancer` INTEGER NOT NULL DEFAULT 0,
    `consomableType` ENUM('PROBE', 'UNIVERSAL_AMMO') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `setup` ADD CONSTRAINT `setup_finderId_fkey` FOREIGN KEY (`finderId`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `setup` ADD CONSTRAINT `setup_ampId_fkey` FOREIGN KEY (`ampId`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
