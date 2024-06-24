import { useState, useEffect } from 'react';
import { products as initialProducts } from '../mocks/products.json';
import { TrashIcon, EditIcon, AddIcon } from '../components/icons';
import axios from 'axios';

const GestionProductos = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ id: '', titulo: '', marca: '', imagen: '', categoria: '', precio: '', descripcion: '', valoraciones: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // Cargar productos desde localStorage o inicializar con JSONss
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products'));
    if (savedProducts && savedProducts.length > 0) {
      setProducts(savedProducts);
    } else {
      localStorage.setItem('products', JSON.stringify(initialProducts));
      setProducts(initialProducts);
    }
  }, []);

  // Guardar productos en localStorage
  const saveProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
    setProducts(products);
  };

  const handleAddProduct = async () => {
    let imageUrl = '';
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'swiijmtu'); // Usa tu upload preset de Cloudinary
      formData.append('api_key', '297496492522422'); // Añadir api_key
      formData.append('api_secret', 'IThtwqbTP2hKzr8p9xpOHvaKqkk'); // Añadir api_secret

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dffityi8e/image/upload', formData); // Usa tu nombre de Cloudinary
        imageUrl = response.data.secure_url;
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        if (error.response) {
          console.error('Detalles del error:', error.response.data);
        } else {
          console.error('Error sin respuesta del servidor:', error.message);
        }
        return;
      }
    }

    const newId = products.length > 0 ? String(parseInt(products[products.length - 1].id) + 1) : '1';
    const productToAdd = { ...newProduct, id: newId, imagen: imageUrl };
    const updatedProducts = [...products, productToAdd];
    saveProducts(updatedProducts);
    setNewProduct({ id: '', titulo: '', marca: '', imagen: '', categoria: '', precio: '', descripcion: '', valoraciones: [] });
    setIsModalOpen(false);
    setImageFile(null); // Limpiar la imagen seleccionada
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    saveProducts(updatedProducts);
  };

  const handleEditProduct = (id) => {
    const productToEdit = products.find(product => product.id === id);
    setNewProduct(productToEdit);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleUpdateProduct = async () => {
    let imageUrl = newProduct.imagen;
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'swiijmtu'); // Usa tu upload preset de Cloudinary
      formData.append('api_key', '297496492522422'); // Añadir api_key
      formData.append('api_secret', 'IThtwqbTP2hKzr8p9xpOHvaKqkk'); // Añadir api_secret

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dffityi8e/image/upload', formData); // Usa tu nombre de Cloudinary
        imageUrl = response.data.secure_url;
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        if (error.response) {
          console.error('Detalles del error:', error.response.data);
        } else {
          console.error('Error sin respuesta del servidor:', error.message);
        }
        return;
      }
    }

    const updatedProducts = products.map(product => product.id === newProduct.id ? { ...newProduct, imagen: imageUrl } : product);
    saveProducts(updatedProducts);
    setNewProduct({ id: '', titulo: '', marca: '', imagen: '', categoria: '', precio: '', descripcion: '', valoraciones: [] });
    setIsEditing(false);
    setIsModalOpen(false);
    setImageFile(null); // Limpiar la imagen seleccionada
  };

  return (
    <div className="container mx-auto overflow-y-auto p-4">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">Productos</h1>
        <div>
          <button onClick={() => setIsModalOpen(true)} className="flex gap-2 bg-blue-500 text-white px-4 py-2 rounded"><AddIcon  /> Agregar</button>
        </div>
      </div>
      <div className="space-y-4">
        {products.map(product => (
          <div key={product.id} className="p-4 border rounded flex justify-between items-center">
            <div className="flex items-center">
              <img src={product.imagen} alt={product.titulo} className="w-16 h-16 mr-4"/>
              <div>
                <p><strong>ID:</strong> {product.id}</p>
                <p><strong>Título:</strong> {product.titulo}</p>
                <p><strong>Marca:</strong> {product.marca}</p>
                <p><strong>Categoría:</strong> {product.categoria}</p>
                <p><strong>Precio:</strong> {product.precio}</p>
              </div>
            </div>
            <div>
              <button onClick={() => handleEditProduct(product.id)} className="btn btn-secondary bg-yellow-500 text-white px-4 py-2 rounded mr-2"><EditIcon /></button>
              <button onClick={() => handleDeleteProduct(product.id)} className="btn btn-danger bg-red-500 text-white px-4 py-2 rounded"><TrashIcon/></button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Modificar Producto' : 'Añadir Nuevo Producto'}</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Título"
                value={newProduct.titulo}
                onChange={(e) => setNewProduct({ ...newProduct, titulo: e.target.value })}
                className="input input-bordered w-full border-gray-300 rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="Marca"
                value={newProduct.marca}
                onChange={(e) => setNewProduct({ ...newProduct, marca: e.target.value })}
                className="input input-bordered w-full border-gray-300 rounded px-4 py-2"
              />
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="input input-bordered w-full border-gray-300 rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="Categoría"
                value={newProduct.categoria}
                onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
                className="input input-bordered w-full border-gray-300 rounded px-4 py-2"
              />
              <input
                type="number"
                placeholder="Precio"
                value={newProduct.precio}
                onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
                className="input input-bordered w-full border-gray-300 rounded px-4 py-2"
              />
              <textarea
                placeholder="Descripción"
                value={newProduct.descripcion}
                onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
                className="textarea textarea-bordered w-full border-gray-300 rounded px-4 py-2"
              ></textarea>
              <div className="flex justify-end">
                <button onClick={isEditing ? handleUpdateProduct : handleAddProduct} className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded">
                  {isEditing ? 'Guardar Cambios' : 'Añadir Producto'}
                </button>
                <button onClick={() => { setIsModalOpen(false); setIsEditing(false); }} className="btn btn-secondary ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionProductos;