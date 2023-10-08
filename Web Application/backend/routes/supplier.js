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

// Get Invoices
router.route("/getinvoices/:supplierid").get(async (req, res) => {
  let supplierId = req.params.supplierid;
  await Invoice.find({ supplierId: supplierId })
    .then((invoices) => {
      res.json(invoices);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error with get the invoices",
        error: err.message,
      });
    });
});

// Get Delivery Notes
router.route("/getdeliverynotes/:supplierid").get(async (req, res) => {
  let supplierId = req.params.supplierid;
  await DeliveryNote.find({ supplierId: supplierId })
    .then((deliveryNotes) => {
      res.json(deliveryNotes);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error with get the delivery notes",
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

// Get Invoice
router.route("/getinvoice/:invoiceId").get(async (req, res) => {
  let invoiceId = "#" + req.params.invoiceId;
  await Invoice.find({ invoiceId: invoiceId })
    .then((invoices) => {
      res.json(invoices);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error with get the invoice",
        error: err.message,
      });
    });
});

// Get Delivery Note
router.route("/getdeliverynote/:deliveryId").get(async (req, res) => {
  let deliveryId = "#" + req.params.deliveryId;
  await DeliveryNote.find({ deliveryId: deliveryId })
    .then((deliveryNotes) => {
      res.json(deliveryNotes);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error with get the delivery note",
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

// Update purchase order
router.route("/updatepurchaseorder/:pOrderId").put(async (req, res) => {
  let pOrderId = "#" + req.params.pOrderId;
  const {
    itemName,
    uom,
    date,
    dueDate,
    supplierId,
    siteMngId,
    siteId,
    location,
    status,
  } = req.body;
  const qty = Number(req.body.qty);
  const amount = Number(req.body.amount);
  const purchaseOrder = {
    pOrderId,
    itemName,
    qty,
    uom,
    amount,
    date,
    dueDate,
    supplierId,
    siteMngId,
    siteId,
    location,
    status,
  };

  await PurchaseOrder.findOneAndUpdate({ pOrderId: pOrderId }, purchaseOrder)
    .then(() => {
      res.status(200).send({ status: "Purchase Order Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "Error with updating the purchase order",
        error: err.message,
      });
    });
});

// Delete delivery note
router.route("/deletedeliverynote/:deliveryId").delete(async (req, res) => {
  let deliveryId = "#" + req.params.deliveryId;

  await DeliveryNote.findOneAndDelete({ deliveryId: deliveryId })
    .then(() => {
      res.status(200).send({ status: "Delivery note deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error with delete Delivery Note",
        error: err.message,
      });
    });
});

module.exports = router;
