"use client"
import { useContext, useEffect, useState } from "react"
import { Products } from "./Products"
import { ProductContext } from "grocery/utils/product-context"
import { CartStateContext } from "grocery/utils/cart-context"

export const Shopping = () => {
    const { products } = useContext(ProductContext);
    const { state } = useContext(CartStateContext);
    const [totalCartItems, setTotalCartItems] = useState(0);

    useEffect(() => {
        const totalItems = () => {
            const store = state.map((item) => {
                return item.quantity
            })
            return store.reduce((a, b) => a + b, 0)
        }
        const result = totalItems();
        setTotalCartItems(result);
    }, [state]);

    
    return (
        <>
        <div className="h-full basis-2/3 bg-gray-400 p-8 border-2 shadow-xl rounded-xl flex flex-col justify-center items-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">{totalCartItems === 0 ? "No items in cart" : `${totalCartItems} items in cart`}</h1>
            <div className="p-8 h-full w-full flex flex-wrap md:flex-row flex-col justify-start items-center gap-8">
                {products ? products.map((product, key) => {
                    return <Products product={product} key={key}/>
                }) : <div>Loading...</div>}
            </div>
        </div>
        </>
    )
}