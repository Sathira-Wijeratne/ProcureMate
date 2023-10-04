const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define a new schema for item
const itemSchema = new Schema({
  itemName: {
    type: String,
    required: true,
  },
  supplierId: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  uom: {
    type: String,
    required: false,
  },
});

// create a model based on the item schema
const Item = mongoose.model("Item", itemSchema);

// export the item model to be used in other parts of the application
module.exports = Item;
