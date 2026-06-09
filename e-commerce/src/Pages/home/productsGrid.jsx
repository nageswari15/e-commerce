 import axios from "axios";
 import {useState} from "react";
 import { formatMoney } from "../../utils/money";
 import {Product} from "./product";
 export function ProductsGrid({products, loadCart}) {
    const [quantity, setQuantity] = useState(1);
    return (
         <div className="products-grid">
                {products.map((product) => (
                  
            <Product key={product.id} product={product} loadCart={loadCart}/>
                  
                    
                ))}
              
              </div>
    ); 
}