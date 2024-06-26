import { useEffect, useState } from "react";
import FiltersOpt from "../components/filtersOpt";
import ListProducts from "../components/listProducts";
import { useFilters } from "../hooks/useFilters";
import { products as initialProducts } from "../mocks/products.json";

function Products() {
  
  const { filterProducts } = useFilters();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      
      localStorage.setItem("products", JSON.stringify(initialProducts));
      setProducts(initialProducts);
    }
  }, []);

  const filteredProducts = filterProducts(products);

  return (
    <div className="min-h-screen flex flex-col">
      <FiltersOpt />
      <ListProducts products={filteredProducts} />
    </div>
  );
}

export default Products;
