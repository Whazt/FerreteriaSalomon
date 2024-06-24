import { useEffect, useState, useContext } from 'react';
import { useCart } from "../hooks/useCart";
import { SmallTrashIcon } from "../components/icons";
import { NavLink } from 'react-router-dom';
import { UserContext } from "../context/userContext";
import LoginCarrito from '../components/loginCarrito'; // Asegúrate de importar tu componente de login específico para el carrito

function CartItem({ id, titulo, precio, imagen, quantity, addToCart, removeFromCart, decreaseFromCart }) {
  const formattedPrice = new Intl.NumberFormat('es-NI', { style: 'currency', currency: 'NIO' }).format(precio);
  const formattedTotal = new Intl.NumberFormat('es-NI', { style: 'currency', currency: 'NIO' }).format(precio * quantity);

  return (
    <div className="flex flex-col md:flex-row items-center p-4 border-b border-gray-200">
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
          className="mt-2 flex items-center text-red-500 gap-1"
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
  const [pickupOption, setPickupOption] = useState('store');
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [useUserAddress, setUseUserAddress] = useState(true);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const { user, saveUser } = useContext(UserContext);

  useEffect(() => {
    const newSubtotal = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
    const newTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    setSubtotal(newSubtotal);
    setTotalItems(newTotalItems);
  }, [cart]);

  const handleCheckout = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      setShowModal(true);
    }
  };

  const handleLogin = (user) => {
    saveUser(user);
    setShowLoginModal(false);
    setShowModal(true);
  };

  const handlePayment = () => {
    const sale = {
      user,
      cart,
      total: subtotal,
      date: new Date().toISOString(),
      pickupOption,
      paymentMethod,
    };

    // Guardar la venta en el localStorage
    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    sales.push(sale);
    localStorage.setItem("sales", JSON.stringify(sales));

    // Mostrar confirmación y limpiar el carrito
    setShowModal(false);
    setShowConfirmation(paymentMethod === 'card');
    setShowReceipt(paymentMethod !== 'card');
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setShowReceipt(true);
  };

  const closeReceipt = () => {
    setShowReceipt(false);
    clearCart();
    window.location.href = '/';
  };

  const formattedSubtotal = new Intl.NumberFormat('es-NI', { style: 'currency', currency: 'NIO' }).format(subtotal);

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-3xl font-bold mb-4">Mi carrito de compras</h1>
      <div className="flex flex-col md:flex-row items-center mb-4">
        <label className="mr-4 text-lg"><span className="text-red-800 text-lg">*</span> Selecciona cómo quiere obtener su pedido:</label>
        <div className="flex items-center mb-2 md:mb-0">
          <input type="radio" id="delivery" name="pickupOption" value="delivery" className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500" onChange={() => setPickupOption('delivery')} />
          <label htmlFor="delivery" className="ml-2">Envío a domicilio</label>
        </div>
        <div className="flex items-center ml-4">
          <input type="radio" id="store" name="pickupOption" value="store" defaultChecked className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500" onChange={() => setPickupOption('store')} />
          <label htmlFor="store" className="ml-2">Recoger en tienda</label>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
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
        <div className="w-full md:w-1/4 p-4 border-t md:border-t-0 md:border-l border-gray-200">
          <h2 className="text-xl font-bold mb-4">Total del pedido</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal ({totalItems} productos):</span>
            <span>{formattedSubtotal}</span>
          </div>
          <div className="flex justify-between mb-4 font-bold">
            <span>Total (Incluye IVA):</span>
            <span>{formattedSubtotal}</span>
          </div>
          <div>
            <button
              className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded mb-4"
              onClick={clearCart}
            >
              Limpiar Carrito
            </button>
            <NavLink
              to="/"
              className="block w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded mb-4 text-center"
            >
              Continuar Comprando
            </NavLink>
            <button
              className="block w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded text-center"
              onClick={handleCheckout}
            >
              Ir a Pagar
            </button>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <LoginCarrito
          onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin}
            />
          )}
    
          {showModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded shadow-lg w-full max-w-md relative overflow-y-auto max-h-screen">
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
                <div className="text-center mb-4">
                  <img src="/salomonlogo.png" alt="Logo" className="mx-auto" />
                </div>
                <div>
                  {pickupOption === 'store' ? (
                    <>
                      <h2 className="text-2xl mb-4">Opciones de Pago</h2>
                      <div className="mb-4">
                        <label className="block text-gray-700">Selecciona el método de pago:</label>
                        <div className="flex items-center mt-2">
                          <input type="radio" id="payInStore" name="paymentMethod" value="store" className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500" onChange={() => setPaymentMethod('store')} />
                          <label htmlFor="payInStore" className="ml-2">Pagar en tienda</label>
                        </div>
                        <div className="flex items-center mt-2">
                          <input type="radio" id="payNow" name="paymentMethod" value="card" className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500" onChange={() => setPaymentMethod('card')} />
                          <label htmlFor="payNow" className="ml-2">Pagar ahora</label>
                        </div>
                      </div>
                      {paymentMethod === 'card' && (
                        <>
                          <div className="mb-4">
                            <label className="block text-gray-700">Número de Tarjeta:</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">MM/AA:</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">CVC:</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" />
                          </div>
                        </>
                      )}
                      <div className="flex justify-between mb-4 font-bold">
                        <span>Total (Incluye IVA):</span>
                        <span>{formattedSubtotal}</span>
                      </div>
                      <button
                        className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded mt-4"
                        onClick={handlePayment}
                      >
                        Aceptar
                      </button>
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl mb-4">Información de Envío</h2>
                      <div className="mb-4">
                        <label className="block text-gray-700">¿Usar la dirección guardada?</label>
                        <div className="flex items-center mt-2">
                          <input type="radio" id="useSavedAddressYes" name="useSavedAddress" value="yes" className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500" onChange={() => setUseUserAddress(true)} defaultChecked />
                          <label htmlFor="useSavedAddressYes" className="ml-2">Sí</label>
                        </div>
                        <div className="flex items-center mt-2">
                          <input type="radio" id="useSavedAddressNo" name="useSavedAddress" value="no" className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500" onChange={() => setUseUserAddress(false)} />
                          <label htmlFor="useSavedAddressNo" className="ml-2">No</label>
                        </div>
                      </div>
                      {!useUserAddress && (
                        <>
                          <div className="mb-4">
                            <label className="block text-gray-700">Departamento:</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">Ciudad:</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">Dirección:</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" />
                          </div>
                        </>
                      )}
                      <div className="mb-4">
                        <label className="block text-gray-700">Número de Tarjeta:</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700">MM/AA:</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700">CVC:</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" />
                      </div>
                      <div className="flex justify-between mb-4 font-bold">
                        <span>Total (Incluye IVA):</span>
                        <span>{formattedSubtotal}</span>
                      </div>
                      <button
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded mt-4"
                        onClick={handlePayment}
                      >
                        Aceptar
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
    
          {showConfirmation && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded shadow-lg text-center">
                <img src="/check.png" alt="Confirmación" className="mx-auto mb-4" />
                <p className="text-xl font-bold mb-4">Pago realizado con éxito</p>
                <button
                  className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded"
                  onClick={closeConfirmation}
                >
                  OK
                </button>
              </div>
            </div>
          )}
    
          {showReceipt && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded shadow-lg text-center relative">
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
                  onClick={closeReceipt}
                >
                  Cerrar
                </button>
                <div>
                  <p><strong>No. Pedido:</strong> {Math.floor(Math.random() * 1000000)}</p>
                  <p><strong>{pickupOption === 'store' ? 'Retiro En Tienda' : 'Entrega a Domicilio'}</strong></p>
                  <p><strong>Cliente:</strong> {user.name}</p>
                  <div>
                    <h3 className="font-bold mt-4">Artículos:</h3>
                    <ul className="list-disc list-inside">
                      {cart.map(item => (
                        <li key={item.id}>{item.titulo} (x{item.quantity}) - {new Intl.NumberFormat('es-NI', { style: 'currency', currency: 'NIO' }).format(item.precio)}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>{formattedSubtotal}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Total (Incluye IVA):</span>
                    <span>{formattedSubtotal}</span>
                  </div>
                  {paymentMethod === 'card' && <p className="font-bold text-green-600">Pagado</p>}
                  {paymentMethod === 'store' && <p className="font-bold text-red-600">Pendiente de Pago</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
