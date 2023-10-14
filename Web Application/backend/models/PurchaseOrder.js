const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define a new schema for purchase order
const purchaseOrderSchema = new Schema({
  pOrderId: {
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
  unitPrice: {
    type: Number,
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
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  supplierId: {
    type: String,
    required: true,
  },
  siteMngId: {
    type: String,
    required: true,
  },
  siteId: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

// create a model based on the purchase order schema
const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);

// export the purchase order model to be used in other parts of the application
module.exports = PurchaseOrder;