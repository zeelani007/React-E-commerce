import mongoose from "mongoose"

const wishlistProductSchema = new mongoose.Schema(
    {
        title: {type:String},
        subtitle: {type:String},
        old_price:{type:String},
        new_price: {type: String},
        level_range: {type:String},
        image:[{url: String}],
        productId: {
            type: mongoose.Schema.ObjectId,
            ref: "products",
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "users"
        }
    },
    {
        timestamps: true
    }
);
const wishlistProductModal = mongoose.model("wishlist", wishlistProductSchema)

export default wishlistProductModal;