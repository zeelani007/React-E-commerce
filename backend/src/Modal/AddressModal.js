import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
    name: { type: String },
    email: { type: String },
    tag: { type: String, default: "Home" },
    street: String,
    city: String,
    state: String,
    phone: String,
    zip: String,
  },
  { timestamps: true }
);

const addressModal = mongoose.model("address", addressSchema);

export default addressModal;
