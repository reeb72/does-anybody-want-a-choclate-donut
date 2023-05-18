const db = require("./db_connection");

const drop_food_table_sql = "DROP TABLE IF EXISTS food;"
db.execute(drop_food_table_sql);

const drop_item_table_sql = "DROP TABLE IF EXISTS item;"
db.execute(drop_item_table_sql);

const drop_address_table_sql = "DROP TABLE IF EXISTS address;"
db.execute(drop_address_table_sql);


/**** Create tables ****/

const create_food_table_sql = `
    CREATE TABLE food (
        foodId INT NOT NULL AUTO_INCREMENT,
        foodGroup VARCHAR(45) NOT NULL,
        PRIMARY KEY (foodId));
`
db.execute(create_food_table_sql);

const create_item_table_sql = `
    CREATE TABLE item (
        itemId INT NOT NULL AUTO_INCREMENT,
        itemName VARCHAR(45) NOT NULL,
        quantity INT NULL,
        foodId INT NOT NULL,
        orderDate DATE NULL,
        shipDate DATE NULL,
        description VARCHAR(150) NULL,
        PRIMARY KEY (itemId),
        INDEX foodItem_idx (foodId ASC),
        CONSTRAINT foodItem
            FOREIGN KEY (foodId)
            REFERENCES food (foodId)
            ON DELETE RESTRICT
            ON UPDATE CASCADE);
`

db.execute(create_item_table_sql);

const create_address_table_sql = `
    CREATE TABLE address (
        addressId INT NOT NULL AUTO_INCREMENT,
        address VARCHAR(45) NOT NULL,
        itemId INT NOT NULL,
        PRIMARY KEY (addressId),
        INDEX addressItem_idx (itemId ASC),
        CONSTRAINT addressItem
            FOREIGN KEY (itemId)
            REFERENCES item (itemId)
            ON DELETE RESTRICT
            ON UPDATE CASCADE);
`

db.execute(create_address_table_sql);

db.end();