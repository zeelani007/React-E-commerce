import mongoose from "mongoose"
import BASE_URL from "../../../frontend/src/Config/config"
const YOUR_SERVER_URL = `${BASE_URL}`;
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET);

export const paymentGatewayController = async(req, res) => {
    try {
    const {products, formData} = req.body;
    console.log("Received products", products)

    if(!products || products.length === 0) {
        return res.status(400).json({message: "No product provided", error: true, success: false})
    }
    const lineItems = products.map((product) => {
        const imageUrl = product.image?.[0]?.url?.startsWith("http") ? product.image[0].url : `${YOUR_SERVER_URL}${product.image?.[0]?.url}`;
        console.log("imageUrl", imageUrl)

        console.log("Processing product", product)
        return {
            price_data: {
                currency: "inr",
                unit_amount: product.new_price * 100, //stripe expects price in cents
               product_data: {
                name: product.title,
                images: [imageUrl]
               }
            },
            quantity: product.quantity,
        }
    });
    lineItems.push({
        price_data: {
            currency: "inr",
            unit_amount: 1800, //18 USD => 1800 cents (for INR, 1800 paise =  ₹18)
            product_data: {
                name: "shipping Charge"
            }
        },
        quantity: 1
    });
    const session = await Stripe.checkout.sessions.create({
        payment_method_type: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url:"http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
        customer_email: req.body.userEmail,
        metadata: {
            cartItems:JSON.stringify(
                products.map(p => ({
                    title:p.title,
                    quantity:p.quantity,
                    new_price:p.new_price,
                    category: p.category,
                    image: p.image?.[0]?.url || "",
                }))),
            formData: JSON.stringify(formData)
        }
    });
    console.log("Stripe session created:", session.id)
    res.status(200).json({id: session.id})
    }catch(error) {
     res.status(500).json({error: true,
        success: false
     })
    }
}
