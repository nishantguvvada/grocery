"use client"
import { useState } from "react"
import axios from "axios";

export const AddProduct = () => {
    const [item, setItem] = useState({
        product_name: "Sample Product",
        product_price: 0,
        quantity: 0,
        stars: 0,
        reviews: 0,
        feature: "Sample Feature",
        url: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-light.svg"
    });

    const saveProduct = async () => {
        if (item.product_name == null || item.product_name == "Sample Product") {
            console.log("Error: No name input!");
            return
        } 
        try {
            const response = await axios.post("http://localhost:3001/create-product", {
                product_name: item.product_name,
                product_price: item.product_price,
                quantity: item.quantity,
                stars: item.stars,
                reviews: item.reviews,
                feature: item.feature,
                url: item.url
            });
            console.log("Response from POST: ", response);

        } catch(err) {
            console.log("Error: ", err);
        }
        
    }
    return (
        <>
            <form className="basis-1/3 h-full border-2 shadow-xl p-8 rounded-xl mx-auto">
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Item Name</label>
                    <input onChange={(e) => { setItem(currValue => ({...currValue, product_name: e.target.value})) }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Samsung S24 Ultra" required />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Image URL</label>
                    <input onChange={(e) => { setItem(currValue => ({...currValue, url: e.target.value})) }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Samsung S24 Ultra" required />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Item Price</label>
                    <input onChange={(e) => { setItem(currValue => ({...currValue, product_price: e.target.value})) }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="$100" required />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Item Quantity</label>
                    <input onChange={(e) => { setItem(currValue => ({...currValue, quantity: e.target.value})) }} type="number" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="100" required />
                </div>
                <div className="flex flex-row gap-4">
                    <div className="mb-5 grow">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Stars</label>
                        <input onChange={(e) => { setItem(currValue => ({...currValue, stars: e.target.value})) }} type="number" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="5" required />
                    </div>
                    <div className="mb-5 grow">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Reviews</label>
                        <input onChange={(e) => { setItem(currValue => ({...currValue, reviews: e.target.value})) }} type="number" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="(557)" required />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-start mb-5">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
                        <label  className="ms-2 text-sm font-medium text-gray-900">Fast Delivery</label>
                    </div>
                    
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
                        <label  className="ms-2 text-sm font-medium text-gray-900">Best Price</label>
                    </div>

                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
                        <label  className="ms-2 text-sm font-medium text-gray-900">Best Seller</label>
                    </div>
                    
                </div>
                <button onClick={saveProduct} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </>
    )
}