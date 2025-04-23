// routes/items.js

var express = require("express");
var router = express.Router();

var items = require("../init_data.json").data;
var curId = items.length;

// GET all items
router.get("/", function (req, res) {
  res.json(items);
});

// Create a new item
router.post("/", function (req, res) {
  var item = req.body;
  item.id = ++curId;
  items.push(item);
  res.json(item);
});

// Get a specific item by id
router.get("/:id", function (req, res, next) {
  var item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) {
    return next();
  }
  res.json(item);
});

// Delete an item by id
router.delete("/:id", function (req, res) {
  var index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Item not found");
  items.splice(index, 1);
  res.status(204).send();
});

// Update an item by id
router.put("/:id", function (req, res, next) {
  var item = req.body;
  if (item.id !== parseInt(req.params.id)) {
    return next(new Error("ID parameter does not match body"));
  }
  var index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Item not found");
  items[index] = item;
  res.json(item);
});

module.exports = router;
