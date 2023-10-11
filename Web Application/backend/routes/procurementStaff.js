const router = require("express").Router();
let PurchaseOrder = require("../models/PurchaseOrder");
let StaffMember = require("../models/StaffMember");

// Get all pending purchase orders
router.route("/").get(async (req, res) => {
    await PurchaseOrder.find({ status: "Pending" })
        .then((purchaseOrders) => {
            res.json(purchaseOrders);
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                status: "Error with get the purchase orders",
                error: err.message
            });
        });
});

//get staff member name
router.route("/get/staff/member/name/:id").get(async (req, res) => {
    let id = req.params.id;
    await StaffMember.find({ email: `${id}` }, {name:1, _id:0})
        .then((staffMember) => {
            res.json(staffMember);
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                status: "Error with geting the staff member name",
                error: err.message
            });
        });
});

module.exports = router;