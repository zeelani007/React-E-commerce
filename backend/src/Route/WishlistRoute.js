import express from "express"
const wishlistrouter = express.Router();
import {addToWishlistItemController, getWishlistItemController,deleteWishlistItemQtyController}  from "../Controller/WishlistController.js"

wishlistrouter.post("/add", addToWishlistItemController);
wishlistrouter.get("/get", getWishlistItemController)
wishlistrouter.delete("/delete-wishlist-item", deleteWishlistItemQtyController)

export default wishlistrouter;