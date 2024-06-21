import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Products from "./pages/products";  
import products from "./mocks/products.json";
function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar  />
        <div className="flex-grow">
          <Products products={products} />
        </div>
        <footer >
          <Footer/>
        </footer>
      </div>
    </>
  );
}

export default App;