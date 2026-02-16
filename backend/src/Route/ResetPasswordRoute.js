// import express from "express";
// import bcrypt from "bcryptjs";
// import User from "../Modal/UserModal.js";

// export const resetrouter = express.Router()

// resetrouter.post("/resetpassword/:token", async (req, res) => {
//     const { token } = req.params;
//     const { password } = req.body;

//     try {
//         const user = await User.findOne({
//             resetPasswordToken: token,
//             resetPasswordExpires: { $gt: Date.now() }
//         });

//         if (!user) {
//             return res.status(400).json({message: "Invalid or expired token"})
//         }

//         const hashedPassword = await bcrypt.hash(password, 10)
//         user.password = hashedPassword;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;
//         await user.save();

//         res.json({message: "Password has been reset successfully"})
//     } catch (error) {
//         console.error("Reset Password Error:", error)
//         res.status(500).json({message:"server error"})
//     }
// })

// export default resetrouter;



import express from "express";
import bcrypt from "bcryptjs";
import User from "../Modal/UserModal.js";

export const resetrouter = express.Router()

resetrouter.post("/resetpassword", async (req, res) => {
    const {email, password } = req.body;

    try {
        const user = await User.findOne({
            email,
            resetPasswordOTPExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({message: "Invalid or expired otp"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        user.password = hashedPassword;

        user.resetPasswordOTP = undefined;
        user.resetPasswordOTPExpires = undefined;
        await user.save();

        res.json({message: "Password has been reset successfully"})
    } catch (error) {
        console.error("Reset Password Error:", error)
        res.status(500).json({message:"server error"})
    }
})

export default resetrouter;