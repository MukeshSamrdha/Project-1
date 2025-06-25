const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Customerschema = new schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    createpassword: { type: String, required: true },
    verifypassword: { type: String, required: true },
    address: { type: String,required:true },
    mode: { type: String, required: true },
}, { timestamps: true }
);

const CustomerModel = new mongoose.model('Customer', Customerschema);
module.exports = CustomerModel;