import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'
import { Header } from './components/header/header'
import { ProductPage } from './pages/Product'
import { AddProduct } from './pages/AddProduct'
import { NoAuthRequired, RequireAuth } from './utils/routeProtection'
import { Cart } from './pages/cart'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NoAuthRequired />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route element={<Header />}>
            <Route path="/home" element={<Home />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/product/add" element={<AddProduct />} />
            <Route path="/product/edit/:productId" element={<AddProduct />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}