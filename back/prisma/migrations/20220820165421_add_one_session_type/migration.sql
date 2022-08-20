-- AlterTable
ALTER TABLE `session` MODIFY `type` ENUM('TRADE', 'MINING', 'INIT_STOCK') NOT NULL;
