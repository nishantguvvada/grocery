"use client"
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState();
    

    useEffect(() => {
        const productList = async () => {
            const list = await axios.get("http://localhost:3001/products");
            setProducts(list.data.products);
        }
        productList();
    }, []);

    return (
        <ProductContext.Provider value={{ products: products }}>
            {children}
        </ProductContext.Provider>
    )
}