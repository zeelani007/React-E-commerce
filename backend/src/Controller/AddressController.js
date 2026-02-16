import  mongoose from "mongoose"
import addressModal from "../Modal/AddressModal.js";
import Usermodal from "../Modal/UserModal.js";

export const addAddressItemController = async (req, res) => {
  try {
    const { userId, name, tag, street, city, state, phone, zip } = req.body;
    //format phone number to +91
    const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone}`;
    const newAddress = new addressModal({
      userId: new mongoose.Types.ObjectId(userId), //this will save my userId as in object form not in string form
      name,
      tag,
      street,
      city,
      state,
      phone: formattedPhone,
      zip,
    });

    const savedAddress = await newAddress.save();
    res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: savedAddress,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error adding address", error });
  }
};

export const getAddressItemController = async (req, res) => {
  try {
    const { userId } = req.params;
    const addresses = await addressModal.find({ userId });
    res.status(200).json({
      success: true,
      message: "Address fetched successfully",
      data: addresses,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching addresses", error });
  }
};

export const updateAddressItemController = async (req, res) => {
  try {
    const { addressId } = req.params;
    const updatedData = req.body;

    const updatedAddress = await addressModal.findByIdAndUpdate(
      addressId,
      updatedData,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updatedAddress,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating address", error });
  }
};

export const deleteAddressItemController = async (req, res) => {
  try {
    const { addressId } = req.params;
    await addressModal.findByIdAndDelete(addressId);
    res.status(200).json({
      success: true,
      message: "Address deleted Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting address", error });
  }
};


