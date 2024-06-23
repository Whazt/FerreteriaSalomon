import { useCart } from "../hooks/useCart";
import { NavLink } from "react-router-dom";

function ListProducts({products}) {

    const {addToCart} = useCart();

    return (
      <main className="bg-gray-50 ">
  
        <ul className="grid grid-cols-1 ipp:justifey-items-center md:grid-cols-2 lg:grid-cols-4 md:m-1 lg:m-10">
          {products.map((product) => (
              <li key={product.id} className="col-span-1 min-h-[500px] m-2">
                  <div className="w-full max-w-sm bg-white boder border-t-1 border-gray-800 rounded-lg shadow-xl">
                      <NavLink to={`/Producto-Info/${product.id}`} className="">
                          <img className="py-3 px-6 rounded-t-lg" src={product.imagen} alt="product image" />
                      </NavLink>
                      <div className="px-5 pb-5 border-t-2 border-gray-950 min-h-[118px]">
                          <NavLink to={`/Producto-Info/${product.id}`} className="">
                              <h5 className="text-md font-semibold tracking-tight text-gray-900 ">{product.titulo}</h5>
                          </NavLink>
                          
                          <div className="flex  mt-1 items-end  justify-between">
                              
                            <button onClick={() => addToCart(product)} className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                Agregar al carrito
                            </button>
                          </div>
                      </div>
                  </div>
              </li>
          ))}
        </ul>
      </main>
    );
  }
  
  export default ListProducts;