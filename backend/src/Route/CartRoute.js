import express from "express"
const cartrouter = express.Router();

import { addToCartItemController, getCartItemController, updateCartItemQtyController, deleteCartItemQtyController, clearCartController } from "../Controller/CartController.js";

cartrouter.post("/add", addToCartItemController)
cartrouter.get("/get", getCartItemController);
cartrouter.put("/update-qty", updateCartItemQtyController)
cartrouter.delete("/delete-cart-item", deleteCartItemQtyController);
cartrouter.delete("/clear-cart", clearCartController)

export default cartrouter;