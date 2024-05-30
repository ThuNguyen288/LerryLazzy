import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';
import Login from './pages/auth/Login';
import HomePage from './pages/HomePage';
import Register from './pages/auth/Register';


function App() {
  return (
    <div className='outfit text-brown bg-img'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          </Routes>
          </BrowserRouter>
        </AuthProvider>
    </div>
  );
}

export default App;
