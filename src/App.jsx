import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Products from "./pages/products";  
import { FiltersProvider } from "./context/filters";
import { CartProvider } from "./context/cartcontext";

function App() {


  return (
    <FiltersProvider>
      <CartProvider>  
        <div className="min-h-screen flex flex-col">
          <Navbar  />
          <div className="flex-grow">
            <Products/>
          </div>
          <footer >
            <Footer/>
          </footer>
        </div>
      </CartProvider>
     
    </FiltersProvider>
  );
}

export default App;