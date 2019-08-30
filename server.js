// Require dotenv so we can use our hidden values
require("dotenv").config();
// require express so we can use them to handle our routes
var express = require("express");
var exphbs = require("express-handlebars");

// require out database from our models folder
var db = require("./models");

//Initialize our application with express
var app = express();
//Set the port to be either our production connection, or local
var PORT = process.env.PORT || 3000;

var http = require("http").Server(app);

//Set up Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

//Set up Handlebars as our engine
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

//Require our routes for our app
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

//If running a test, set syncOptions.force to true
//Clearing the 'testdb'
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

//Start the server, syncing our models
db.sequelize.sync(syncOptions).then(function() {
    var server = http.listen(PORT, function() {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT  
        );
    });
});
module.exports = app;