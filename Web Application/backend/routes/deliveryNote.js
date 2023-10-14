const router = require("express").Router();

let DeliveryNote = require("../models/DeliveryNote");

router.route("/add").post((req, res) => {
    const deliveryId = req.body.deliveryId;
  const pOrderId = req.body.pOrderId;
  const supplierId = req.body.supplierId;
  const date = req.body.date;
  const status = req.body.status;
  const itemCode = req.body.itemCode;
  const itemName = req.body.itemName;
  const unitPrice = req.body.unitPrice;
  const qty = req.body.qty;
  const uom = req.body.uom;
  const siteMngId = req.body.siteMngId;
  const siteId = req.body.siteId;
  const location = req.body.location;

  const newDeliveryNote = new newDeliveryNote({
    deliveryId,
    pOrderId,
    supplierId,
    date,
    status,
    itemCode,
    itemName,
    unitPrice,
    qty,
    uom,
    siteMngId,
    siteId,
    location
  });
  newDeliveryNote
    .save()
    .then(() => {
      res.json("Delivery Note added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

//DISPLAY ROUTE
router.route("/").get((req, res) => {
    DeliveryNote.find()
    .then((deliveryNote) => {
      res.json(deliveryNote);
    })
    .catch((err) => {
      console.log(err);
    });
});

//FETCHING DETAILS BASED ON PURCHASE ORDER ID
router.route("/deliveryNote/getDeliveryNote/:deliveryId").get(async (req, res) => {
  let deliveryId = '#'+ req.params.deliveryId;

  //The attribute name in the model passed as first parameter.
  await DeliveryNote.findOne({ "deliveryId": `${deliveryId}` })
    .then((deliveryNote) => {
      res.status(200).send({ status: "Delivery Note Details fetched", deliveryNote });
    })
    .catch((err) => {
      console.log(err.message);

      res.status(500).send({
        status: "Error In Fetching Delivery Note Details",
        error: err.message,
      });
    });
});


module.exports = router;
