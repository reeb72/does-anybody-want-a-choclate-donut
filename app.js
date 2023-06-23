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

// Configure Express to parse URL-encoded POST request bodies (traditional forms)
app.use(express.urlencoded({ extended: false }));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
app.get("/", (req, res) => {
    res.render('index');
});

const read_cart_all_sql = `
SELECT item.itemId as itemId, itemName, 
quantity, foodGroup, food.foodId as foodId,
address.addressId, address.address, DATE_FORMAT(orderdate, "%m/%d/%Y (%W)") AS orderDate, DATE_FORMAT(shipDate, "%m/%d/%Y (%W)") AS shipDate, description
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
       address.addressId, address.address, DATE_FORMAT(orderdate, "%m/%d/%Y (%W)") AS orderDate, DATE_FORMAT(shipDate, "%m/%d/%Y (%W)") AS shipDate, description
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
            res.status(404).send(`No item found with id = "${req.params.id}"`);
        else {
            let data = { item: results[0] }; // results is still an array, get first (only) element
            res.render('detail', data);
        }
    });
});

const delete_xref_sql = `
    DELETE 
    FROM addritem_xref
    Where itemId = ?
`
const delete_itemId_sql = `
    DELETE
    From item
    Where itemId = ?
`

app.get("/cart/:id/delete", (req, res) => {
    db.execute(delete_xref_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
    });
    db.execute(delete_itemId_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/cart");
        }
    });
});

const create_item_sql = `
    INSERT INTO item 
        (itemName, foodId, quantity, item.address) 
    VALUES 
        (?, ?, ?, ?);
`

const update_item_sql = `
    UPDATE item
    SET
        itemName = ?,
        quantity = ?,
        foodId = ?,
        item.address = ?,
        orderDate = ?,
        shipDate = ?,
        description = ?
    WHERE
        itemId = ?
`

app.post("/cart", (req, res) => {
    db.execute(create_item_sql, [req.body.itemName, req.body.foodGroup, 
        req.body.quantity, req.body.address], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect(`/cart/${results.insertId}`);
        }
    });
});


app.post("/cart/:id", ( req, res ) => {
    db.execute(update_item_sql, [req.body.itemName, req.body.quantity, req.body.foodGroup, 
        req.body.address, req.body.orderDate, req.body.shipDate, 
        req.body.description, req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect(`/cart/${req.params.id}`);
        }
    });
});


// start the server
app.listen(port, () => {
    console.log(`App server listening on ${port}. (Go to http://localhost:${port})`);
});