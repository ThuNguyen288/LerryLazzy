import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';
import Login from './pages/auth/Login';
import HomePage from './pages/HomePage';
import Register from './pages/auth/Register';
import ProductPage from './pages/ProductPage';
import Account from './pages/Account';
import Order from './components/Order';
import WishList from './components/WishList';
import PaymentMethod from './components/PaymentMethod';
import PersonalInfo from './components/PersonalInfo';
import Address from './components/Address';
function App() {
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
            <Route path="/private" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/account/*" element={<Account/>} />
              <Route path="order" element={<Order/>} />
              <Route path="wishlist" element={<WishList/>} />
              <Route path="address" element={<Address/>} />
              <Route path="info" element={<PersonalInfo/>} />
              <Route path="payment" element={<PaymentMethod/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
