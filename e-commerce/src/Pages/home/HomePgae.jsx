import axios from 'axios';
import {useEffect,useState} from 'react';
import './HomePage.css';
import {Header} from '../../components/Header';

import {ProductsGrid} from './productsGrid';

import { Link } from 'react-router-dom';
 
 export function HomePage({cart, loadCart}) {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
   
    useEffect(() => {
      const timer = setTimeout(() => {
        const getHomeData = async () => {
          try {
            const url = searchTerm 
              ? `/api/products?search=${encodeURIComponent(searchTerm)}`
              : '/api/products';
            const response = await axios.get(url);
            setProducts(response.data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        }
        getHomeData();
      }, 500);

      return () => clearTimeout(timer);
    }, [searchTerm])

    const handleSearch = (term) => {
      setSearchTerm(term);
    };
   

    return (
    <>
    <Header cart={cart} onSearch={handleSearch}/>

    <div className="home-page">
      <ProductsGrid products={products} loadCart={loadCart}/>
    </div>
    </>

    );
}