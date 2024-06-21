 function Products({products}) {
  return (
    <main className="bg-gray-50 ">
      <span className="text-orange-500 text-xl font-bold"> JEJE </span>
      <ul className="grid grid-cols-1 ipp:justifey-items-center md:grid-cols-2 lg:grid-cols-4 md:m-1 lg:m-10">
        {products.map((product) => (
            <li key={product.id} className="col-span-1 mb-4">
                <div className="w-full max-w-sm bg-white boder border-t-1 border-gray-800 rounded-lg shadow-xl">
                    <a href="#" className="">
                        <img className="py-3 px-6 rounded-t-lg" src={product.imagen} alt="product image" />
                    </a>
                    <div className="px-5 pb-5 border-t-2 border-gray-950 ">
                        <a href="#">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">{product.titulo}</h5>
                        </a>
                        
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 ">{product.precio}</span>
                            <a href="#" className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Agregar al carrito</a>
                        </div>
                    </div>
                </div>
            </li>
        ))}
      </ul>
    </main>
  );
}

export default Products;
