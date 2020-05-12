DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  
  item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
  
  product_name VARCHAR(100) NOT NULL,
  
  department_name VARCHAR(100) NOT NULL,
  
  price DECIMAL(10,2) NOT NULL,

  stock_quantity INTEGER(100),

  PRIMARY KEY (item_id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Red Star Active Dry Yeast for Bread Machines 2pck", "Herbs, Spices & Seasonings", 15.99, 30),
("Red Star Active Dry Yeast, .25oz - 3 Count, Non-GMO, Bread Machine & Traditional", "Herbs, Spices & Seasonings", 8.99, 50),
("RED STAR ACTIVE DRY YEAST (3 - .25oz packets) | Non-Gmo | Bread Making", "Yeast & Baking Agents", 8.99, 75),
("Red Star Active Dry Yeast for Bread Machines 2pck", "Yeast & Baking Agents", 15.99, 20),
("(10 pack) - LeSaffre Saf-Instant Yeast, Gold - 1lb, Bread Yeast, Baking", "Yeast & Baking Agents", 59.99, 1),
("LeSaffre Saf-Instant Yeast, Gold - 1lbs, Bread Yeast, Instant Yeast, Baking", "Yeast & Baking Agents", 14.99, 10);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'