import express from "express";
const homecardrouter = express.Router();
import { addHomeCard, getHomeCard, updateHomeCard, deleteHomeCard } from "../Controller/ShopCategoryController.js"
import upload from "../../config/multerconfig.js";

homecardrouter.post("/post",upload.single('imageUrl'), addHomeCard);
homecardrouter.get("/", getHomeCard);
homecardrouter.put("/update/:id", updateHomeCard);
homecardrouter.delete("/delete/:id", deleteHomeCard);

export default homecardrouter;
