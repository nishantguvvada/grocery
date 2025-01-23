import mongoose from "mongoose";

export const Products = mongoose.model("Products", {
    product_name: String,
    product_price: Number,
    quantity: Number,
    stars: Number,
    reviews: Number,
    feature: String
});