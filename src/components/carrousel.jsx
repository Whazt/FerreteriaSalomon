import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos del carrusel
import { products as productsData } from '../mocks/products'; // Importa el archivo JSON
import { NavLink, useNavigate } from 'react-router-dom';
import { useFilters } from '../hooks/useFilters';

const Carrusel = () => {
  const { filters, setFilters } = useFilters();
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

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

  const handleCategory = (cat) => {
    setFilters({ ...filters, category: cat });
    navigate('/Categorias');
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < products.length - 3 ? prevIndex + 1 : products.length - 3));
  };

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
          <button onClick={() => handleCategory('hmanual')} className="rounded-full p-2 border-2 border-orange-400 hover:bg-orange-200">
            <img src="/hammer.svg" alt="Martillo" className="size-18 text-orange-400 rounded-lg" />
          </button>
          <p className="text-orange-400">Herramientas Manuales</p>
        </div>
        <div className="text-center">
          <button onClick={() => handleCategory('helectrica')} className="rounded-full p-2 border-2 border-orange-400 hover:bg-orange-200">
            <img src="/drill.svg" alt="Taladro" className="size-18 text-orange-400 rounded-lg" />
          </button>
          <p className="text-orange-400">Herramientas Electrícas</p>
        </div>
        <div className="text-center">
          <button onClick={() => handleCategory('pint')} className="rounded-full p-2 border-2 border-orange-400 hover:bg-orange-200">
            <img src="/paint.svg" alt="Pintura" className="text-orange-400 rounded-lg" />
          </button>
          <p className="text-orange-400">Pintura</p>
        </div>
        <div className="text-center">
          <button onClick={() => handleCategory('font')} className="rounded-full p-2 border-2 border-orange-400 hover:bg-orange-200">
            <img src="/plumb.svg" alt="Fontanería" className="size-18 text-orange-400 rounded-lg" />
          </button>
          <p className="text-orange-400">Fontanería</p>
        </div>
        <div className="text-center">
          <button onClick={() => handleCategory('construccion')} className="rounded-full p-2 border-2 border-orange-400 hover:bg-orange-200">
            <img src="/wall.svg" alt="Construcción" className="size-18 text-orange-400 rounded-lg" />
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
      <div className="relative">
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-orange-400 text-white p-2 rounded-full"
        >
          &lt;
        </button>
        <div className="flex overflow-hidden space-x-4">
          {products.slice(currentIndex, currentIndex + 3).map((product) => (
            <div key={product.id} className="flex-shrink-0 w-1/3 text-center p-4">
              <img src={product.imagen} alt={product.titulo} className="mx-auto mb-4 max-h-60 object-contain" />
              <p className="font-bold mb-6">{product.titulo}</p>
              <NavLink to={`/Producto-Info/${product.id}`} className="bg-orange-400 text-white p-4 rounded my-2">Comprar Ahora</NavLink>
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-400 text-white p-2 rounded-full"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carrusel;
