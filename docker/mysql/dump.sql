CREATE DATABASE IF NOT EXISTS ambev_development;

USE ambev_development;

CREATE TABLE IF NOT EXISTS `kernel` (
  `id` int PRIMARY KEY AUTO_INCREMENT, 
  `key` VARCHAR(10) NOT NULL,
  `address` TEXT DEFAULT NULL,
  UNIQUE KEY(`key`)
);

CREATE TABLE IF NOT EXISTS `cost_center` (
  `id` int PRIMARY KEY AUTO_INCREMENT, 
  `kernel_id` int NOT NULL,
  `key` VARCHAR(30) NOT NULL,
  `address` TEXT DEFAULT NULL,
  UNIQUE KEY(`key`),
  FOREIGN KEY(kernel_id) REFERENCES kernel(id)
);

CREATE TABLE IF NOT EXISTS `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT, 
  `name` VARCHAR(50) DEFAULT NULL,
  `key` VARCHAR(30) NOT NULL,
  UNIQUE KEY(`key`)
);

CREATE TABLE IF NOT EXISTS `materials` (
  `id` int PRIMARY KEY AUTO_INCREMENT, 
  `key` INT NOT NULL,
  `description` TEXT NOT NULL,
  `uml` VARCHAR(5) NOT NULL,
  `qty_amount` DOUBLE DEFAULT NULL,
  UNIQUE KEY(`key`)
);

CREATE TABLE IF NOT EXISTS `mip` (
  `id` int PRIMARY KEY AUTO_INCREMENT, 
  `doc` BIGINT NOT NULL, 
  `cost_control` INT NOT NULL,
  `kernel_id` INT NOT NULL,
  `cost_center_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `material_id` INT DEFAULT NULL,
  `qty_amount` DOUBLE NOT NULL,
  `value_obj` DOUBLE NOT NULL,
  `created_at` DATE NOT NULL,
  `updated_at` DATE DEFAULT NULL,
  FOREIGN KEY(kernel_id) REFERENCES kernel(id),
  FOREIGN KEY(cost_center_id) REFERENCES cost_center(id),
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(material_id) REFERENCES materials(id)
);

CREATE TABLE IF NOT EXISTS `products` (
  `id` int PRIMARY KEY AUTO_INCREMENT, 
  `key` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  UNIQUE KEY(`key`)
);

CREATE TABLE IF NOT EXISTS `volume` (
  `id` int PRIMARY KEY AUTO_INCREMENT, 
  `line` INT DEFAULT NULL,
  `version` INT DEFAULT NULL,
  `created_at` DATE NOT NULL,
  `update_at` DATE DEFAULT NULL,
  `kernel_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `volume_pc` DOUBLE NOT NULL,
  `um` VARCHAR(5) NOT NULL,
  `qty_amount` DOUBLE NOT NULL,
  `volume_hl` DOUBLE NOT NULL,
  `resource` VARCHAR(30),
  FOREIGN KEY(kernel_id) REFERENCES kernel(id),
  FOREIGN KEY(product_id) REFERENCES products(id)
);