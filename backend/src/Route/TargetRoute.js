import  express from "express";
const targetrouter =  express.Router();
import {
  addTarget,
  getAllTarget,
  deleteTarget,
} from "../Controller/TargetController.js";


targetrouter.post("/add", addTarget);
targetrouter.get("/all", getAllTarget);
targetrouter.delete("/:id", deleteTarget);

export default targetrouter;