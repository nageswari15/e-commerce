
import { HomePage } from './Pages/HomePgae'
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {
 

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
       <Route path="/checkout" element={<div>Test checkout</div>} />
    </Routes>
  )
}

export default App
