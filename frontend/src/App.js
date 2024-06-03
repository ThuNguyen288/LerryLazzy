import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';
import Login from './pages/auth/Login';
import HomePage from './pages/HomePage';
import Register from './pages/auth/Register';
import ProductPage from './pages/ProductPage';
import ProductInfo from './pages/ProductInfo';

function App() {
  return (
    <div className='outfit text-brown bg-img'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <HomePage/> }/>
            <Route path="/login" element={ <Login/> }/>
            <Route path="/register" element={ <Register/> }/>
            <Route path="/product/:category" element={ <ProductPage/> } />
            <Route path="/product/product/:subcategory" element={ <ProductPage/> }/>
            <Route path="/product/:categoryid/:subcategoryid/:productid" element={ <ProductInfo/> }/>
            <Route path="/private" element={ <PrivateRoute><HomePage/></PrivateRoute> }/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
