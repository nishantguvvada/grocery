"use client"
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState();
    

    useEffect(() => {
        const productList = async () => {
            try {
                const list = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
                toast.success('Items fetched successfully!')
                setProducts(list.data.products);
            }
            catch(err) {
                console.log("Error in product-context", err);
                toast.error("Fetch failed.")
            }
        }
        productList();
    }, []);

    return (
        <ProductContext.Provider value={{ products: products }}>
            {children}
        </ProductContext.Provider>
    )
}