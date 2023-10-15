const router = require("express").Router();

let PurchaseOrder = require("../models/PurchaseOrder");

router.route("/add").post((req, res) => {
 
  const pOrderId = req.body.pOrderId;
  const itemCode = req.body.itemCode;
  const itemName = req.body.itemName;
  const unitPrice = Number(req.body.unitPrice);
  const qty = Number(req.body.qty);
  const uom = req.body.uom;
  const amount = Number(req.body.unitPrice);
  const date = req.body.date;
  const dueDate = req.body.dueDate;
  const supplierId = req.body.supplierId;
  const siteMngId = req.body.siteMngId;
  const siteId = req.body.siteId;
  const location = req.body.location;
  const status = req.body.status;
  const newPurchaseOrder = new PurchaseOrder({

     pOrderId,
      itemCode,
      itemName,
      unitPrice,
      qty,
      uom,
      amount,
      date,
      dueDate,
      supplierId,
      siteMngId,
      siteId,
      location,
      status
  });
  newPurchaseOrder
    .save()
    .then(() => {
      res.json("Purchase Order added for product successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

//DISPLAY ROUTE
router.route("/").get((req, res) => {
    PurchaseOrder.find()
    .then((purchaseOrders) => {
      res.json(purchaseOrders);
    })
    .catch((err) => {
      console.log(err);
    });
});

//FETCHING DETAILS BASED ON PURCHASE ORDER ID
router.route("/purchaseOrder/getPurchaseOrder/:pOrderId").get(async (req, res) => {
  let pOrderId = '#'+ req.params.pOrderId;

  //The attribute name in the model passed as first parameter.
  await PurchaseOrder.findOne({ "pOrderId": `${pOrderId}` })
    .then((purchaseOrder) => {
      res.status(200).send({ status: "Invoice  Details fetched", purchaseOrder });
    })
    .catch((err) => {
      console.log(err.message);

      res.status(500).send({
        status: "Error In Fetching Purchase Order Details",
        error: err.message,
      });
    });
});


module.exports = router;
