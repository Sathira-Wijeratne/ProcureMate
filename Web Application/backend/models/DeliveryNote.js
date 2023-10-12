const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define a new schema for delivery note
const deliveryNoteSchema = new Schema({
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
  date: {
    type: Date,
    required: true,
  },
  status: {
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
});

// create a model based on the delivery note schema
const DeliveryNote = mongoose.model("DeliveryNote", deliveryNoteSchema);

// export the delivery note model to be used in other parts of the application
module.exports = DeliveryNote;
