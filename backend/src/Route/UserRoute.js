import express from "express";
const userRouter = express.Router();
import {
  registerUser,
  getAllUsers,
  getSingleUser,
  updateUserRole,
   updateUserProfile,
  deleteUser,
  getUserProfile,
  updateProfileImage,
} from "../Controller/UserController.js";
import { loginUser } from "../Controller/LoginController.js";
import authMiddleware from "../../authMiddleware.js";
import upload from "../../MiddlewaresProfileImageuploads/ProfileUploads.js";

userRouter.post("/register", upload.single("profileImage"), registerUser);
userRouter.get("/all", getAllUsers);
userRouter.get("/singleuser/:id", getSingleUser);
userRouter.post("/login", loginUser);
userRouter.put("/role/:id", updateUserRole);
userRouter.put("/profile/:id", updateUserProfile);
userRouter.delete("/:id", deleteUser);
userRouter.get("/profile/:id", getUserProfile);  //for getting profile image
userRouter.put("/profileImage/:id",upload.single("profileImage"),updateProfileImage);
userRouter.get("/profile", authMiddleware)

export default userRouter;
