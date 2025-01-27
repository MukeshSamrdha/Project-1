const mongoose = require("mongoose");
const schema = mongoose.Schema;

const mode = new schema({
    mode: { type: Number, required: true }
}, { timestamps: true });

const ModeModel =new  mongoose.model("Mode", mode);
module.exports = ModeModel;