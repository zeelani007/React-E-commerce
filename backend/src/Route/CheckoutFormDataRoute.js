import express from "express"
const checkoutformrouter = express.Router();
import {addToCheckoutFormData, getCheckoutFormData} from "../Controller/CheckOutFormDataController.js"

checkoutformrouter.post("/post", addToCheckoutFormData)
checkoutformrouter.get("/get", getCheckoutFormData)

export default checkoutformrouter;