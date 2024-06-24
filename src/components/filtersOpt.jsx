import { useId } from "react";
import { useFilters } from "../hooks/useFilters";

function FiltersOpt() {
  const { filters, setFilters } = useFilters();

  const minpriceFilterId = useId();
  const categoryFilterId = useId();
  const maxpriceFilterId = useId();

  const handleChangeMinprice = (e) => {
    const newMinprice = Math.min(e.target.value, filters.maxprice - 1);
    setFilters((prevState) => ({
      ...prevState,
      minprice: newMinprice,
    }));
  };

  const handleChangeMaxprice = (e) => {
    const newMaxprice = Math.max(e.target.value, filters.minprice + 1);
    setFilters((prevState) => ({
      ...prevState,
      maxprice: newMaxprice,
    }));
  };

  const handleChangeCategory = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      category: e.target.value,
    }));
  };

  return (
    <section className="flex flex-col md:flex-row gap-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-start w-full">
        <label htmlFor={minpriceFilterId} className="mb-2 font-semibold text-gray-700">
          Precio a partir de:
        </label>
        <div className="w-full p-2 border border-gray-300 rounded-lg">
          <input
            type="range"
            id={minpriceFilterId}   
            min="0"
            max="20000"
            onChange={handleChangeMinprice}
            value={filters.minprice}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>
        <span className="text-orange-500 self-center block mt-1">{filters.minprice}</span>
      </div>
      <div className="flex flex-col items-start w-full">
        <label htmlFor={maxpriceFilterId} className="mb-2 font-semibold text-gray-700">
          Precio menor a:
        </label>
        <div className="w-full p-2 border border-gray-300 rounded-lg">
          <input
            type="range"
            id={maxpriceFilterId}
            min="0"
            max="20000"
            onChange={handleChangeMaxprice}
            value={filters.maxprice}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>
        <span className="text-orange-500 self-center block mt-1">{filters.maxprice}</span>
      </div>
      <div className="flex flex-col items-start w-full">
        <label htmlFor={categoryFilterId} className="mb-2 font-semibold text-gray-700">
          Categoría
        </label>
        <select
          id={categoryFilterId}
          name="category"
          onChange={handleChangeCategory}
          className="p-2 border border-gray-300 rounded-lg w-full"
        >
          <option value="all">Todas</option>
          <option value="hmanual">Herramientas Manuales</option>
          <option value="helectrica">Herramientas Eléctricas</option>
          <option value="font">Fontanería</option>
          <option value="pint">Pintura</option>
          <option value="construccion">Construcción</option>
        </select>
      </div>
    </section>
  );
}

export default FiltersOpt;
