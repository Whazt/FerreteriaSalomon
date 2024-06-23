import { NavLink } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const SidebarAdmin = () => {
  const { logout } = useUser();

  return (
    <div className="h-screen w-[30vh] bg-gray-800 text-white flex fixed flex-col justify-between">
      <div>
        <div className="flex items-center justify-center h-20 bg-orange-400">
          <h1 className="text-3xl font-bold">Mi Negocio</h1>
        </div>
        <nav className="flex flex-col mt-4">
          <NavLink
            to="/Admin-Panel"
            className={({ isActive }) => isActive ? "py-4 px-6 bg-gray-600" : "py-4 px-6 hover:bg-gray-600"}
            end
          >
            Productos
          </NavLink>
          <NavLink
            to="/Admin-Panel/Usuarios"
            className={({ isActive }) => isActive ? "py-4 px-6 bg-gray-600" : "py-4 px-6 hover:bg-gray-600"}
          >
            Usuarios
          </NavLink>
          <NavLink
            to="/Admin-Panel/Ventas"
            className={({ isActive }) => isActive ? "py-4 px-6 bg-gray-600" : "py-4 px-6 hover:bg-gray-600"}
          >
            Ventas
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