import express from "express";
const categoriesrouter =  express.Router();
import {
  addCategory,
  getAllCategories,
  deleteCategories,
} from "../Controller/CategoriesController.js";


categoriesrouter.post("/add", addCategory);
categoriesrouter.get("/all", getAllCategories);
categoriesrouter.delete("/:id", deleteCategories);

export default categoriesrouter;