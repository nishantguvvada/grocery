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
        <div className="w-full md:basis-3/5 h-full bg-gray-400 p-8 border-2 shadow-xl rounded-xl flex flex-col justify-center items-center">
            {totalCartItems === 0 ? "" : <span className="flex items-center bg-white p-2 rounded-lg after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                <svg class="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
          Checkout
        </span>}
            <h1 className="mb-4 mt-2 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">{totalCartItems === 0 ? "No items in cart" : `${totalCartItems} items in cart`}</h1>
            <div className="p-8 h-full w-full flex flex-wrap md:flex-row flex-col justify-between items-center gap-8">
                {products ? products.map((product, key) => {
                    return <Products product={product} key={key}/>
                }) : <div>Loading...</div>}
            </div>
        </div>
        </>
    )
}