import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';
import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/HomePage';


function App() {
  return (
    <div className='outfit text-brown bg-img'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/register" element={<SignUpPage />} /> */}
            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          </Routes>
          </BrowserRouter>
        </AuthProvider>
    </div>
  );
}

export default App;
