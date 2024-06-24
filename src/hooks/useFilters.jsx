import { useContext } from "react";
import { FiltersContext } from "../context/filters";

export function useFilters() {
    const { filters, setFilters } = useContext(FiltersContext);
  
    const filterProducts = (products) => {
      return products.filter((product) => {
        return (
          product.precio >= filters.minprice && filters.maxprice >= product.precio && (filters.category === "all" || product.categoria === filters.category)
        )
      })
    }
  
    return {filters, filterProducts, setFilters }
  }