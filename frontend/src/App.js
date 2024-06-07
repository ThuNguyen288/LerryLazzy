import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Alert from './components/Alert';
import Cart from './components/Cart';
import Order from './components/Order';
import Profile from './components/Profile';
import WishList from './components/WishList';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';
import Account from './pages/Account';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import HomePage from './pages/HomePage';
import ProductInfo from './pages/ProductInfo';
import ProductPage from './pages/ProductPage';
import ChangePassword from './components/ChangePassword';
import ForgotPassword from './pages/auth/ForgotPassword';

function App() {
  const [errorMessage, updateErrorMessage] = useState(null);

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
            <Route path="/account/:username" element={<PrivateRoute><Account/></PrivateRoute>} />
            <Route path="order" element={<PrivateRoute><Order/></PrivateRoute>} />
            <Route path="wishlist" element={<WishList/>} />
            <Route path="cart" element={<Cart/>} />
            <Route path="profile" index element={<Profile/>} />
            <Route path="changepassword" element={<ChangePassword/>} />
          </Routes>
          <Alert errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
