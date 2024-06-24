import { NavLink } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { UsersGestIcon, VentasIcon, ProductIcon } from './icons';

const SidebarAdmin = () => {
  const { logout } = useUser();

  return (
    <div className="h-screen w-[30vh] bg-white text-black flex fixed flex-col justify-between border-r border-gray-300">
      <div>
        <div className="flex items-center justify-center h-20 bg-white mb-10">
          <img src="/salomonlogo.png" alt="Salomon Logo" className="p-2  mt-4 scol-span-1"/>
        </div>
        <nav className="flex flex-col mt-4">
          <NavLink
            to="/Admin-Panel"
            className={({ isActive }) => isActive ? "m-1 py-4 px-6 bg-orange-400 text-white rounded-lg flex gap-2" : " m-1 py-4 px-6 hover:bg-orange-500 hover:text-white rounded-lg flex gap-2"}
            end
          >
            <ProductIcon /> Productos 
          </NavLink>
          <NavLink
            to="/Admin-Panel/Usuarios"
            className={({ isActive }) => isActive ? "m-1 py-4 px-6 bg-orange-400 text-white rounded-lg flex gap-2" : "flex gap-2 m-1 py-4 px-6 hover:bg-orange-500 hover:text-white rounded-lg"}
          >
           <UsersGestIcon /> Usuarios 
          </NavLink>
          <NavLink
            to="/Admin-Panel/Ventas"
            className={({ isActive }) => isActive ? "m-1 py-4 px-6 bg-orange-400 text-white rounded-lg flex gap-2" : " m-1 py-4 px-6 hover:bg-orange-500 hover:text-white rounded-lg flex gap-2"}
          >
           <VentasIcon /> Ventas 
          </NavLink>
        </nav>
      </div>
      <div className="p-4">
        <button
          onClick={logout}
          className="w-full py-2 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SidebarAdmin;