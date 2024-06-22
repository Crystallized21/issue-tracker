-- AlterTable
ALTER TABLE `Issues` ADD COLUMN `assignedToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issues` ADD CONSTRAINT `Issues_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
