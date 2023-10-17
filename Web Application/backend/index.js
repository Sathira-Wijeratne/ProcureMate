const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.set("strictQuery", true);

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Success!");
});

const testRouter = require("./routes/test.js");
app.use("/test", testRouter);

const supplierRouter = require("./routes/supplier.js");
app.use("/supplier", supplierRouter);

const staffMemberRouter = require("./routes/staffMember.js");
app.use("/staffmember", staffMemberRouter);

const procurementStaffRouter = require("./routes/procurementStaff.js");
app.use("/procurement", procurementStaffRouter);

const purchaseOrderRouterPayment = require("./routes/purchaseOrder.js");
app.use("/purchaseOrderPayment", purchaseOrderRouterPayment);

const deliveryNoteRouterPayment = require("./routes/deliveryNote.js");
app.use("/deliveryOrderPayment", deliveryNoteRouterPayment);

const invoiceRouterPayment = require("./routes/invoice.js");
app.use("/invoice", invoiceRouterPayment);

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT : ${PORT}`);
});
