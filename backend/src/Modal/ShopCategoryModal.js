import mongoose from "mongoose"
const shopCategoryCardSchema = new mongoose.Schema({
    title: { type: String },
    imageUrl: { type: String  },
    discount: { type: String },
    category: {type: String},
    link: {type:String}
},
{timestamps: true})
const HomeCard  = mongoose.model('HomeCard', shopCategoryCardSchema)

export default HomeCard;