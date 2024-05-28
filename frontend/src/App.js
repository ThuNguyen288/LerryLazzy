import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Products from './pages/Products';
import Cart from './pages/Cart';

function App() {
  return (
    <div className='outfit text-brown bg-img'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/products" element ={<Products/>}/>
          <Route path="/cart" element ={<Cart/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
