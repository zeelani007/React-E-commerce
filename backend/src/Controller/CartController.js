import mongoose from "mongoose"
import cartProductModel from "../Modal/CartModal.js"
import UserModal from "../Modal/UserModal.js"
import productModal from "../Modal/productModal.js"

// save cart  for test
// http://localhost:5174/api/cart/add
// {
//   "userId": "67ebc4fd64c44a6f8be1142e",
//   "productId": "683ff9c6019b0b6312732492",
//   "quantity": 1
// }


export const addToCartItemController = async (req, res) => {
    try {
        const {quantity, total, subTotal, productId, userId} = req.body;

        // validate req body
        if(!userId || !productId) {
            return res.status(400).json({message: "Provide both userId and prodcutId", error: true, success: false
            });
        }
        if(!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({
                message:"Invalid userId format",
                error: true, success: false
            })
        }
        // check if user exists
        const userExists = await UserModal.findById(userId);
        if(!userExists) {
            return res.status(404).json({
                message: "User not found", 
                error: true,
                success: false,
            })
        }

        // check if the product exists
        const product = await productModal.findById(productId)
        if(!product) {
            return res.status(404).json({
                message: "Product not found",
                error: true, success: false,
            })
        }
        // check if the product is already in the cart
        const existingCartItem = await cartProductModel.findOne({
            userId,
            productId,
        });
        if(existingCartItem) {
            return res.status(400).json({
                message:"Item already in cart",
                error: true,
                success: false
            })
        }

        // Add new item to cart
        const cartItem = new cartProductModel({
            quantity,
            total: quantity * product.new_price + (118 - 100),
            productId,
            userId,
            title: product.title,
            subtitle: product.subtitle,
            image: product.image.map((img) => ({url: img.url})),
            old_price: product.old_price,
            new_price: product.new_price,
            category: product.category,
            subcategory: product.subcategory,
            size: product.size,
            discount: product.discount,
        });
        await cartItem.save();
        const updatedUser = await UserModal.findByIdAndUpdate(
            userId, 
            {$addToSet: {shopping_cart: productId}},  //add cart item _id
            {new: true}    //return updated document
        );
        return res.status(200).json({
            data: cartItem,
            updatedUser,
            message: "Item added successfully",
            error: false,
            success: true
        });
    }catch(error) {
        console.log('error while add to cart', error)
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false,
        })
    }
}


// get cart item controller
// http://localhost:5174/api/cart/get?userId=67ebc4fd64c44a6f8be1142e

export const getCartItemController = async (req, res) => {
    console.log("Request query from Cart", req.query)
    // console.log("Request body from cart", req.body)
    try {
        const userId = req.query.userId || req.body.userId;
        console.log('Received userId from cart', userId);

        const cartItem = await cartProductModel.find({
            userId: userId,
        }).populate("productId", "title subtitle image new_price");
        return res.json({
            data:cartItem,
            error: false,
            success: true,
        });
    }catch(error) {
        console.log("Error fetching cart item", error)
        return res.status(500).json({message: error.message || error,
            error: true,
            success: false,
        })
    }
}


// update cart item  for test postman
// http://localhost:5174/api/cart/update-qty
// {
//   "_id": "685135e34e91bdb0e066f1f9",
//   "userId": "67ebc4fd64c44a6f8be1142e",
//   "qty": 3
// }


export const updateCartItemQtyController = async (req, res) => {
    try {
        const {userId} = req.body;
        const {_id, qty} = req.body;

        if(!_id || !qty) {
            return res.status(400).json({
                message: "Provide _id, qty",
            });
        }

        const cartItem = await cartProductModel.findById(_id).populate("productId");
        
        console.log("cartItems", cartItem);
        if(!cartItem) {
            return res.status(404).json({message: "Cart item not found", error: true, success: false})
        }
        const updateCartitem = await cartProductModel.updateOne({
            _id: _id,
            userId: userId,
        },
        {
            quantity: qty,
            total: qty * cartItem.productId.new_price,
        }
    );
    return res.json({
        message: "Update Cart",
        success: true,
        error: false,
        data: updateCartitem
    })
    }catch(error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// delete single cart controller
// http://localhost:5174/api/cart/delete-cart-item
// {
//   "_id": "685135e34e91bdb0e066f1f9",
//   "userId": "67ebc4fd64c44a6f8be1142e",
//   "productId": "683ff9c6019b0b6312732492"
// }

export const deleteCartItemQtyController = async (req, res) => {
    try {
        const {userId, _id, productId} = req.body;

        if(!_id || !userId || !productId) {
            return res.status(400).json({
                message:"Provide _id, userId, productId",
                error: true,
                success: false
            })
        }
        const deleteCartItem = await cartProductModel.findByIdAndDelete(_id);
        if(!deleteCartItem) {
            return res.status(404).json({message: "The product in the cart is not found",
                error: true,
                success: false,
            });
        }
        const updatedUser = await UserModal.findByIdAndUpdate(userId, {$pull: {shopping_cart: productId}},
            {new: true}
        );
        return res.json({
            message: "Item Remove from cart",
            error: false,
            success: true,
            data: deleteCartItem,
            updatedUser
        });
    }catch(error) {
        return res.status(500).json({
            message: error.message  || error,
            error: true,
            success: false,
        })
    }
};

// delete all cart item after payment success
// http://localhost:5174/api/cart/clear-cart
// {
//   "userId": "67ebc4fd64c44a6f8be1142e"
// }
export const clearCartController = async(req, res) => {
    try {
        const {userId} = req.body;
        if(!userId) {
            return res.status.json({message: 'Provide userId', error: true, success:false})
        }
        await cartProductModel.deleteMany({userId})
        await UserModal.findByIdAndUpdate(userId, {$set: {shopping_cart: []}})
        return res.json({message: "Cart Cleared successfully!", success: true, error: false})
    }catch(error) {
        return res.status(500).json({message: error.message || error, error: true, success: false})
    }
}