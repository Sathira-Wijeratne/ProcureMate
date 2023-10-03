const router = require("express").Router();
let Supplier = require("../models/Supplier");

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

module.exports = router;
