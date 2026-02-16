import express from 'express'
import mongoose from 'mongoose';
const checkoutrouter = express.Router();
import User from "../Modal/UserModal.js"
import Address from "../Modal/AddressModal.js"

// get shipping details useremail, phone
checkoutrouter.get("/shipping-details", async(req, res) => {
    const email = req.query.email?.trim();
    const phone = req.query.phone?.trim();
    try {
        // find user by user email
        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }
        console.log("User ID", user._id)
        console.log("Phone", phone)

        // find address using user._id and phone
        const address = await Address.findOne({userId:user._id, phone})
        console.log("Found address", address)
        if(!address) {
            return res.status(404).json({message: "Address not found"})
        }
        // send back user name and address
        res.json({
            name: user.name,
            email: user.email,
            address
        })
    }catch(error) {
        console.error("Error in shipping details", error)
        res.status(500).json({message: "Internal server error"})
    }
})

export default checkoutrouter;