const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define a new schema for invoice
const invoiceSchema = new Schema({
  invoiceId: {
    type: String,
    required: true,
  },
  deliveryId: {
    type: String,
    required: true,
  },
  supplierId: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

// create a model based on the invoice schema
const Invoice = mongoose.model("Invoice", invoiceSchema);

// export the invoice model to be used in other parts of the application
module.exports = Invoice;
