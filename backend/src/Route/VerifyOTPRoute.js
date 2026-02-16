import express from 'express'
import User from "../Modal/UserModal.js"

export const otpRouter = express.Router();

otpRouter.post("/verifyotp", async (req, res) => {
    const {email, otp} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user || !user.resetPasswordOTP || !user.resetPasswordOTPExpires) {
            return res.status(400).json({message: "OTP not requested"})
        }

        //check if OTP is correct and not expired
        if(user.resetPasswordOTP !== otp || user.resetPasswordOTPExpires < Date.now()) {
            return res.status(400).json({message: "Invalid or expired OTP"})
        }
        //otp id valid
        res.status(200).json({message: "OTP verified successfully"})
    } catch(error) {
        res.status(500).json({message: "Server error"})
    }
})

export default otpRouter;