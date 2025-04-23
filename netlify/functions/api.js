// netlify/functions/api.js

var express = require("express");
var bodyParser = require("body-parser");
var serverless = require("serverless-http");
var cors = require("cors");
var items = require("../../routes/items"); // Adjust the path accordingly

var app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Routes
app.use("/items", items);

// Error handling
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: err,
  });
});
app.use("/.netlify/functions/items", items);

// Export the app as a serverless function
module.exports.handler = serverless(app);
