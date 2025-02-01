import express from "express";
import mongoose from "mongoose";
import Razorpay from "razorpay";
import crypto from "crypto";
import { configDotenv } from "dotenv";
import { Products } from "./database/db.js";
import cors from "cors";

configDotenv();

mongoose.connect(process.env.MONGODB_URL);

const app = express();

app.use(express.json());
app.use(cors());

const razorpayInstance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
});

app.get("/", (req, res) => {
    try {
        res.json({message: "Working", url: process.env.MONGODB_URL});
    } catch(err) {
        res.json({error: err});
    }
});

app.post("/create-product", async (req, res) => {
    try {
        const metadata = {
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            quantity: req.body.quantity,
            stars: req.body.stars,
            reviews: req.body.reviews,
            feature: req.body.feature,
            url: req.body.url
        }

        const product = await Products.create(metadata);

        res.status(200).json({message: "Product added!", product_id: product._id});
    } catch(err) {
        res.status(400).json({error: err});
    }
});

app.get("/products", async (req, res) => {
    try {
        const response = await Products.find({});
        res.status(200).json({products: response});
    } catch(err) {}
});

app.post("/orders", async (req, res) => {
    try {
        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log("Error: ", error);
                return res.status(500).json({error: "Error creating orders using Razorpay instance."});
            }
            return res.status(200).json({data: order});
        });
    } catch(err) {
        console.log("Error: ", err);
        res.status(400).json({error: "Error in Orders API"});
    }
});

app.post("/verify", async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const generated_signature = crypto.createHmac("sha256", process.env.KEY_SECRET).update(sign.toString()).digest("hex");

        if (generated_signature == razorpay_signature) {
            return res.status(200).json({message: "Payment verified successfully"});
        } else {
            return res.status(400).json({message: "Invalid signature sent!"});
        }
    } catch(err) {
        console.log("Error: ", err);
        res.status(400).json({error: "Error in Verify API"});
    }
});

app.listen(3001);