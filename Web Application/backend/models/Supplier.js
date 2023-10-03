const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define a new schema for buyer
const supplierSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// create a model based on the buyer schema
const Supplier = mongoose.model("Supplier", supplierSchema);

// export the Buyer model to be used in other parts of the application
module.exports = Supplier;
