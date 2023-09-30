const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
    email : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    }
})

const Test = mongoose.model("Test", testSchema);

module.exports = Test;