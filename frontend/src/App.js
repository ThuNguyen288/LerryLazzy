import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ForgotPassword from './pages/auth/ForgotPassword'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import CartPage from './pages/CartPage'
import ChangePassword from './pages/ChangePassword'
import WishList from './pages/Favorite'
import HomePage from './pages/HomePage'
import Notification from './pages/Notification'
import Order from './pages/Order'
import ProductInfo from './pages/ProductInfo'
import ProductPage from './pages/ProductPage'
import Profile from './pages/Profile'

import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import PrivateRoute from './route/PrivateRoute'

import './App.css'

function App() {
    return (
        <div className='outfit text-brown bg-img'>
            <AuthProvider>
                <CartProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/reset-password' element={<ForgotPassword />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/product/:category' element={<ProductPage />} />
                            <Route path='/product/product/:subcategory' element={<ProductPage />} />
                            <Route path='/product/detail/:productid' element={<ProductInfo />} />
                            <Route path='/home' element={<PrivateRoute><HomePage /></PrivateRoute>} />
                            <Route path='/order' element={<PrivateRoute><Order/></PrivateRoute>} />
                            <Route path='/favorite' element={<PrivateRoute><WishList/></PrivateRoute>} />
                            <Route path='/cart' element={<PrivateRoute><CartPage/></PrivateRoute>} />
                            <Route path='/profile/:username'element={<PrivateRoute><Profile/></PrivateRoute>} />
                            <Route path='/changepassword' element={<PrivateRoute><ChangePassword/></PrivateRoute>} />
                            <Route path='/notification' element={<PrivateRoute><Notification/></PrivateRoute>} />
                        </Routes>
                    </BrowserRouter>
                </CartProvider>
            </AuthProvider>
        </div>
    )
}

export default App
