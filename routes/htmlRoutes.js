// Require the database from the models
var db = require("../models");

module.exports = function (app) {

    //Load the index page
    app.get("/", function(req, res) {
        res.render("index");
    });
}