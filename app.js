//set up the server
const express = require("express");
const logger = require("morgan");
const app = express();
const port = 3306;

const DEBUG = true;
const db = require('./db/db_connection')

// Configure Express to use EJS
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// define middleware that logs all incoming requests
app.use(logger("dev"));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
app.get("/", (req, res) => {
    res.render('index');
});

const read_cart_all_sql = `
SELECT item.itemId as itemId, itemName, 
quantity, foodGroup, food.foodId as foodId,
address.addressId, address, DATE_FORMAT(orderdate, "%m/%d/%Y (%W)") AS orderDate, DATE_FORMAT(shipDate, "%m/%d/%Y (%W)") AS shipDate, description
FROM item
    JOIN food
    ON item.foodId = food.foodId
    JOIN addritem_xref
    ON item.itemId = addritem_xref.itemId
    JOIN address
    ON addritem_xref.addressId = address.addressId
ORDER BY item.itemId
`

// define a route for the cart page
app.get("/cart", (req, res) => {
    db.execute(read_cart_all_sql, (error, results) => {
        if (DEBUG) {
            console.log(error ? error : results)
        }
        if (error) {
            res.status(500).send(error)
        }
        else {
            let data = { itemlist: results };
            res.render('cart', data);
        }
    })
});

const read_cart_detail_sql = `
SELECT item.itemId as itemId, itemName, 
       quantity, foodGroup, food.foodId as foodId,
       address.addressId, address, DATE_FORMAT(orderdate, "%m/%d/%Y (%W)") AS orderDate, DATE_FORMAT(shipDate, "%m/%d/%Y (%W)") AS shipDate, description
FROM item
    JOIN food
    ON item.foodId = food.foodId
    JOIN addritem_xref
    ON item.itemId = addritem_xref.itemId
    JOIN address
    ON addritem_xref.addressId = address.addressId
WHERE item.itemId = ?
`

// define a route for the recipies shop page
app.get("/cart/:id", (req, res) => {
    db.execute(read_cart_detail_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else if (results.length == 0)
            res.status(404).send(`No assignment found with id = "${req.params.id}"`);
        else {
            let data = { item: results[0] }; // results is still an array, get first (only) element
            res.render('detail', data);
        }
    });
});

const delete_item_sql = `
    DELETE 
    FROM item
    WHERE itemId = ?
`
app.get("/cart/:id/delete", ( req, res ) => {
    db.execute(delete_item_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/cart");
        }
    });
});

// start the server
app.listen(port, () => {
    console.log(`App server listening on ${port}. (Go to http://localhost:${port})`);
});