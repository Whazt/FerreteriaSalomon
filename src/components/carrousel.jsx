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
      <div className="grid grid-cols-5 gap-4">
        <div className="text-center">
          <button className="rounded-full p-2 border-2 border-orange-400 hover:bg-orange-200" >
           <img src="/hammer.svg" alt="Martillo" className="size-18 text-orange-400  rounded-lg" /> 
          </button>
          <p className="text-orange-400">Herramientas Manuales</p>
        </div>
        <div className="text-center">
          <button className="rounded-full p-2 border-2 border-orange-400 hover:bg-orange-200" >
           <img src="/drill.svg" alt="Martillo" className="size-18 text-orange-400  rounded-lg" /> 
          </button>
          <p className="text-orange-400">Herramientas Electrícas</p>
        </div>
        <div className="text-center">
          <button className="rounded-full p-2 border-2 border-orange-400 hover:bg-orange-200" >
           <img src="/paint.svg" alt="Martillo" className=" text-orange-400  rounded-lg" /> 
          </button>
          <p className="text-orange-400">Pintura</p>
        </div>
        <div className="text-center">
          <button className="rounded-full p-2 border-2 border-orange-400 hover:bg-orange-200" >
           <img src="/plumb.svg" alt="Martillo" className="size-18 text-orange-400  rounded-lg" /> 
          </button>
          <p className="text-orange-400">Fontanería</p>
        </div>
        <div className="text-center">
          <button className="rounded-full p-2 border-2 border-orange-400 hover:bg-orange-200" >
           <img src="/wall.svg" alt="Martillo" className="size-18 text-orange-400  rounded-lg" /> 
          </button>
          <p className="text-orange-400">Construcción</p>
        </div>
      </div>

      <div className="bg-orange-400 text-white text-center py-4 mt-8">
        <h2 className="text-2xl font-bold">¡Ofertas Especiales!</h2>
        <p className='mb-4'>No te pierdas nuestras promociones</p>
        <NavLink to="/Categorias" className="bg-white text-orange-400 p-2 rounded mt-2 inline-block">Comprar Ahora</NavLink>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Productos Destacados</h2>
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        className="m-0 p-0"
      >
        {products.map((product) => (
          <div key={product.id} className="text-center p-4">
            <img src={product.imagen} alt={product.titulo} className="mx-auto mb-4 max-h-60 object-contain" />
            <p className="font-bold">{product.titulo}</p>
            <button className="bg-orange-400 text-white p-2 rounded my-2">Comprar Ahora</button>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carrusel;
