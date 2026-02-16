import Order from "../Modal/OrderModal.js";

export const getUserOrders = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(40).json({ message: "Email is required" });
    }
    const orders = await Order.find({ userEmail: email }).sort({
      createdAt: -1,
    });
    res.status(200).json({ message: "User Order get", orders });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ message: "All Orders we found", orders });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// for order tracking

export const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingId, carrier, estimatedDate } = req.body;
    const updateFields = { status };
    if (status === "Dispatch") {
      if (trackingId) updateFields.trackingId = trackingId;
      updateFields.tracking = {
        carrier: carrier || "CourierX",
        estimatedDate: estimatedDate || "",
        currentStatus: "Dispatch",
      };
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Order updated", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
