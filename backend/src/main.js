import express from "express";
import cors from "cors";
import connectDB from "./DatabaseConnection/db.js";
import userRouter from "./Route/UserRoute.js";
import forgotrouter from "./Route/ForgotPasswordRoute.js";
import resetrouter from "./Route/ResetPasswordRoute.js";
import emailRoute from "./Route/sendVerificationRoute.js";
import otpRouter from "./Route/VerifyOTPRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import productRouter from "./Route/ProductRoute.js";
import categoriesrouter from "./Route/CategoriesRoute.js";
import targetrouter from "./Route/TargetRoute.js";
import transactionrouter from "./Route/TransactionRoute.js";
import orderrouter from "./Route/OrderRoute.js";
import homecardrouter from "./Route/ShopCategoryRoute.js";
import offerrouter from "./Route/HomeCarousalBannerOfferRoute.js";
import addressRouter from "./Route/AddressRoute.js";
// import webhookRoutes from "./Route/WebhookRoute.js"
import checkoutformrouter from "./Route/CheckoutFormDataRoute.js";
import cartrouter from "./Route/CartRoute.js";
import wishlistrouter from "./Route/WishlistRoute.js";
import  supporthelpRoutes from "./Route/SupportHelp.js";
import checkoutrouter from "./Route/CheckOutRoute.js";



const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


connectDB();
//add this middleware to parsejson request bodies
app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);


app.use("/uploads", express.static(path.resolve("uploads")))



app.get("/", (req, res) => res.send("API is running"));
const PORT = process.env.PORT || 5174;
//user api
app.use("/api/users", userRouter);

//forgot & reset password api
app.use("/api/users", forgotrouter)
app.use("/api/users", otpRouter)
app.use("/api/users", resetrouter)

//send verification api
app.use("/send-verification", emailRoute)


// middleware for uploading profileImage
app.use("/profileImage", express.static(path.resolve("profileImage")));

// product api
app.use("/api/products", productRouter)

// api for categories
app.use("/api/categories", categoriesrouter)

// api for target
app.use("/api/target", targetrouter)

// order route
app.use("/api", orderrouter)

// transaction route
app.use("/api/transactions", transactionrouter)



// home shopcateg card offer api
app.use("/api/homecards", homecardrouter);

// homecarousal offer api
app.use("/api/offers", offerrouter)
app.use("/setting", express.static(path.resolve("setting")));

//address route
app.use("/api", addressRouter);

// checkout route
app.use("/api/checkoutform", checkoutformrouter);

// cart api
app.use("/api/cart", cartrouter);

// wishlist api
app.use("/api/wishlist", wishlistrouter);

// transaction api
app.use('/api/transactions', transactionrouter);

// checkoutroute 
app.use("/", checkoutrouter)

//suport and help
app.use("/api", supporthelpRoutes);

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));




