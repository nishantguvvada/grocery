"use client"
import { CartStateContext } from "grocery/utils/cart-context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export const Checkout = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const { state } = useContext(CartStateContext);
    const router = useRouter();

    const initPayment = (data) => {
        const options = {
            "key": `${process.env.NEXT_PUBLIC_RAZ_KEY_ID}`, // Enter the Key ID generated from the Dashboard
            "amount": data.amount,
            "name": "Grocery",
            "currency": "INR",
            "description": "Test Transaction",
            "image": "https://i.postimg.cc/d3zFppMx/ngx.png",
            "prefill":
            {
                "email": "nishant.guvvada@gmail.com",
                "contact": +919900000000,
            },
            "order_id": data.id,
            "redirect": true,
            config: {
                display: {
                    blocks: {
                        banks: {
                            name: "All Payment Options",
                            instruments: [
                                {
                                    method: 'upi'
                                },
                                {
                                    method: 'card'
                                },
                                {
                                    method: 'wallet'
                                },
                                {
                                    method: 'netbanking'
                                }
                            ]
                        },
                        other: { //  name for other block
                            name: "Other Payment Methods",
                            instruments: [
                            {
                                method: "card",
                                issuers: ["ICIC"]
                            },
                            {
                                method: 'netbanking',
                            }
                            ]
                        }
                    },
                    sequence: ["block.utib", "block.other"],
                    preferences: {
                        show_default_blocks: true // Should Checkout show its default blocks?
                    }
                }
            },
            "handler": async (response) => {
                try {
                    const { data } = await axios.post("http://localhost:3001/verify", response);
                    router.push("http://localhost:3000/success");
                    console.log("Payment Success: ", data);
                } catch(err) {
                    console.log(err);
                }
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function (response) {
            alert(response.error.description);
        });
        paymentObject.open();
    }

    const completeCheckout = async () => {
        try {
            const { data } = await axios.post("http://localhost:3001/orders", { amount: totalPrice });
            initPayment(data.data);
        } catch(err) {
            console.log(err);
            alert("Error handling orders.")
        }
    }

    useEffect(() => {
        const calculateTotalPrice = () => {
            const store = state.map((item) => {
                return item.product_price
            });

            return store.reduce((a, b) => a + b, 0)
        }
        const result = calculateTotalPrice();
        setTotalPrice(result);
    }, [[state]]);

    return (
        <>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <div className="p-12 w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md">
                    <div className="p-4 flex flex-col justify-center items-center md:space-y-6 sm:p-6">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Checkout Total: {totalPrice}
                        </h1>
                        <button onClick={completeCheckout} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Pay Now!</button>
                        <h2 className="text-md leading-tight tracking-tight text-gray-900 md:text-xl">
                            Your Cart Items
                        </h2>
                    </div>
                    <div className="p-4 space-y-2 md:space-y-6 sm:p-6">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Product name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.map((item, key) => {
                                        return <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {item.product_name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.product_price}
                                            </td>
                                        </tr>
                                    })}
                                    <tr className="bg-white border-b border-gray-200 text-lg">
                                        <th scope="row" className="px-6 py-4 font-bold text-black whitespace-nowrap">
                                            Total
                                        </th>
                                        <td className="px-6 py-4 font-bold text-black">
                                            {totalPrice}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}