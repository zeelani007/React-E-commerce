import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  cartItems: { type: Array, required: true },
  amount_Total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "pending" },
  trackingId: { type: String },

  name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  landmark: { type: String },
  // for order tracking
tracking: {
  carrier: { type: String },
  estimatedDate: { type: String },
  currentStatus: { type: String },
},
    history: [{
  status: String,
  date: Date
}],

});

const orderModal = mongoose.model("orders", orderSchema);

export default orderModal;
