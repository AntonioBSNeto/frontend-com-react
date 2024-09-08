import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'
import { Header } from './components/header/header'
import { ProductPage } from './pages/Product'
import { AddProduct } from './pages/AddProduct'

export default function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Header />}>
          <Route path="/home" element={<Home />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/product/add" element={<AddProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}