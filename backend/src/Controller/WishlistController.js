import mongoose from "mongoose"
import wishlistProductModal from "../Modal/WishlistModal.js"
import UserModal from "../Modal/UserModal.js"
import productModal from "../Modal/productModal.js"


// http://localhost:5174/api/wishlist/add
// {
//     "userId":"68524a912a8a9893d8f7034a",
//     "productId": "68524f920a0b61aa4addfed2"
// }
export const addToWishlistItemController = async (request, response) => {
    try {
    const {productId, userId} = request.body;
    console.log('userId, productId from backend', userId, productId)

    // validate request body
    if(!userId || !productId) {
        return response.status(400).json({
            message: "Provide both userId and productId",
            error: true,
            success: false,
        })
    }

    if(!mongoose.isValidObjectId(userId)) {
        return response.status(400).json({
            message: "Invalid userId format",
            error: true,
            success: false
        })
    }

    // check if user exists
    const userExists = await UserModal.findById(userId);
    if(!userExists) {
        return response.status(404).json({
            message: "User not found",
            error: true,
            success: false,
        })
    }

    // check if the product exists
    const product = await productModal.findById(productId)
    if(!product) {
        return response.status(404).json({
            message: "Product not found",
            error: true,
            success: false,
        })
    }

    // check if the product is already in the wishlist
    const existingWishlistItem = await wishlistProductModal.findOne({
        userId,
        productId,
    });
    if(existingWishlistItem) {
        return response.status(400).json({
            message: "Item already in wishlist",
            error: true,
            success: false
        })
    }

    // Add new item to wishlist
    const wishlistItem = new wishlistProductModal({
        productId,
        userId,
        title: product.title,
        subtitle: product.subtitle,
        old_price: product.old_price,
        new_price: product.new_price,
        level_range: product.level_range,
        image: product.image.map((img) => ({url: img.url})),
    });
    await wishlistItem.save();

    // update user wishlist array
    const updatedUser = await UserModal.findByIdAndUpdate(
        userId,
        {$addToSet: {wishlist_item: productId}},
        {new: true}
    );

    return response.status(200).json({
        data: wishlistItem,
        updatedUser,
        message: "Item added successfully",
        error: false,
        success: true,
    })
    }catch(error) {
     return response.status(500).json({
        message: error.message || "Internal Server Error",
        error: true,
        success: false
     })
    }
}

// get wishlist item
// http://localhost:5174/api/wishlist/get?userId=68524a912a8a9893d8f7034a
export const getWishlistItemController = async (request, response) => {
    try {
   
        const userId = request.query.userId || request.body.userId;
        console.log('Received userId from wishlist', userId);

        const wishlistItem = await wishlistProductModal.find({userId: userId}).populate("productId", "title subtitle image old_price new_price level_range" )
        console.log('Wishlist items through context', wishlistItem)
        return response.json({
            data: wishlistItem,
            error: false,
            success: true,
        })
    }catch(error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
// http://localhost:5174/api/wishlist/delete-wishlist-item
// {
//   "userId": "68524a912a8a9893d8f7034a",
//   "_id": "685284e1a57227d6d5f892fd",
//   "productId": "68524f920a0b61aa4addfed2"
// }
export const deleteWishlistItemQtyController = async(request, response) => {
    try {
     const {userId, _id, productId} = request.body;
     console.log("Request Body from deleteWishlistQtyController", request.body)
     console.log('userId, _id, productId deleteWishlistItemQtyController', userId, _id, productId)

     if(!_id || !userId || !productId) {
        return response.status(400).json({
            message: "Provide _id, userId, productId", error: true, success: false,
        })
     }

     const deleteWishlistItem = await wishlistProductModal.findByIdAndDelete(_id);
     console.log('deletewishlistItem', deleteWishlistItem);
     if(!deleteWishlistItem) {
        return response.status(404).json({
            message: "The product in the wishlist is not found",
            error: true,
            success: false
        })
     }
     const updatedUser = await UserModal.findByIdAndUpdate(userId, {$pull: {wishlist_item: productId}},
        {new: true}
     );

     return response.json({
        message: "Item Remove from wishlist",
        error: false,
        success: true,
        data: deleteWishlistItem,
        updatedUser
     })
    }catch(error) {
      return response.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      })
    }
}