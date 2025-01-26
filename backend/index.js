import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { Products } from "./database/db.js";
import cors from "cors";

configDotenv();

mongoose.connect(process.env.MONGODB_URL);

const app = express();

app.use(express.json());
app.use(cors());

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

app.listen(3001);