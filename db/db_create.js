const db = require("./db_connection");

const drop_xref = "DROP TABLE IF EXISTS addritem;"
db.execute(drop_xref);

const drop_item_table_sql = "DROP TABLE IF EXISTS item;"
db.execute(drop_item_table_sql);

const drop_address_table_sql = "DROP TABLE IF EXISTS address;"
db.execute(drop_address_table_sql);

const drop_food_table_sql = "DROP TABLE IF EXISTS food;"
db.execute(drop_food_table_sql);


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
        PRIMARY KEY (addressId));
`

db.execute(create_address_table_sql);

const create_addritem_table_sql = `
CREATE TABLE addritem_xref (
    itemId INT NOT NULL,
    addressId INT NOT NULL,
    PRIMARY KEY (itemId, addressId),
    INDEX xrefAddr_idx (addressId ASC),
    INDEX xrefItem_idx (itemId ASC),
        CONSTRAINT xrefAddr
            FOREIGN KEY (addressId)
            REFERENCES address (addressId)
            ON DELETE RESTRICT
            ON UPDATE CASCADE,
        CONSTRAINT Item
            FOREIGN KEY (itemId)
            REFERENCES item (itemId)
            ON DELETE RESTRICT
            ON UPDATE CASCADE);
`

db.execute(create_addritem_table_sql);

db.end();