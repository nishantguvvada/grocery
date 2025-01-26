import { CartDispatchContext } from "grocery/utils/cart-context"
import { useState, useContext } from "react";

export const Cart = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const { dispatch } = useContext(CartDispatchContext);

    const handleAddToCart = async () => {
        try {
            await dispatch({
                type: "add",
                id: product._id,
                product_name: product.product_name,
                product_price: product.product_price,
                quantity: quantity
            });
        } catch(err) {
            console.log("Error: ", err)
        }
    }
    return (
        <div className="w-48 flex justify-center items-center gap-4">
            <button onClick={handleAddToCart} type="button" className="inline-flex shrink-0 items-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300">
                <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                </svg>
                Add to cart
            </button>
            <select onChange={(e) => { return setQuantity(parseInt(e.target.value))}} className="w-24 h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    {Array.from(Array(product.quantity), (e, i) => {
                        return (
                            <option key={i+1} value={i+1}>{i+1}</option>
                        )
                    })}
            </select>
        </div>
    )
}