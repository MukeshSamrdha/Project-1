const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Loginotpschema = new schema({
    email: { type: String, required: true },
    otp: { type: Number, },
    loged: { type: Boolean },
    mode:{type:Number}
}, { timestamps: true });

const LoginotpModel = mongoose.model("Loginotp", Loginotpschema);
module.exports = LoginotpModel;