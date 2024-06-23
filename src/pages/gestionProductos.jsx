import { useState, useEffect } from 'react';
import { products as initialProducts } from '../mocks/products.json';

const GestionProductos = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ id: '', titulo: '', marca: '', imagen: '', categoria: '', precio: '', descripcion: '', valoraciones: [] });

  // Cargar productos desde localStorage o inicializar con JSON
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products'));
    if (savedProducts && savedProducts.length > 0) {
      setProducts(savedProducts);
    } else {
      localStorage.setItem('products', JSON.stringify(initialProducts.products));
      setProducts(initialProducts.products);
    }
  }, []);

  // Guardar productos en localStorage
  const saveProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
    setProducts(products);
  };

  const handleAddProduct = () => {
    const newId = products.length > 0 ? String(parseInt(products[products.length - 1].id) + 1) : '1';
    const productToAdd = { ...newProduct, id: newId };
    const updatedProducts = [...products, productToAdd];
    saveProducts(updatedProducts);
    setNewProduct({ id: '', titulo: '', marca: '', imagen: '', categoria: '', precio: '', descripcion: '', valoraciones: [] });
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    saveProducts(updatedProducts);
  };

  const handleEditProduct = (id, field, value) => {
    const updatedProducts = products.map(product => product.id === id ? { ...product, [field]: value } : product);
    saveProducts(updatedProducts);
  };

  return (
    <div className="container mx-auto overflow-y-auto p-4">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">Productos</h1>
        <div>
          <button onClick={handleAddProduct} className="btn btn-primary">Crear Producto</button>
          <button onClick={() => saveProducts(products)} className="btn btn-secondary ml-2">Actualizar</button>
        </div>
      </div>
      <div className="mb-4 flex justify-between">
        <input type="text" placeholder="Buscar" className="input input-bordered w-full max-w-xs" />
        <button className="btn btn-secondary ml-2">Buscar</button>
      </div>
      <div className="overflow-x-auto mb-4">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Marca</th>
              <th className="px-4 py-2">Categoría</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Imagen</th>
              <th className="px-4 py-2">Fecha de Creación</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className="border px-4 py-2">{product.id}</td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={product.titulo}
                    onChange={(e) => handleEditProduct(product.id, 'titulo', e.target.value)}
                    className="input input-sm w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={product.marca}
                    onChange={(e) => handleEditProduct(product.id, 'marca', e.target.value)}
                    className="input input-sm w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={product.categoria}
                    onChange={(e) => handleEditProduct(product.id, 'categoria', e.target.value)}
                    className="input input-sm w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={product.precio}
                    onChange={(e) => handleEditProduct(product.id, 'precio', e.target.value)}
                    className="input input-sm w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={product.imagen}
                    onChange={(e) => handleEditProduct(product.id, 'imagen', e.target.value)}
                    className="input input-sm w-full"
                  />
                </td>
                <td className="border px-4 py-2">{product.fechaCreacion}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleDeleteProduct(product.id)} className="btn btn-danger mr-2">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Añadir Nuevo Producto</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={newProduct.titulo}
            onChange={(e) => setNewProduct({ ...newProduct, titulo: e.target.value })}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Marca"
            value={newProduct.marca}
            onChange={(e) => setNewProduct({ ...newProduct, marca: e.target.value })}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Imagen"
            value={newProduct.imagen}
            onChange={(e) => setNewProduct({ ...newProduct, imagen: e.target.value })}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Categoría"
            value={newProduct.categoria}
            onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            placeholder="Precio"
            value={newProduct.precio}
            onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={newProduct.descripcion}
            onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
            className="input input-bordered w-full"
          />
        </div>
        <button onClick={handleAddProduct} className="btn btn-primary mt-4">Añadir Producto</button>
      </div>
    </div>
  );
};

export default GestionProductos;