import FiltersOpt from "../components/filtersOpt";
import ListProducts from "../components/listProducts";
import { useFilters } from "../hooks/useFilters";
import {products as initialProducts} from "../mocks/products.json";




function Products() {
  
  
  const { filterProducts} = useFilters();

  const filteredProducts = filterProducts(initialProducts);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <FiltersOpt />
        <ListProducts products={filteredProducts} />
      </div>
    </>

  );
}

export default Products;
