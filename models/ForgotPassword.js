const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ForgotPasswordSchema = new schema({
    email: { type: String, required: true },
    otp: { type: Number },
    newpassword: { type: String, required: true }
}, { timestamps: true });

const ForgotPasswordModel = mongoose.model("ForgotPassword", ForgotPasswordSchema);
module.exports = ForgotPasswordModel;