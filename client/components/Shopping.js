"use client"
import { useContext, useEffect, useState } from "react"
import { Products } from "./Products"
import { ProductContext } from "grocery/utils/product-context"
import { CartStateContext } from "grocery/utils/cart-context"
import { Checkout } from "./Checkout"
import Script from "next/script"

export const Shopping = () => {
    const [isCheckout, setIsCheckout] = useState(false);
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

    const checkOut = async () => {
        setIsCheckout(true);
    }

    
    return (
        <>
        <Script
            id="razorpay-checkout-js"
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="beforeInteractive"
        />
            {isCheckout ? 
                <div className="fixed w-2/4 inset-x-0 mx-auto top-[20%] bg-gray-50 border-2 rounded-xl shadow max-h-[60%] overflow-y-scroll">
                    <button className="m-4" onClick={() => { setIsCheckout(false) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" style={{width: '20px', height: 'auto'}} viewBox="0 0 30 30">
                            <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                        </svg>
                    </button>
                    <Checkout/>
                </div> : ""}
            <div className="w-full md:basis-3/5 h-full bg-gray-400 p-2 md:p-8 border-2 shadow-xl rounded-xl flex flex-col justify-center items-center">
                {totalCartItems === 0 ? "" : <button onClick={checkOut}><span className="flex items-center bg-white p-2 rounded-lg after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                    <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                Checkout
                </span></button>}
                <h1 className="mb-4 mt-2 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">{totalCartItems === 0 ? "No items in cart" : `${totalCartItems} items in cart`}</h1>
                <div className="md:p-8 h-full w-full flex flex-wrap md:flex-row flex-col justify-between items-center gap-8">
                    {products ? products.map((product, key) => {
                        return <Products product={product} key={key}/>
                    }) : <div>Loading...</div>}
                </div>
            </div>
        </>
    )
}