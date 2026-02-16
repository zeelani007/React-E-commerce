import express from "express";
const orderrouter = express.Router();
import sendOrderConfirmation from "../../sendOrderconfirmmail/SendEmail.js";
import Transaction from "../Modal/TransactionModal.js"

import {
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../Controller/OrderController.js";

import Order from "../Modal/OrderModal.js";

// all orders for admin
orderrouter.get("/all-orders", getAllOrders);

// get all orders for a user by user email
orderrouter.get("/orders", getUserOrders);

//update order status by admin
orderrouter.put("/update-order/:id", updateOrderStatus);

// get a single order by id for delivery progress
orderrouter.get("/order-details/:trackingId", async (req, res) => {
  try {
    const order = await Order.findOne({ trackingId: req.params.trackingId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (!order.tracking) {
      order.tracking = { carrier: "", estimatedDate: "", currentStatus: "" };
    }
    res.status(200).json({order});
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }
});

//
orderrouter.post("/place-order", async (req, res) => {
  try {
    const {
      userEmail,
      name,
      address,
      phone,
      cartItems,
      amount_Total,
      paymentMethod,
    } = req.body;

    console.log('reqbody i.e, order modal98', req.body)

    // Check all fields
    if (
      !userEmail ||
      !name ||
      !address ||
      !phone ||
      !cartItems?.length ||
      !amount_Total ||
      !paymentMethod
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields in request" });
    }
    // Save to database
    const order = await Order.create({
      userEmail,
      name,
      address,
      phone,
      cartItems,
      amount_Total,
      paymentMethod,
      status: "Pending",
    });
    console.log("Received order body:", req.body);

    // create transaction record (for my account.jsx)
    await Transaction.create({
      users: req.user?._id || order._id, // use user._id if available
      item:`Order from ${name}`,
      amount: amount_Total,
      time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}),
      products: cartItems.map((item) => ({
        title: item.title,
        new_price: item.new_price,
        quantity: item.quantity,
        stock: item.stock,
        category: item.category,
        subcategory: item.subcategory,
        dateAdded: new Date()
      }))
    })

    await sendOrderConfirmation(userEmail);

    res.status(201).json({ success: true, message: "Order placed" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
});

export default orderrouter;
