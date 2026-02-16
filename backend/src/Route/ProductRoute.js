import express from "express";
const productRouter = express.Router();
import {
  createProduct, getProduct, deleteProduct,
  updateProduct,
  deleteProductImage
} from "../Controller/ProductController.js";

import upload from "../../config/multerconfig.js";

productRouter.post("/create", upload.array("image", 10), createProduct);
productRouter.get("/", getProduct);
productRouter.put("/update", upload.array("image", 10), updateProduct);
productRouter.delete("/delete/:id", deleteProduct)
productRouter.delete("/delete-image/:productId/:imageId", deleteProductImage)


export default productRouter;
