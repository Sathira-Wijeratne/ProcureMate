const router = require("express").Router();
let Supplier = require("../models/Supplier");
let PurchaseOrder = require("../models/PurchaseOrder");
let Item = require("../models/Item");

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

module.exports = router;
