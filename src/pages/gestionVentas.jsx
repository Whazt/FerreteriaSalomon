import { useState, useEffect, useRef } from 'react';
import { ventas } from '../mocks/ventas.json';
import { PrintIcon } from '../components/icons'; // Asegúrate de tener este ícono o cámbialo por uno que tengas

const GestionarVentas = () => {
  const [sales, setSales] = useState([]);
  const printRef = useRef();

  // Cargar ventas desde localStorage o inicializar con JSON
  useEffect(() => {
    const savedSales = JSON.parse(localStorage.getItem('sales'));
    if (savedSales && savedSales.length > 0) {
      setSales(savedSales);
    } else {
      localStorage.setItem('sales', JSON.stringify(ventas));
      setSales(ventas);
    }
  }, []);

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Recargar la página para restaurar el contenido original
  };

  return (
    <div className="container mx-auto overflow-y-auto p-4">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">Ventas</h1>
        <div>
          <button onClick={handlePrint} className="flex gap-2 bg-blue-500 text-white px-4 py-2 rounded"><PrintIcon /> Imprimir</button>
        </div>
      </div>
      <div ref={printRef} className="space-y-4">
        {sales.map((sale, index) => (
          <div key={index} className="p-4 border rounded">
            <div>
              <p><strong>Cliente:</strong> {sale.user.nombre} ({sale.user.email})</p>
              <p><strong>Fecha:</strong> {new Date(sale.date).toLocaleString()}</p>
              <p><strong>Total:</strong> {new Intl.NumberFormat('es-NI', { style: 'currency', currency: 'NIO' }).format(sale.total)}</p>
              <h3 className="font-bold mt-4">Artículos:</h3>
              <ul className="list-disc list-inside">
                {sale.cart.map(item => (
                  <li key={item.id}>{item.titulo} (x{item.quantity}) - {new Intl.NumberFormat('es-NI', { style: 'currency', currency: 'NIO' }).format(item.precio)}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionarVentas;
