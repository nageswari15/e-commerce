import { useState, useEffect } from 'react'
import axios from 'axios'

import { HomePage } from './Pages/home/HomePgae'
import { CheckoutPage } from './Pages/checkout/checkout'
import { OrdersPage } from './Pages/orders/OrdersPage'
import { Tracking } from './Pages/tracking/Tracking'
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {
 const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product');
    setCart(response.data);
  }

useEffect(() => {

  loadCart();
}, [])

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} loadCart={loadCart}/>} />
      <Route path="/checkout" element={<CheckoutPage  cart={cart} loadCart={loadCart}/>} />
      <Route path="/orders" element={<OrdersPage  cart={cart}/>} />
      <Route path="/tracking/:orderId" element={<Tracking cart={cart}/>} />
    </Routes>
  )
}

export default App
