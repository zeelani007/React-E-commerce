import Order from "../Modal/OrderModal.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);
import Transaction from "../Modal/TransactionModal.js";
import User from "../Modal/UserModal.js";

export const saveOrderToDatabase = async (orderData) => {
  console.log("Saving order", orderData);
  try {
    const newOrder = new Order(orderData);
    await newOrder.save();
    console.log("Order saved successfully", newOrder);
    //    return res.status(201).json({message:"Order save Successfully", newOrder})
    //    find user from email
    const user = await User.findOne({ email: orderData.userEmail });
    // save transaction
    const transaction = new Transaction({
      users: user?._id,
      item: `Order Payment - ${orderData.cartItems.length} items`,
      amount: orderData.amount_Total,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      products: orderData.cartItems.map((item) => ({
        title: item.title,
        new_price: item.new_price,
        quantity: item.quantity,
        category: item.category ? item.category : "unknown",
        stock: item.stock,
        dateAdded: item.date,
      })),
    });
    await transaction.save();
    console.log("Transaction saved successfully", transaction);
  } catch (error) {
    console.error("Error saving order", error);
    return res.status(500).json({ message: "Server error" });
  }
};
console.log("Stripe webhook received");

export const handleStripeWebhook = async (req, res) => {
  let event;
  try {
    const sig = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("Full Event Received:", JSON.stringify(event, null, 2));
    console.log("Stripe Event Received", event);
  } catch (error) {
    console.error("webhook Error", error.message);
    return res.status(400).send(`Webhook ErrorL ${error.message}`);
  }
  console.log("Event Type", event.type);
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const formData = session.metadata.formData
      ? JSON.parse(session.metadata.formData)
      : {};

    console.log("Session data", session);
    console.log("Session metadata", session.metadata);

    console.log("Raw cartItems from metadata", session.metadata.cartItems);

    const orderData = {
      userEmail: session.customer_details?.email || null,
      cartItems: session.metadata.cartItems
        ? JSON.parse(session.metadata.cartItems)
        : [],
      amount_Total: session.amount_total / 100 || session.amount_subtotal || 0, //fallback if amount_Total is missing
      createdAt: new Date(),
      status: "Pending",
      ...formData,
    };
    console.log("session.metadata.cartItems", session.metadata?.cartItems);
    await saveOrderToDatabase(orderData);
  }
  res.status(200).send("Received");
};
export default handleStripeWebhook;
