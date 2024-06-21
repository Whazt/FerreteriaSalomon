import FiltersOpt from "../components/filtersOpt";
import ListProducts from "../components/listProducts";
import {products as initialProducts} from "../mocks/products.json";
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



function Products() {
  
  const [products] = useState(initialProducts);
  const { filterProducts, setFilter } = useFilter();

  const filteredProducts = filterProducts(products);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <FiltersOpt onChange={setFilter} />
        <ListProducts products={filteredProducts} />
      </div>
    </>

  );
}

export default Products;
