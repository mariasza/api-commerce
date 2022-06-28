
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `api_commerce` DEFAULT CHARACTER SET utf8;

USE `api_commerce`;

DROP TABLE IF EXISTS `api_commerce`.`User`;

CREATE TABLE IF NOT EXISTS `api_commerce`.`User` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(500) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

DROP TABLE IF EXISTS `api_commerce`.`Category`;

CREATE TABLE IF NOT EXISTS `api_commerce`.`Category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

DROP TABLE IF EXISTS `api_commerce`.`Product`;

CREATE TABLE IF NOT EXISTS `api_commerce`.`Product` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(600)  NOT NULL,
  `price` DOUBLE NOT NULL,
  `userId` BIGINT NOT NULL,
  `categoryId` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_Product_User` FOREIGN KEY (`userId`) REFERENCES `api_commerce`.`User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Product_Category` FOREIGN KEY (`categoryId`) REFERENCES `api_commerce`.`Category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

DROP TABLE IF EXISTS `api_commerce`.`ProductImage`;

CREATE TABLE IF NOT EXISTS `api_commerce`.`ProductImage` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `url` VARCHAR(500) NOT NULL,
  `productId` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_ProductImage_Product` FOREIGN KEY (`productId`) REFERENCES `api_commerce`.`Product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;