import { createContext, useReducer } from "react";
import { cartReducer, cartInitialState } from "../reducers/cartReducer";

export const CartContext = createContext();

function useCartReducer() {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);

    const addToCart = (product, quantity) => dispatch({
        type: "ADD_TO_CART",
        payload: { ...product, quantity }
    });

    const removeFromCart = product => dispatch({
        type: "REMOVE_FROM_CART",
        payload: product
    });

    const clearCart = () => dispatch({ type: "CLEAR_CART" });

    const decreaseFromCart = product => dispatch({
        type: "DECREASE_FROM_CART",
        payload: product
    });

    return { state, addToCart, removeFromCart, clearCart, decreaseFromCart };
}

export function CartProvider({ children }) {
    const { state, addToCart, removeFromCart, clearCart, decreaseFromCart } = useCartReducer();

    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeFromCart,
            clearCart,
            decreaseFromCart
        }}>
            {children}
        </CartContext.Provider>
    );
}