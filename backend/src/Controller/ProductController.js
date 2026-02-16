import productModal from "../Modal/productModal.js";
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const createProduct = async(req, res) => {
    try {
        const images = req.files ? req.files.map((file) => ({
            url:`/uploads/${file.filename}`,
        }))
        : [];
        console.log("Body received:", req.body)
        console.log("File received:", req.files)
        console.log("req.file:", images)
        const data = new productModal({
            ...req.body,
            image: images,
        });
        await data.save();
        res.json({
            success: true,
            message: "Data saved successfully",
            data: data,
        });
    }catch(error) {
        res.status(500).json({success: false, message: "Server error"})
    }
}

export const getProduct = async(req, res) => {
    try {
        const data = await productModal.find({})
        console.log("Fetched data from DB:", data);
        res.json({success: true, data: data})
    }
    catch(error) {
        res.status(500).json({message:"Unable to get product data"})
    }
}

export const updateProduct = async(req,res) => {
    try {
        console.log("Request body", req.body);
        console.log("Update files:", req.files);

        const {_id, ...rest} = req.body;
        const existingProduct = await productModal.findById(_id);
        console.log("Existing product found", existingProduct)
        if(!existingProduct) {
            return res.status(404).json({success: false, message:"Product not found"})
        }
        let updatedImages = existingProduct.image || [];
        console.log("Current images on product:", updatedImages);

        // if new images are uploaded append them to the existing images
        if(req.files && req.files.length > 0) {
            const newImages = req.files.map((file) => ({
                url:`/uploads/${file.filename}`,
            }));
            updatedImages = [...updatedImages, ...newImages];
            console.log("Updated images array:", updatedImages)
        }
        // assign the updated images array to the image field
        rest.image = updatedImages;
        const updatedProduct = await productModal.findByIdAndUpdate(_id, rest, {
            new: true,
        });
        console.log("Updated product:", updatedProduct);
        res.json({
            success: true,
            message: "Data updated successfully",
            data: updatedProduct,
        })
    }catch(error) {
        res.status(500).json({success: false, message:"An error occured"})
    }
}

export const deleteProduct = async(req, res) => {
    try {
        const id = req.params.id;
        console.log("id to delete product", id);

        const data = await productModal.findById(id);
        if(!data) {
            return res.status(404).json({success: false, message: "Record not found"})
        }
        // delete image from file system
        if(data.image && Array.isArray(data.image)) {
            data.image.forEach((imagePath) => {
                if(imagePath && imagePath.url) {
                    const oldImagePath = path.join(__dirname, imagePath.url);
                    if(fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
            })
        } else {
            console.error("Image array is missing or invalid")
        }
        await productModal.deleteOne({_id: id});
        res.send({success: true, message:"Data Deleted Success", data: data})
    }catch(error) {
        res.status(500).json({success: false, message: "Server error"})
    }
}

export const deleteProductImage = async (req, res) => {
    try {
        const {productId, imageId} = req.params
        const product = await productModal.findById(productId)
        if(!product)  {
            return res.status(404).json({message: "Product not found"})
        }
        // find the image using its ID
        const imageToDelete = product.image.find((img) => img._id.toString() === imageId)
        if(!imageToDelete) {
            return res.status(404).json({message:"Image not found in product"})
        }
        // construct the full path to the image
        const imagePath = path.join(__dirname, imageToDelete.url);
        // delete file from storage
        if(fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath)
        }else {
            return res.status(404).json({message:"file not found on server"})
        }
        // remove image from database
        product.image = product.image.filter((img) => img._id.toString() !== imageId);
        await product.save();
        res.json({message:"Image deleted Successfully"})
    }catch(error) {
        res.status(500).json({error:Error.message})
    }
}