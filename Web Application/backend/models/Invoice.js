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
  pOrderId: {
    type: String,
    required: true,
  },
  supplierId: {
    type: String,
    required: true,
  },
  itemCode: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  uom: {
    type: String,
    required: false,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
});

// create a model based on the invoice schema
const Invoice = mongoose.model("Invoice", invoiceSchema);

// export the invoice model to be used in other parts of the application
module.exports = Invoice;