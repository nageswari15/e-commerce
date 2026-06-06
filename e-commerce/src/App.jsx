
import { HomePage } from './Pages/HomePgae'
import { CheckoutPage } from './Pages/checkout'
import { OrdersPage } from './Pages/OrdersPage'
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {


  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrdersPage />} />
    </Routes>
  )
}

export default App
