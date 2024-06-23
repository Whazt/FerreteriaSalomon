import { useParams } from "react-router-dom";
import {products} from "../mocks/products.json";



function ProductInfo() {
    const {id} = useParams();
    const product = products.find(product => product.id === id);
    console.log(id);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <h1>{product.titulo}</h1>
            <img src={product.imagen} alt="product image" className="w-20 h-20" />
            <p>C$ {product.precio}</p>
            <p>{product.marca}</p>
            <p>{product.descripcion}</p>
            <ul>
                {product.valoraciones.map(valoracion => 
                <li 
                    key={valoracion}
                >{valoracion}
                </li>)}
            </ul>
        </div>
    )
}

export default ProductInfo