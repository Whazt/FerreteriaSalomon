import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos del carrusel
import { products as productsData } from '../mocks/products'; // Importa el archivo JSON
import { NavLink } from 'react-router-dom';

const Carrusel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        if (parsedProducts && Array.isArray(parsedProducts)) {
          setProducts(parsedProducts);
        } else {
          throw new Error('Invalid data');
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        localStorage.setItem('products', JSON.stringify(productsData));
        setProducts(productsData);
      }
    } else {
      localStorage.setItem('products', JSON.stringify(productsData));
      setProducts(productsData);
    }
  }, []);

  return (
    <div className="m-0 p-0 w-full">
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        className="m-0 p-0"
      >
        <div className="m-0 p-0">
          <img src="/banner1.jpg" alt="Banner 1" className="w-full" />
        </div>
        <div className="m-0 p-0">
          <img src="/banner2.png" alt="Banner 2" className="w-full" />
        </div>
        <div className="m-0 p-0">
          <img src="/banner3.png" alt="Banner 3" className="w-full" />
        </div>
      </Carousel>

      <h2 className="text-2xl font-bold mt-8 mb-4">Categorías</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <img src="" alt="Acabados" className="mx-auto" />
          <p>Acabados</p>
        </div>
        <div className="text-center">
          <img src="" alt="Automotriz" className="mx-auto" />
          <p>Automotriz</p>
        </div>
        <div className="text-center">
          <img src="" alt="Baño" className="mx-auto" />
          <p>Baño</p>
        </div>
        <div className="text-center">
          <img src="" alt="Construcción" className="mx-auto" />
          <p>Construcción</p>
        </div>
        {/* Añade más categorías según sea necesario */}
      </div>

      <div className="bg-orange-400 text-white text-center py-4 mt-8">
        <h2 className="text-2xl font-bold">¡Ofertas Especiales!</h2>
        <p className='mb-4'>No te pierdas nuestras promociones</p>
        <NavLink to="/Categorias" className="bg-white text-orange-400 p-2 rounded mt-2">Comprar Ahora</NavLink>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Productos Destacados</h2>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="text-center m-2 border">
            <img src={product.imagen} alt={product.titulo} className="mx-auto" />
            <p>{product.titulo}</p>
            <button className="bg-orange-400 text-white p-2 rounded my-2">Comprar Ahora</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carrusel;
