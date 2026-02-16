// import  express from "express";
// import  crypto from "crypto";
// import  sendEmail from "../../src/Nodemailerfile/test-email.js";
// import  User from "../Modal/UserModal.js";
// export const forgotrouter = express.Router();

// forgotrouter.post("/forgotpassword", async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }
//     const token = crypto.randomBytes(32).toString("hex");
//     user.resetPasswordToken = token;
//     user.resetPasswordExpires = Date.now() + 3600000;
//     await user.save();

//     const resetLink = `http://localhost:5173/resetpassword/${token}`;
//     const htmlContent = `<h3>Password Reset Request</h3>
//             <p>Click the link below to reset your password:</p>
//             <a href="${resetLink}">${resetLink}</a>
//             <p>This link will expire in 1 hour.</p>
//             `;

//     await sendEmail(email, "Password Reset", htmlContent);

//     res.json({ message: "Password reset link sent successfully" });
//   } catch (error) {
//     console.error("Forgot Password Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default forgotrouter;



import  express from "express";
import  crypto from "crypto";
import  sendEmail from "../../src/Nodemailerfile/test-email.js";
import  User from "../Modal/UserModal.js";

export const forgotrouter = express.Router();

forgotrouter.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    //generate a 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    //save otp and its expiration time
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpires = Date.now() + 10 * 60 * 1000; //10 minutes
    await user.save();

    //prepare the email content
    const htmlContent = `<h3>Password Reset OTP</h3>
            <p>Your OTP to reset your password is:</p>
            <h2>${otp}</h2>
            <p>This OTP is valid only for 10 minutes.</p>
            `;

    await sendEmail(email, "Password Reset", htmlContent);

    res.json({ message: "OTP sent to your email address" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default forgotrouter;
