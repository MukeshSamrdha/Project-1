const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Shipmentschema = new schema({
    email:{type:String,required:true},
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    fhno: { type: String, required: true },
    fcolony: { type: String, required: true },
    fpincode: { type: Number, required: true },
    fcity: { type: String, required: true },
    fstate: { type: String, required: true },
    thno: { type: String, required: true },
    tcolony: { type: String, required: true },
    tpincode: { type: Number, required: true },
    tcity: { type: String, required: true },
    tstate: { type: String, required: true },
    pud: { type: Date, required: true },
    dda: { type: Date, required: true },
    status:{type:Number,required:true}, //true antey current ani shipment complete ayipothey false ani chey 
    photo:{type:String,required:true},  //fileconstraints proper ga vadu 
}, { timestamps: true });

const ShipmentModel = new mongoose.model("shipments", Shipmentschema);
module.exports = ShipmentModel;