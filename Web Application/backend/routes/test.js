const router = require("express").Router();
let Test = require("../models/Test");

router.route("/get/email/:email").get(async(req, res)=>{
    let email = req.params.email;
    await Test.find({"email": `${email}`}).then((test)=>{
        res.json(test);
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get the buyer", error: err.message});
    })
})

module.exports = router;