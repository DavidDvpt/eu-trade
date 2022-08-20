/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `globalUserData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `globalUserData_userId_key` ON `globalUserData`(`userId`);
