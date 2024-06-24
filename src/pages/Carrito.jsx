import { useEffect, useState } from 'react';
import { useCart } from "../hooks/useCart";
import { SmallTrashIcon } from "../components/icons";

function CartItem({ id, titulo, precio, imagen, quantity, addToCart, removeFromCart, decreaseFromCart }) {
  const formattedPrice = new Intl.NumberFormat('es-NI', { style: 'currency', currency: 'NIO' }).format(precio);
  const formattedTotal = new Intl.NumberFormat('es-NI', { style: 'currency', currency: 'NIO' }).format(precio * quantity);

  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <img className="w-32 h-32 object-cover" src={imagen} alt={titulo} />
      <div className="flex-1 ml-4">
        <h2 className="text-xl font-bold">{titulo}</h2>
        <p className="text-gray-500">SKU: {Math.random().toString(36).substr(2, 9)}</p>
        <div className="flex items-center mt-2">
          <span className="text-lg">Cant.: </span>
          <div className="flex ml-2 items-center border border-gray-300 rounded">
            <button
              className="px-2 py-1 text-gray-600"
              onClick={() => decreaseFromCart({ id })}
            >
              -
            </button>
            <span className="px-2">{quantity}</span>
            <button
              className="px-2 py-1 text-gray-600"
              onClick={() => addToCart({ id, titulo, precio, imagen }, 1)}
            >
              +
            </button>
          </div>
        </div>
        <p className="mt-2">Precio unitario: {formattedPrice}</p>
        <p className="mt-2 font-semibold">Total: {formattedTotal}</p>
        <button
          className="mt-2 flex items-center text-red-500  gap-1"
          onClick={() => removeFromCart({ id })}
        >
          <SmallTrashIcon /> Quitar del carrito
        </button>
      </div>
    </div>
  );
}

export function Carrito() {
  const { cart, addToCart, clearCart, decreaseFromCart, removeFromCart } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const newSubtotal = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
   
    const newTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    setSubtotal(newSubtotal);

    setTotalItems(newTotalItems);
  }, [cart]);

  const formattedSubtotal = new Intl.NumberFormat('es-NI', { style: 'currency', currency: 'NIO' }).format(subtotal);
  
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Mi carrito de compras</h1>
      <div className="flex items-center mb-4">
        <label className="mr-4 text-lg"><span className="text-red-800 text-lg">*</span> Selecciona cómo quiere obtener su pedido:</label>
        <div className="flex items-center">
          <input type="radio" id="delivery" name="pickupOption" value="delivery" className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500" />
          <label htmlFor="delivery" className="ml-2">Envío a domicilio</label>
        </div>
        <div className="flex items-center ml-4">
          <input type="radio" id="store" name="pickupOption" value="store" defaultChecked className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500" />
          <label htmlFor="store" className="ml-2">Recoger en tienda</label>
        </div>
      </div>
      <div className="flex">
        <div className="flex-grow">
          {cart.map((product) => (
            <CartItem
              key={product.id}
              {...product}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              decreaseFromCart={decreaseFromCart}
            />
          ))}
        </div>
        <div className="w-1/4 p-4 border-l border-gray-200">
          <h2 className="text-xl font-bold mb-4">Total del pedido</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal ({totalItems} productos):</span>
            <span>{formattedSubtotal}</span>
          </div>
          
          <div className="flex justify-between mb-4 font-bold">
            <span>Total (Incluye IVA):</span>
            <span>{formattedSubtotal}</span>
          </div>
          <button
            className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded mb-4"
            onClick={clearCart}
          >
            Limpiar Carrito
          </button>
          <button
            className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded mb-4"
          >
            Continuar Comprando
          </button>
          <button
            className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded"
          >
            Ir a Pagar
          </button>
        </div>
      </div>
    </div>
  );
}
