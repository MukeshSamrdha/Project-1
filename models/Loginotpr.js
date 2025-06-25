const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Loginotpschemar = new schema({
    email: { type: String, required: true },
    otp: { type: Number, },
    loged: { type: Boolean },
}, { timestamps: true });

const LoginotpModelr = mongoose.model("Loginotpr", Loginotpschemar);
module.exports = LoginotpModelr;
