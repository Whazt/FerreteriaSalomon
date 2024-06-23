import { Cart } from "./cart"
import { NavLink } from "react-router-dom"


function Navbar() {
  return (
    <>
        <nav className="grid grid-cols-6 items-center  min-h-[20vh] w-full z-10   ">
            <img src="/salomonlogo.png" alt="Salomon Logo" className="p-2 col-span-1" />
            <form className="col-span-3 flex items-center space-x-2">
                <input type="text" placeholder="Buscar..." className="flex-1 p-2 pl-4 text-slate-950 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" />
                <button type="submit" className="p-2 bg-orange-400 text-white rounded-md hover:bg-orange-500">
                    Buscar
                </button>
            </form>
            <div className="col-span-1  text-right  ">inicio</div>
            <Cart className="col-span-1 text-center" />
            
            <div className="col-span-6 flex items-center justify-center bg-orange-400">
                <NavLink to="/" className="p-2 text-white rounded-md hover:bg-orange-500">INICIO</NavLink>
                <NavLink to="/Nosotros" className="p-2 text-white rounded-md hover:bg-orange-500">NOSOTROS</NavLink>
            </div>
        </nav>

    </ > 
  )
}

export default Navbar