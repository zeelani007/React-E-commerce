import Offer from "../Modal/HomeCarousalBannerOfferModal.js";
import multer from "multer";
import path from "path";

export const addHomeBannerOffer = async (req, res) => {
  try {
    const fileImage = req.file;
    const urlImage = req.body.image;
    const {category,link} = req.body

    if (!fileImage && !urlImage) {
      return res.status(400).json({ message: "Image is required!" });
    }
    const newOffer = new Offer({category, link,
      image: fileImage ? `setting/${fileImage.filename}` : urlImage
    });

    await newOffer.save();
    res.status(201).json({ success: true, offer: newOffer });
  } catch (error) {
    console.error("Offer save error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHomeBannerOffer = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json({success: true, data: offers});
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch offers", error });
  }
};
