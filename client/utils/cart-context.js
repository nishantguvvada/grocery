"use client"
import { createContext, useReducer } from "react";

export const CartStateContext = createContext();
export const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case 'add': {
            return [...state, {
                id: action.id,
                product_name: action.product_name,
                product_price: action.product_price,
                quantity: action.quantity
            }]
        }
    }
}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, [])

    return (
    <CartDispatchContext.Provider value={{dispatch: dispatch}}>
        <CartStateContext.Provider value={{state: state}}>
            { children }
        </CartStateContext.Provider>
    </CartDispatchContext.Provider> 
    )
}