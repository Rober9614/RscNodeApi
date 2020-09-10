var http = require("http");
var cors = require("cors");
var path = require("path");
var logger = require("morgan");
var express = require("express");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");

/**
 * Configuration
 */
var app = express();

/**
 * environments
 *
 */

app.use(cors());

app.set("port", process.env.PORT || 5000);

app.use(logger("dev"));
app.use(methodOverride());

app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

// Paths
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// For use static files
app.use(express.static("files"));
app.use(express.static("public"));

/**
 * start server - listener
 *
 * error handling middleware should
 * be loaded after the loading the routes
 */

if ("development" == app.get("env")) {
  app.use(errorHandler());
}

var server = http.createServer(app);
server.listen(app.get("port"), function () {
  console.log("Server listening on port " + app.get("port"));
});
