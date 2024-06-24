import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { products as initialProducts } from "../mocks/products.json";
import { useCart } from "../hooks/useCart";
import { ICartIcon } from "../components/icons";

function ProductInfo() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1); // Estado para manejar la cantidad
  const { addToCart } = useCart(); // Hook para el carrito

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      localStorage.setItem("products", JSON.stringify(initialProducts));
      setProducts(initialProducts);
    }
  }, []);

  const product = products.find((product) => product.id === id);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      <div className="flex justify-between items-start">
        <div className="w-1/2">
          <img src={product.imagen} alt={product.titulo} className="w-[60vh] h-auto" />
        </div>
        <div className="w-1/2 pl-8">
          <h1 className="text-3xl font-bold mb-2">{product.titulo}</h1>
          <p className="text-xl font-semibold mb-2">C$ {product.precio}</p>
          <p className="text-lg mb-2"><strong>Código:</strong> {product.id}</p>
          <p className="text-lg mb-2"><strong>Marca:</strong> {product.marca}</p>
          <p className="text-lg mb-4">En existencia</p>
          <p className="text-lg mb-4"><strong>Retirar en sucursal:</strong> {product.descripcion}</p>
          <div className="flex items-center mb-4">
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={handleDecrease}
                className="px-2 py-1"
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center border-none"
              />
              <button
                onClick={handleIncrease}
                className="px-2 py-1"
              >
                +
              </button>
            </div>
            <button onClick={handleAddToCart} className="bg-orange-500 text-white px-4 py-2 rounded ml-2">Agregar Al Carrito</button>
            <NavLink to="/Carrito" className="bg-orange-500 flex gap-2 text-white px-4 py-2 rounded ml-2"><ICartIcon/>Ver Carito</NavLink>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Descripción:</h2>
        <p className="text-lg mb-4">{product.descripcion}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Valoraciones y Reseñas:</h2>
        
        {product.valoraciones.map((valoracion, index) => (
          <div key={index} className="border-t border-gray-300 pt-4">
            <p className="text-lg">{valoracion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductInfo;
