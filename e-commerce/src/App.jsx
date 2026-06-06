
import { HomePage } from './Pages/HomePgae'
import { CheckoutPage } from './Pages/checkout'
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {


  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  )
}

export default App
