import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'

import HomePage from './pages/HomePage'
import Account from './pages/Account'
import ProductInfo from './pages/ProductInfo'
import ProductPage from './pages/ProductPage'

import Cart from './pages/Cart'
import Order from './pages/Order'
import Profile from './pages/Profile'
import WishList from './pages/Favorite'
import ChangePassword from './pages/ChangePassword'

import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './context/PrivateRoute'

import './App.css'
import Notifications from './pages/Notificaton'

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
            <Route path="/order" element={<PrivateRoute><Order/></PrivateRoute>} />
            <Route path="/favorite" element={<PrivateRoute><WishList/></PrivateRoute>} />
            <Route path="/cart" element={<PrivateRoute><Cart/></PrivateRoute>} />
            <Route path="/profile"element={<PrivateRoute><Profile/></PrivateRoute>} />
            <Route path="/changepassword" element={<PrivateRoute><ChangePassword/></PrivateRoute>} />
            <Route path="/notification" element={<PrivateRoute><Notifications/></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
