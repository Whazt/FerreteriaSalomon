import {useId} from "react";
import { useFilters } from "../hooks/useFilters";

function FiltersOpt(){
    const {filters,  setFilters } = useFilters();
    
    const minpriceFilterId = useId();
    const categoryFilterId = useId();

    const handleChangeMinprice = (e) => {
        setFilters(prevState =>  ({
            ...prevState, 
            minprice: e.target.value
        }))
    }

    const handleChangeCategory = (e) => {
        setFilters(prevState =>  ({ 
            ...prevState, 
            category: e.target.value
        }))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor={minpriceFilterId} className="label">Precio a partir de: </label>
                <input 
                    type="range"
                    id={minpriceFilterId}
                    min="0" 
                    max="20000" 
                    onChange={handleChangeMinprice}
                    value={filters.minprice}
                />
                <span className="text-orange-500">{filters.minprice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId} className="label">Categoria</label>
                <select id={categoryFilterId} name="category" onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="hmanual">Herramientas Manuales</option>
                    <option value="helectrica">Herramientas Electricas</option>
                    <option value="font">Fontanería</option>
                    <option value="pint">Pintura</option>
                    <option value="construccion">Construcción</option>
                </select>
            </div>
        </section>
    )
}

export default FiltersOpt;