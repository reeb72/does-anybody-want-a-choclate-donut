const db = require("./db_connection");

const select_food_sql = "SELECT * FROM food";

db.execute(select_food_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'food' contents:")
        console.log(results);
    }
);

const select_item_sql = `
SELECT *
FROM item
JOIN food
    ON item.foodId = food.foodId
ORDER BY
    item.itemId;
`;

db.execute(select_item_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'item' contents:")
        console.log(results);
    }
);

const select_address_sql = `
SELECT *
FROM address
JOIN item
    ON address.itemId = item.itemId
ORDER BY
    address.addressId;
`;

db.execute(select_address_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'address' contents:")
        console.log(results);
    }
);

db.end();