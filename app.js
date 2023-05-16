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

// define a route for the organic shop page
app.get( "/views/organic", ( req, res ) => {
    res.sendFile( __dirname + "/views/organic.html" );
} );


// define a route for the pastry shop page
app.get( "/views/pastry", ( req, res ) => {
    res.sendFile( __dirname + "/views/pastry.html" );
} );


// define a route for the recipies  page
app.get( "/views/recipies", ( req, res ) => {
    res.sendFile( __dirname + "/views/recipies.html" );
} );

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );