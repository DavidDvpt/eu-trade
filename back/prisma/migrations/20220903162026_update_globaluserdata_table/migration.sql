/*
  Warnings:

  - You are about to drop the column `userId` on the `globalUserData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `globalUserData` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `globalUserData` DROP FOREIGN KEY `globalUserData_userId_fkey`;

-- AlterTable
ALTER TABLE `globalUserData` DROP COLUMN `userId`,
    MODIFY `id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `globalUserData_id_key` ON `globalUserData`(`id`);

-- AddForeignKey
ALTER TABLE `globalUserData` ADD CONSTRAINT `globalUserData_id_fkey` FOREIGN KEY (`id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
