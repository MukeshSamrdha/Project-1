const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Contact = new schema({
    name: { type:String, required: true },
    email: { type:String, required: true },
    number: {type: Number, required: true },
    subject: { type:String, required: true },
    description: {type: String, required: true }
}, { timestamps: true });

const ContactModel = mongoose.model("ContactForm", Contact);
module.exports = ContactModel;