import mongoose from "mongoose"

const offerSchema = new mongoose.Schema({
    category:{type:String},
    image: {type: String},
    link: {type:String}
});

const offermodal = mongoose.model("offer", offerSchema)
export default offermodal;