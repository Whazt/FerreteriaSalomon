import { Routes, Route } from 'react-router-dom';
import GestionProductos from "./gestionProductos";
import GestionUsuarios from "./gestionUsuarios";
import GestionVentas from "./gestionVentas";
import SidebarAdmin from '../components/sidebarAdmin';

export function AdminPanel() {
  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-grow ml-[30vh]">
        <Routes>
          <Route path="/" element={<GestionProductos />} />
          <Route path="Usuarios" element={<GestionUsuarios />} />
          <Route path="Ventas" element={<GestionVentas />} />
        </Routes>
      </div>
    </div>
  );
}