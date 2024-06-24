import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Products from "./pages/products";  
import Nosotros from "./pages/nosotros";
import Contact from "./pages/contact";
import ProductInfo from "./pages/productInfo";
import { Carrito } from "./pages/Carrito";
import { AdminPanel } from "./pages/adminPanel";
import { FiltersProvider } from "./context/filters";
import { CartProvider } from "./context/cartcontext";
import { UserProvider } from "./context/userContext";
import ProtectedRoute from './components/protectedRoute';
import Inicio from './pages/inicio';

function AppContent() {
  const location = useLocation();
  const isAdminPanel = location.pathname.startsWith('/Admin-Panel');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPanel && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Nosotros" element={<Nosotros />} />
          <Route path="/Categorias" element={<Products />} />
          <Route path="/Producto-Info/:id" element={<ProductInfo />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Carrito" element={<Carrito />} />
          <Route path="/Admin-Panel/*" element={<ProtectedRoute element={<AdminPanel />} />} />
        </Routes>
      </div>
      {!isAdminPanel && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <UserProvider>
        <FiltersProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </FiltersProvider>
      </UserProvider>
    </Router>
  );
}

export default App;