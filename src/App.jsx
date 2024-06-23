import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Products from "./pages/products";  
import Nosotros from "./pages/nostros";
import ProductInfo from "./pages/productInfo";
import { AdminPanel } from "./pages/adminPanel";
import { FiltersProvider } from "./context/filters";
import { CartProvider } from "./context/cartcontext";
import { UserProvider } from "./context/userContext";
import ProtectedRoute from './components/protectedRoute';

function AppContent() {
  const location = useLocation();
  const isAdminPanel = location.pathname.startsWith('/Admin-Panel');

  if (isAdminPanel) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route path="/Admin-Panel/*" element={<ProtectedRoute element={<AdminPanel />} />} />
          </Routes>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/Nosotros" element={<Nosotros />} />
          <Route path="/Producto-Info/:id" element={<ProductInfo />} />
        </Routes>
      </div>
      <footer>
        <Footer />
      </footer>
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