const router = require("express").Router();
let PurchaseOrder = require("../models/PurchaseOrder");
let StaffMember = require("../models/StaffMember");

// Get all pending raised orders
router.route("/").get(async (req, res) => {
    await PurchaseOrder.find({ status: "Pending" })
        .then((purchaseOrders) => {
            res.json(purchaseOrders);
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                status: "Error with getting the purchase orders",
                error: err.message
            });
        });
});

//get specific pending raised order
router.route("/get/:id").get(async (req, res) => {
    let id = "#" + req.params.id;
    await PurchaseOrder.findOne({ pOrderId: `${id}`, status: "Pending" })
        .then((purchaseOrder) => {
            res.json(purchaseOrder);
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                status: "Error with getting the purchase order",
                error: err.message
            });
        });
});

//handle approval of pending raised order
router.route("/handle/approve/:id").patch(async (req, res) => {
    let id = "#" + req.params.id;
    let orderStatus = req.body.status;
    let reason = req.body.rejectReason;

    await PurchaseOrder.findOneAndUpdate({ pOrderId: `${id}`, status: "Pending" }, { status: orderStatus, rejectReason: reason })
        .then(() => {
            res.json("Purchase Order handled successfully");
        })
        .catch((err) => {
            res.status(500).send({
                status: "Error with handling the purchase order",
                error: err.message
            });
        });
});

//get staff member name
router.route("/get/staff/member/name/:id").get(async (req, res) => {
    let id = req.params.id;
    await StaffMember.findOne({ email: `${id}` }, { name: 1, _id: 0 })
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

//get staff member name by empId
router.route("/get/staff/member/name/empId/:id").get(async (req, res) => {
    let id = req.params.id;
    await StaffMember.findOne({ empId: `${id}` }, { name: 1, _id: 0 })
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