//set up the server
const express = require( "express" );
const logger = require("morgan");
const app = express();
const port = 3000;

// define middleware that logs all incoming requests
app.use(logger("dev"));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/views/index.html" );
} );

// define a route for the cart page
app.get( "/cart", ( req, res ) => {
    res.sendFile( __dirname + "/views/cart.html" );
} );

// define a route for the recipies shop page
app.get( "/views/reci", ( req, res ) => {
    res.sendFile( __dirname + "/views/reci.html" );
} );


// define a route for the food shop page
app.get( "/views/food", ( req, res ) => {
    res.sendFile( __dirname + "/views/food.html" );
} );


// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );