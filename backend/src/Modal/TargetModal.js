import  mongoose from "mongoose";

const targetSchema = new mongoose.Schema(
  {
    target: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);
const targetModal = mongoose.model("targets", targetSchema);
export default targetModal;