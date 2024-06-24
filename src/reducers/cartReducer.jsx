
export const cartInitialState = JSON.parse(localStorage.getItem("cart")) || [];

export const CART_ACTION_TYPES = {
    ADD_TO_CART: "ADD_TO_CART",
    REMOVE_FROM_CART: "REMOVE_FROM_CART",
    CLEAR_CART: "CLEAR_CART",
    DECREASE_FROM_CART: "DECREASE_FROM_CART" // Nuevo tipo de acción
}

export const updateLocalStorage = state => {
    window.localStorage.setItem("cart", JSON.stringify(state));
}

export const cartReducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action;

    switch (actionType) {
        case CART_ACTION_TYPES.ADD_TO_CART: {
            const { id, quantity } = actionPayload;
            const productInCartIndex = state.findIndex(item => item.id === id);

            if (productInCartIndex >= 0) {
                const newState = structuredClone(state);
                newState[productInCartIndex].quantity += quantity;
                updateLocalStorage(newState);
                return newState;
            }

            const newState = [
                ...state,
                {
                    ...actionPayload,
                    quantity: quantity
                }
            ];

            updateLocalStorage(newState);
            return newState;
        }
        case CART_ACTION_TYPES.REMOVE_FROM_CART: {
            const { id } = actionPayload;
            const newState = state.filter(item => item.id !== id);
            updateLocalStorage(newState);
            return newState;
        }
        case CART_ACTION_TYPES.CLEAR_CART: {
            updateLocalStorage([]);
            return [];
        }
        case CART_ACTION_TYPES.DECREASE_FROM_CART: {
            const { id } = actionPayload;
            const productInCartIndex = state.findIndex(item => item.id === id);

            if (productInCartIndex >= 0) {
                const newState = structuredClone(state);
                if (newState[productInCartIndex].quantity > 1) {
                    newState[productInCartIndex].quantity -= 1;
                } else {
                    newState.splice(productInCartIndex, 1);
                }
                updateLocalStorage(newState);
                return newState;
            }

            return state;
        }
        default:
            return state;
    }
};