//Not in use
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Custschema = new schema({
    custemail: { type: String, requires: true },
    custpassword: { type: String, required: true }
}, { timestamps: true });

const CustModel = new mongoose.model("customersignup", Custschema);
module.exports = CustModel;
