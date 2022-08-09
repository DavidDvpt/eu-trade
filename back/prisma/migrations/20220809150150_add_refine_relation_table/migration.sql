-- CreateTable
CREATE TABLE `refineRelations` (
    `refinedItemId` INTEGER NOT NULL,
    `unrefinedItemId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`refinedItemId`, `unrefinedItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `refineRelations` ADD CONSTRAINT `refineRelations_refinedItemId_fkey` FOREIGN KEY (`refinedItemId`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refineRelations` ADD CONSTRAINT `refineRelations_unrefinedItemId_fkey` FOREIGN KEY (`unrefinedItemId`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
