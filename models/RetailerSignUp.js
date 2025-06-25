const mongoose = require("mongoose");
const schema = mongoose.Schema;
const RetailerSchema = new schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phonenumber: { type: Number, required: true },
    dob: { type: Date, required: true },
    pa: { type: String, required: true },
    ca: { type: String },
    drivingliscence: { type: String, required: true },
    vr: { type: String, required: true },
    confirmpassword: { type: String, required: true },
    verifypassword: { type: String, required: true },
    state: { type: String, required:true },
    punc: { type: String, required: true },
    commu: { type: String, required: true },
    profe: { type: String, required: true },
    dr: { type: String, requied: true },
    at: { type: String, requied: true },
    dis:{type:String,required:true},
    ratings: { type: Number, required: true },
    capacity:{type:String},
    ds:{type:String,required:true},
    shipments: [{
        shipmentid: { type: mongoose.Types.ObjectId, requied: true },
        bestprice: { type: Number, required: true },
        status:{type:Number,required:true}
    }
    ],
    successfulshipments: [{
        shipmentid: { type: mongoose.Types.ObjectId, requied: true },
        bestprice: { type: Number, required: true },
        status:{type:Number,required:true}
    }],
    mode: { type: String, required: true }
}, { timestamps: true });

const RegisterModel = mongoose.model("Retailer", RetailerSchema);
module.exports = RegisterModel;