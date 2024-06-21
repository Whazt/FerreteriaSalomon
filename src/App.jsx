import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Products from "./pages/products";  
import FiltersOpt from "./components/filtersOpt";
import {products as initialProducts} from "./mocks/products.json";
import { useState } from "react";

function useFilter() {
  const [filter, setFilter] = useState({
    category: "all",
    minprice: 0,
  });

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.precio >= filter.minprice && (filter.category === "all" || product.categoria === filter.category)
      )
    })
  }

  return { filterProducts, setFilter }
}


function App() {

  const [products] = useState(initialProducts);
  const { filterProducts, setFilter } = useFilter();

  const filteredProducts = filterProducts(products);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar  />
        <div className="flex-grow">
          <FiltersOpt onChange={setFilter} />
          <Products products={filteredProducts} />
        </div>
        <footer >
          <Footer/>
          
        </footer>
      </div>
    </>
  );
}

export default App;