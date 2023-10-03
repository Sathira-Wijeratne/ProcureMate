const router = require("express").Router();
let ProcurementStaffMember = require("../models/ProcurementStaffMember");

// Get all procurement staff members
router.route("/").get((req, res) => {
  ProcurementStaffMember.find()
    .then((procurementStaffMember) => {
      res.json(procurementStaffMember);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get procurement staff member by email
router.route("/get/email/:email").get(async (req, res) => {
  let email = req.params.email;
  await ProcurementStaffMember.find({ email: `${email}` })
    .then((procurementStaffMember) => {
      res.json(procurementStaffMember);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({
          status: "Error with get the procurement staff member",
          error: err.message,
        });
    });
});

module.exports = router;
