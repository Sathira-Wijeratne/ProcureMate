const router = require("express").Router();

let Invoice = require("../models/Invoice");

router.route("/add").post((req, res) => {
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
  const newSettlePayment = new Invoice({
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
  newSettlePayment
    .save()
    .then(() => {
      res.json("Invoice added for product successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

//DISPLAY ROUTE
router.route("/").get((req, res) => {
  Invoice.find()
    .then((invoices) => {
      res.json(invoices);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
