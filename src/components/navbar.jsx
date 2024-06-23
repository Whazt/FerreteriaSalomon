import { Cart } from "./cart"
import Login from "./login";
import { SearchBar } from "./searchbar";
import { NavLink } from "react-router-dom"


function Navbar() {
  return (
    <>
        <nav className="grid grid-cols-8 items-center  min-h-[20vh] w-full z-10   ">
            <img src="/salomonlogo.png" alt="Salomon Logo" className="p-2 mx-auto block" />
            <SearchBar/>
            <div className="col-span-1  text-center  ">
              <Login />
            </div>
            <Cart className="col-span-1 text-left" />
            
            <div className="col-span-8 flex items-center justify-center bg-orange-400">
                <NavLink to="/" className="p-2 text-white rounded-md hover:bg-orange-500">INICIO</NavLink>
                <NavLink to="/Nosotros" className="p-2 text-white rounded-md hover:bg-orange-500">NOSOTROS</NavLink>
            </div>
        </nav>

    </ > 
  )
}

export default Navbar