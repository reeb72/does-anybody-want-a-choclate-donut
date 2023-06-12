const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

const delete_item_table_sql = "DELETE FROM item;"
db.execute(delete_item_table_sql);

const delete_food_table_sql = "DELETE FROM food;"
db.execute(delete_food_table_sql);

const delete_address_table_sql = "DELETE FROM address;"
db.execute(delete_address_table_sql);


const insert_food_sql = `
    INSERT INTO food 
        (foodId, foodGroup) 
    VALUES 
        (?, ?);
`

db.execute(insert_food_sql, [1, 'Meats']);

db.execute(insert_food_sql, [2, 'Fruits']);

db.execute(insert_food_sql, [3, 'Vegetables']);

db.execute(insert_food_sql, [4, 'Grains']);


const insert_item_sql = `
    INSERT INTO item 
        (itemId, itemName, quantity, foodId, orderDate, shipDate, description) 
    VALUES 
        (?, ?, ?, ?, ?, ?, ? );
`

//foodId: 2 => 'Fruits'
db.execute(insert_item_sql, [1, 'Banana', 6, 2, '2023-04-16', '2023-04-19', 
        'Freshly grown from Costa Rica']);

//foodId: 3 => 'Vegetables'
db.execute(insert_item_sql, [2, 'Cellery', 8, 3, '2023-06-01', null, null]);

//foodId: 1 => 'Meat'
db.execute(insert_item_sql, [3, 'Fried Chicken', 12, 1, '2023-06-07', '2023-06-11', null]);

const insert_address_sql = `
    INSERT INTO address 
        (address, itemId) 
    VALUES 
        (?, ?);
`

db.execute(insert_address_sql, ['100 Mudasir Street', 1]);
db.execute(insert_address_sql, ['115 Jerry Du Avenue', 1]);
db.execute(insert_address_sql, ['213 Wichka Terrace', 2]);
db.execute(insert_address_sql, ['213 Wichka Terrace', 3]);

//extra 

db.execute(insert_food_sql, [5, 'Dairy']);
db.execute(insert_food_sql, [6, 'Pastry']);
db.execute(insert_food_sql, [7, 'Beverage']);
db.execute(insert_food_sql, [8, 'Other']);

//subjectId: 1 => 'Meats'
db.execute(insert_item_sql, [4, 'Steamed Lamb', 2, 1, '2023-05-23', '2023-05-27', 'Cooked very well']);

//subjectId: 4 => 'Grains'
db.execute(insert_item_sql, [5, 'Bread Loaf', 1, 4, null, null, 'Baked at 345 degrees']);

//subjectId: 5 => 'Dairy'
db.execute(insert_item_sql, [6, 'Mozzerela Cheese', 4, 5, '2023-06-06', null, 'Not stinky']);

//subjectId: 6 => 'Pastry'
db.execute(insert_item_sql, [7, 'Red Velvet Cake', 2, 6, null, null, null]);

db.execute(insert_address_sql, ['27 Duhdia Lane', 4]);
db.execute(insert_address_sql, ['1803 Faizan Drive', 6]);
db.execute(insert_address_sql, ['429 Street Street', 5]);

db.end();