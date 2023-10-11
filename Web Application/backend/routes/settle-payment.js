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

//FETCHING DETAILS BASED ON PURCHASE ORDER ID
router.route("/getMatchingInvoice/:pOrderId").get(async (req, res) => {
  let pOrderId = '#'+ req.params.pOrderId;

  //The attribute name in the model passed as first parameter.
  await Invoice.findOne({ "pOrderId": `${pOrderId}` })
    .then((invoice) => {
      res.status(200).send({ status: "Invoice  Details fetched", invoice });
    })
    .catch((err) => {
      console.log(err.message);

      res.status(500).send({
        status: "Error In Fetching Invoice Details",
        error: err.message,
      });
    });
});


module.exports = router;
