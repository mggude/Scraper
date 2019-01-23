
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require all models
var db = require("./models");

// Define port
var PORT = 3000;

// Initialize express
var app = express();

// Configure middleware

    // Use morgan logger for logging requests
    app.use(logger("dev"));
    // Parse request body as JSON
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    // Public static folder
    app.use(express.static("public"));

// Handlebars
    // var exphbs = require("express-handlebars");
    // app.engine("handlebars", exphbs({ defaultLayout: "main" }));
    // app.set("view engine", "handlebars");

    // Import routes and give server access
    var routes = require("./controllers/headlines.js");
    app.use(routes);

// Hook mongojs configuration to the db variable
mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });

// Start the server
app.listen(PORT, function () {
    console.log(`App running on port ${PORT}!`)
})
