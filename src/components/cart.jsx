import { useId, useState } from "react"
import { useCart } from "../hooks/useCart"

function CartIcon() {
    const { cart } = useCart();
  
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0).toFixed(2);
  
    return (
        <div className="flex items-center justify-center">
        <div className="inline-block relative flex items-center">
          <svg
            className="w-8 h-8 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.341 1.634a1 1 0 00.991.816h12.254a1 1 0 00.99-.816L21 3M5 13h14l1 6H4l1-6zm9 0V9a3 3 0 00-6 0v4"
            />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {totalItems}
            </span>
          )}
        </div>
        <span className="ml-2 text-lg font-semibold">C${totalPrice}</span>
      </div>
    );
}

function CartItem({ titulo, precio, imagen, quantity, addToCart, removeFromCart }) {
    return (
      <li className="flex items-center p-2 border-b border-gray-200">
        <button className="px-2 text-red-500 text-2xl bg-slate-50 justify-center  rounded-2xl" onClick={removeFromCart}>-</button>
        <img className="w-16 h-16 object-cover mx-2" src={imagen} alt={titulo} />
        <div className="flex-1">
          <div className="flex justify-between">
            <strong className="text-gray-700">{titulo}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">C${precio.toFixed(2)}</span>
            <button className="px-1 text-green-500 text-2xl bg-slate-50 rounded-2xl" onClick={addToCart}>+</button>
          </div>
          <footer className="flex justify-between items-center mt-2">
            <small className="text-gray-500">Cant: {quantity}</small>
          </footer>
        </div>
      </li>
    );
  }

  export function Cart() {
    const { cart, addToCart, removeFromCart, clearCart } = useCart();
    const cartCheckId = useId();
    const [checked, setChecked] = useState(false);
  
    const handleCheck = (e) => {
      setChecked(e.target.checked);
    };
  
    const total = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0).toFixed(2);
  
    return (
      <>
        <label className="text-center cursor-pointer" htmlFor={cartCheckId}>
          <CartIcon />
        </label>
        <input id={cartCheckId} type="checkbox" hidden onChange={handleCheck} />
  
        <aside
          className={`${checked ? 'block' : 'hidden'} fixed bottom-1 right-0 w-80 h-[99vh] bg-white border border-gray-300 rounded-lg shadow-xl flex flex-col`}
        >
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Carrito</h2>
            <label className="cursor-pointer" htmlFor={cartCheckId}>
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </label>
          </div>
          <ul className="p-4 overflow-y-auto flex-grow">
            {cart.map((product) => (
              <CartItem
                key={product.id}
                removeFromCart={() => removeFromCart(product)}
                addToCart={() => addToCart(product)}
                {...product}
              />
            ))}
          </ul>
          <div className="p-4 border-t border-gray-200">
            <button
              className="w-full bg-red-500 text-white py-2 rounded mb-4"
              onClick={clearCart}
            >
              Limpiar Carrito
            </button>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-semibold">C$ {total}</span>
            </div>
          </div>
        </aside>
      </>
    );
  }