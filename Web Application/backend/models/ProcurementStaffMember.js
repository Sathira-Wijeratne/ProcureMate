const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define a new schema for buyer
const procurementStaffMemberSchema = new Schema({
  empId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  phoneNumber: {
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
const ProcurementStaffMember = mongoose.model(
  "ProcurementStaffMember",
  procurementStaffMemberSchema
);

// export the Buyer model to be used in other parts of the application
module.exports = ProcurementStaffMember;
