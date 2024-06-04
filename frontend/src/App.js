import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Address from './components/Address';
import Alert from './components/Alert';
import Order from './components/Order';
import PaymentMethod from './components/PaymentMethod';
import PersonalInfo from './components/PersonalInfo';
import WishList from './components/WishList';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';
import Account from './pages/Account';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
  const [errorMessage, updateErrorMessage] = useState(null);

  return (
    <div className='outfit text-brown bg-img'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:category" element={<ProductPage />} />
            <Route path="/product/product/:subcategory" element={<ProductPage />} />
            <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/account/*" element={<PrivateRoute><Account/></PrivateRoute>} />
            <Route path="order" element={<PrivateRoute><Order/></PrivateRoute>} />
            <Route path="wishlist" element={<WishList/>} />
            <Route path="address" element={<Address/>} />
            <Route path="info" element={<PersonalInfo/>} />
            <Route path="payment" element={<PaymentMethod/>} />
          </Routes>
          <Alert errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
