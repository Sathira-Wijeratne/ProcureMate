const router = require("express").Router();
let StaffMember = require("../models/StaffMember");

// This backend route is used to get all the staff members from staffmembers collection in the database.
router.route("/").get((req, res) => {
  StaffMember.find()
    .then((staffMember) => {
      res.json(staffMember);
    })
    .catch((err) => {
      console.log(err);
    });
});

// This backend route is used to get a specific staff member by giving the email.
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
