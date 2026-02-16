import mongoose from "mongoose"
import CheckoutFormDataModal from "../Modal/CheckoutFormDataModal.js"
import sendOrderConfirmation from "../../sendOrderconfirmmail/SendEmail.js"

export const addToCheckoutFormData = async(req, res) => {
    try {
        const {userId, addressId, email, phone} = req.body;
        const newCheck = new CheckoutFormDataModal({ userId, addressId, email, phone });
        await newCheck.save();
        await sendOrderConfirmation(email);
        res.status(200).json({message: 'Checkout formDatasaved successfully', data: newCheck})
    }catch(error) {
        console.error("Failed to saved checkoutdata in server", error)
        return res.status(500).json({message:"Server error while saving checkoutformdata"})
    }
}

// get checkout formdatacontroller
export const getCheckoutFormData = async (req, res) => {
    try {
        const checkoutdata = await CheckoutFormDataModal.find();
        res.status(200).json({message:"Server error", error})
    }
    catch(error) {
        res.status(500).json({message: "Server error", error})
    }
}