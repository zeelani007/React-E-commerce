import mongoose from "mongoose"
const cartProductSchema = new mongoose.Schema({
    title: {type:String},
    subtitle: {type: String},
    old_price: {type: String},
    new_price: {type:String},
    image:[{url: String}],
    category: {type: String},
    subcategory: {type: String},
    size:{type: String},
    discount: {type:String},
    quantity: {
        type: Number,
        default: 1
    },
    total: {
        type: Number
    },
    subTotal: {
        type: Number
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "products",
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    }
}, {
    timestamps: true,
});

    const cartProductModel = mongoose.model("carts", cartProductSchema)
    export default cartProductModel;