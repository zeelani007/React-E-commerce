import HomeCard from "../Modal/ShopCategoryModal.js"
 import path from "path"
 import fs from "fs"
 import { fileURLToPath } from "url"
 import {dirname} from "path"

 const __filename = fileURLToPath(import.meta.url)
 const __dirname    = dirname(__filename)


//  http://localhost:5174/api/offers/post
export const addHomeCard = async(req, res) => {
    try {
        console.log("Incoming body:", req.body);
        console.log("REQ FILE:", req.file); // should not be undefined
        console.log("REQ BODY:", req.body); // should contain actual values

        const { title, discount, category, link } = req.body;
        const imageUrl = req.file ? `uploads/${req.file.filename}` : ""
        const newCard = new HomeCard({title, imageUrl, discount, category, link})
        const saved = await newCard.save();
        res.status(201).json({success: true, data: saved})
    } catch (error) {
        console.log('message', error)
        res.status(500).json({message: error.message})
    }
}

//http://localhost:5174/api/homecards
export const getHomeCard = async (req, res) => {
    try {
    const cards = await HomeCard.find()
    res.status(200).json({success: true, data: cards})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateHomeCard = async (req, res) => {
    try {
        const updatedCard = await HomeCard.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedCard)
    } catch (error) {
       res.status(500).json({message: error.message}) 
    }
}


export const deleteHomeCard = async(req, res) => {
    try {
   const deleteCard = await HomeCard.findByIdAndDelete(req.params.id)
   res.status(200).json({message:'Card deleted', deleteCard})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}