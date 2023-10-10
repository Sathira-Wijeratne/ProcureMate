const router = require("express").Router();
let StaffMember = require("../models/StaffMember");

// Get all staff members
router.route("/").get((req, res) => {
  StaffMember.find()
    .then((staffMember) => {
      res.json(staffMember);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get staff member by email
router.route("/get/email/:email").get(async (req, res) => {
  let email = req.params.email;
  await StaffMember.find({ email: `${email}` })
    .then((staffMember) => {
      res.json(staffMember);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error with get the staff member",
        error: err.message,
      });
    });
});

module.exports = router;
