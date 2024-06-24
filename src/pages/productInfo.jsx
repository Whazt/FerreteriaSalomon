import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { products as initialProducts } from "../mocks/products.json";
import { useCart } from "../hooks/useCart";

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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-start">
        <div className="w-1/2">
          <img src={product.imagen} alt={product.titulo} className="w-full h-auto" />
        </div>
        <div className="w-1/2 pl-8">
          <h1 className="text-3xl font-bold mb-2">{product.titulo}</h1>
          <p className="text-xl font-semibold mb-2">C$ {product.precio}</p>
          <p className="text-lg mb-2"><strong>Código:</strong> {product.id}</p>
          <p className="text-lg mb-2"><strong>Marca:</strong> {product.marca}</p>
          <p className="text-lg mb-4">En existencia</p>
          <p className="text-lg mb-4"><strong>Retirar en sucursal:</strong> {product.descripcion}</p>
          <div className="flex items-center mb-4">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-12 text-center border border-gray-300 rounded mr-2"
              min="1"
            />
            <button onClick={handleAddToCart} className="bg-orange-500 text-white px-4 py-2 rounded mr-2">Agregar Al Carrito</button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded">Comprar Ahora</button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Descripción:</h2>
        <p className="text-lg mb-4">{product.descripcion}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Valoraciones y Reseñas:</h2>
        <p className="text-2xl font-semibold mb-2">4.8</p>
        <p className="text-yellow-500 text-2xl mb-4">★★★★★</p>
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
