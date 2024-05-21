import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserInfoPage from './pages/UserInfoPage';

function App() {
  return (
    <div className=''>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/userinfo" element={<UserInfoPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
