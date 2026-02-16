import mongoose from "mongoose"
const CheckoutFormDataSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "users"},
    addressId: {type:mongoose.Schema.Types.ObjectId, ref: "address"},
    email: {type: String},
    phone: {type: String},
}, {
    timestamps:true
});
const CheckoutFormDataModal = mongoose.model("checkout", CheckoutFormDataSchema)

export default CheckoutFormDataModal;


// cardNumber: {type:String},
//     cardholderName: {type:String},
//     expiryDate:{ type: String},
//     csv: {type:String},
//     PaymentOption: {type:String}