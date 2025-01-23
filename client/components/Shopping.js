"use client"
import { useContext } from "react"
import { Products } from "./Products"
import { ProductContext } from "grocery/utils/context"

export const Shopping = () => {
    const { products } = useContext(ProductContext);

    console.log(products);

    return (
        <>
            <div className="h-screen w-full p-8 border-2 shadow-xl rounded-xl flex md:flex-row flex-col justify-center items-center gap-8">
                {products ? products.map((product, key) => {
                    return <Products product={product} key={key}/>
                }) : <div>Loading...</div>}
            </div>
        </>
    )
}