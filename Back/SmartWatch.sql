CREATE DATABASE SmartWatches;
USE SmartWatches;

CREATE TABLE  retailer (
	`retailerId` INT NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    `cif` varchar(100) NOT NULL,
    `direccion` varchar(100) NOT NULL,
    PRIMARY KEY(retailerId)
);
CREATE TABLE  Products (
	`productId` INT NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `brand` varchar(100) NOT NULL,
    `image` varchar(500) NOT NULL,
    `price` varchar(20) NOT NULL,
    `relevance` INT NOT NULL,
    `description` varchar(1500),
    `retailerId` INT NOT NULL,
    PRIMARY KEY(productId),
    FOREIGN KEY(retailerId)
		REFERENCES retailer(retailerId)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- CREATE TABLE  STOCK(
-- 	`id` INT NOT NULL AUTO_INCREMENT,
--     `retailerId` INT NOT NULL,
--     `productId` INT NOT NULL,
--     PRIMARY KEY(id),
--     FOREIGN KEY(retailerId)
-- 		REFERENCES Retailer(retailerId)
--         ON UPDATE CASCADE
--         ON DELETE CASCADE,
--     FOREIGN KEY(productId)
--         REFERENCES Products(productId)
--         ON UPDATE CASCADE
--         ON DELETE CASCADE
-- );