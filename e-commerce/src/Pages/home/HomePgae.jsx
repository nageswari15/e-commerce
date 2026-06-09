import axios from 'axios';
import {useEffect,useState} from 'react';
import './HomePage.css';
import {Header} from '../../components/Header';

import {ProductsGrid} from './productsGrid';

import { Link } from 'react-router-dom';
 
 export function HomePage({cart}) {
    const [products, setProducts] = useState([]);
   
    useEffect(() => {
      const getHomeData= async () => {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      }
      getHomeData();
    }, [])
   

    return (
    <>
   
    <Header cart={cart}/>

    <div className="home-page">
     <ProductsGrid products={products}/>
    </div>
    </>

    );
}