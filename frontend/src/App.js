import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ForgotPassword from './pages/auth/ForgotPassword'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import AccountPage from './pages/AccountPage'
import CartPage from './pages/CartPage'
import HomePage from './pages/HomePage'
import ProductInfo from './pages/ProductInfo'
import ProductPage from './pages/ProductPage'

import Cart from './components/CartItem'
import ChangePassword from './components/ChangePassword'
import WishList from './components/Favorite'
import Order from './components/Order'
import Profile from './components/Profile'

import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './context/PrivateRoute'

import './App.css'

function App() {
  return (
    <div className='outfit text-brown bg-img'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:category" element={<ProductPage />} />
            <Route path="/product/product/:subcategory" element={<ProductPage />} />
            <Route path="/product/detail/:productid" element={<ProductInfo />} />
            <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/account/:username/*" element={<PrivateRoute><AccountPage/></PrivateRoute>} />
            <Route path="/cart" element={<PrivateRoute><CartPage/></PrivateRoute>} />
            <Route path="order" element={<PrivateRoute><Order/></PrivateRoute>} />
            <Route path="favorite" element={<PrivateRoute><WishList/></PrivateRoute>} />
            <Route path="carto" element={<PrivateRoute><Cart/></PrivateRoute>} />
            <Route path="profile" index element={<PrivateRoute><Profile/></PrivateRoute>} />
            <Route path="changepassword" element={<PrivateRoute><ChangePassword/></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
