const router = require("express").Router();
let Supplier = require("../models/Supplier");
let PurchaseOrder = require("../models/PurchaseOrder");
let Item = require("../models/Item");
let DeliveryNote = require("../models/DeliveryNote");
let Invoice = require("../models/Invoice");

// Get all suppliers
router.route("/").get((req, res) => {
  Supplier.find()
    .then((supplier) => {
      res.json(supplier);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get supplier by email
router.route("/get/email/:email").get(async (req, res) => {
  let email = req.params.email;
  await Supplier.find({ email: `${email}` })
    .then((supplier) => {
      res.json(supplier);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get the supplier", error: err.message });
    });
});

// Get pending orders
router.route("/getpendingorders/:supplierid").get(async (req, res) => {
  let supplierId = req.params.supplierid;
  await PurchaseOrder.find({ supplierId: supplierId, status: "Approved" })
    .then((purchaseOrders) => {
      res.json(purchaseOrders);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error with get the purchase orders",
        error: err.message,
      });
    });
});

// Get order
router.route("/getorder/:supplierid/:pOrderId").get(async (req, res) => {
  let supplierId = req.params.supplierid;
  let pOrderId = "#" + req.params.pOrderId;
  await PurchaseOrder.find({ supplierId: supplierId, pOrderId: pOrderId })
    .then((purchaseOrder) => {
      res.json(purchaseOrder);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error with get the purchase order",
        error: err.message,
      });
    });
});

// Get item details
router.route("/getitem/:supplierid/:itemname").get(async (req, res) => {
  let supplierId = req.params.supplierid;
  let itemName = req.params.itemname;
  await Item.find({ supplierId: supplierId, itemName: itemName })
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error with get the item",
        error: err.message,
      });
    });
});

// Create a delivery note
router.route("/createdeliverynote").post((req, res) => {
  const deliveryId = req.body.deliveryId;
  const pOrderId = req.body.pOrderId;
  const supplierId = req.body.supplierId;
  const date = req.body.date;
  const status = req.body.status;
  const itemName = req.body.itemName;
  const qty = Number(req.body.qty);
  const uom = req.body.uom;
  const siteMngId = req.body.siteMngId;
  const siteId = req.body.siteId;
  const location = req.body.location;

  const deliveryNote = new DeliveryNote({
    deliveryId,
    pOrderId,
    supplierId,
    date,
    status,
    itemName,
    qty,
    uom,
    siteMngId,
    siteId,
    location,
  });

  deliveryNote
    .save()
    .then(() => {
      res.json("Delivery Note Added.");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Create an Invoice
router.route("/createinvoice").post((req, res) => {
  const invoiceId = req.body.invoiceId;
  const deliveryId = req.body.deliveryId;
  const pOrderId = req.body.pOrderId;
  const supplierId = req.body.supplierId;
  const itemName = req.body.itemName;
  const qty = Number(req.body.qty);
  const uom = req.body.uom;
  const unitPrice = Number(req.body.unitPrice);
  const cost = Number(req.body.cost);
  const date = req.body.date;
  const paymentStatus = req.body.paymentStatus;

  const invoice = new Invoice({
    invoiceId,
    deliveryId,
    pOrderId,
    supplierId,
    itemName,
    qty,
    uom,
    unitPrice,
    cost,
    date,
    paymentStatus,
  });

  invoice
    .save()
    .then(() => {
      res.json("Invoice Added.");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
