import express from "express"
const offerrouter = express.Router();
import multer from "multer"
import path from 'path'
import { fileURLToPath } from "url";
const  __filename = fileURLToPath(import.meta.url)
const  __dirname = path.dirname(__filename)

import {addHomeBannerOffer, getHomeBannerOffer} from "../Controller/HomeCarousalBannerOfferController.js"

// set up multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../setting"))
    },
    filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname)
    }
});

const upload = multer({storage})

offerrouter.post("/post", upload.single("image"), addHomeBannerOffer);
offerrouter.get("/get", getHomeBannerOffer)

export default offerrouter;