import { useState } from "react";

function FiltersOpt( {onChange} ){
    const [minprice, setMinprice] = useState(0);

    const handleChangeMinprice = (e) => {
        setMinprice(e.target.value);
        onChange(prevState =>  ({
            ...prevState, 
            minprice: e.target.value
        }))
    }

    const handleChangeCategory = (e) => {
        onChange(prevState =>  ({ 
            ...prevState, 
            category: e.target.value
        }))
    }




    return (
        <section className="filters">
            <div>
                <label htmlFor='price' className="label">Precio a partir de: </label>
                <input 
                    type="range"
                    id="price" 
                    name="price" 
                    min="0" 
                    max="20000" 
                    onChange={handleChangeMinprice}
                />
                <span className="text-orange-500">{minprice}</span>
            </div>
            <div>
                <label htmlFor="category" className="label">Categoria</label>
                <select id="category" name="category" onChange={handleChangeCategory}>
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