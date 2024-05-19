import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import UserInfoPage from './components/UserInfoPage';

function App() {
  return (
    <div>
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
