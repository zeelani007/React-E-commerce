import User from "../Modal/UserModal.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//http://localhost:5174/api/users/login   to check via postman
// {
//     "email": "shop@gmail.com",  to check via postman
//     "password": "12345"         to check via postman
// }

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    //check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password!" });
    }
    //Generate JWT Token (valid for an hour)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // const token = jwt.sign(
    //   { id: user._id, email: user.email, role: user.role },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );

    // console.log("token", token);
    // res.status(200).json({
    //   message: "Login Successfully",
    //   token,
    //   id: user._id,
    //   name: user.name,
    //   email: user.email,
    // });
    res.status(200).json({
      message: "Login Successfully",
      token,
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role, 
    });
  } catch (error) {
    console.log("server error", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
