/*
  Warnings:

  - You are about to drop the `_articletocategorie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_articletocategorie` DROP FOREIGN KEY `_ArticleToCategorie_A_fkey`;

-- DropForeignKey
ALTER TABLE `_articletocategorie` DROP FOREIGN KEY `_ArticleToCategorie_B_fkey`;

-- DropTable
DROP TABLE `_articletocategorie`;

-- CreateTable
CREATE TABLE `CategoriesArticles` (
    `articleId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`articleId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CategoriesArticles` ADD CONSTRAINT `CategoriesArticles_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriesArticles` ADD CONSTRAINT `CategoriesArticles_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categorie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
