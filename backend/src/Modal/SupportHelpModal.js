// models/SupportModel.js
import mongoose from "mongoose";

const supportSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
});

const SupportModel = mongoose.model("Support", supportSchema);
export default SupportModel; // ✅ ES module export
