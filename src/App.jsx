import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Products from "./pages/products";  
import Nostros from "./pages/nostros";
import ProductInfo from "./pages/productInfo";
import { FiltersProvider } from "./context/filters";
import { CartProvider } from "./context/cartcontext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <Router>
      <FiltersProvider>
      <CartProvider>  
        <div className="min-h-screen flex flex-col">
          <Navbar  />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Products/>} />
              <Route path="/Nosotros" element={<Nostros/>} />
              <Route path="/Producto-Info/:id" element={<ProductInfo/>} />
            </Routes>
            
          </div>
          <footer >
            <Footer/>
          </footer>
        </div>
      </CartProvider>
     
    </FiltersProvider>
    </Router>
    
  );
}

export default App;