import { useState, useEffect } from 'react'
import axios from 'axios'

import { HomePage } from './Pages/HomePgae'
import { CheckoutPage } from './Pages/checkout'
import { OrdersPage } from './Pages/OrdersPage'
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {
 const [cart, setCart] = useState([]);
useEffect(() => {
    axios.get('/api/cart-items?expand=product')
     .then((response) => {
        setCart(response.data);
     });
}, [])

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} />} />
      <Route path="/checkout" element={<CheckoutPage  cart={cart}/>} />
      <Route path="/orders" element={<OrdersPage />} />
    </Routes>
  )
}

export default App
