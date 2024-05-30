import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import logo from "../images/Logo.png";
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const {isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top w-100 menu bg-white">
      <div className="container-fluid">
        <div className="navbar-brand w-25 ml-30 mr-0 w-auto">
          <Link to="/" className='text-brown'>
          <img src={logo} alt="logo" className="logo" />
          </Link>
        </div>
        <div className='space'></div>
        <div className="collapse navbar-collapse mx-0" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 text-center mx-auto d-flex justify-content-center w-50">
            <li className="nav-item">
              <div className="text-black mx-3">
                <Link to="/" className='text-brown'>HOME</Link>
              </div>
            </li>
            <li className='nav-item'>
              <div className="text-black mx-3">
                <Link to="/product?categoryid" className='text-brown'>WOOL</Link>
              </div>
            </li>
            <li className="dropdown">
              <div className="nav-item text-black mx-3 dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <Link to="/product?categoryid" className='text-brown'>PRODUCT</Link>
              </div>
              <ul className="dropdown-menu">
                <li className="dropdown-item"><Link to="/product?subcategoryid" className='text-brown'>Animal</Link></li>
                <li className="dropdown-item"><Link to="/product?subcategoryid" className='text-brown'>Plant</Link></li>
                <li className="dropdown-item"><Link to="/product?subcategoryid" className='text-brown'>Food</Link></li>
                <li className="dropdown-item"><Link to="/product?subcategoryid" className='text-brown'>Cloth</Link></li>
                <li className="dropdown-item"><Link to="/product?subcategoryid" className='text-brown'>Accessory</Link></li>
                <li className="dropdown-item"><Link to="/product?subcategoryid" className='text-brown'>Mochi</Link></li>
                <li className="dropdown-item"><Link to="/product?subcategoryid" className='text-brown'>Other</Link></li>
              </ul>
            </li>
            <li className='nav-item'>
              <div className="text-black mx-3">
                <Link to="/product?categoryid" className='text-brown'>MATERIAL</Link>
              </div>
            </li>
            <li className='nav-item'>
              <div className="text-black mx-3">
                <Link to="/product?categoryid" className='text-brown'>TOOL</Link>
                </div>
            </li>
          </ul>
          <div className="d-flex ms-auto align-items-center">
            <div className="nav-icon dropdown">
              <FontAwesomeIcon icon={faSearch} className="text-brown mx-2" role="button" data-bs-toggle="dropdown" aria-expanded="false" />
            </div>
            {isAuthenticated ? (
              <>
                <div className="nav-icon d-flex">
                  <Link to="/cart">
                    <FontAwesomeIcon icon={faShoppingCart} className="text-brown mx-2" />
                  </Link>
                </div>
                <div className="nav-icon d-flex dropdown">
                  <div className="text-black" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FontAwesomeIcon icon={faUser} className="text-brown mx-2" />
                  </div>
                  <ul className="dropdown-menu">
                      <li className="dropdown-item"><Link to="/user?userid" className='text-brown'>Profile</Link></li>
                      <li className="dropdown-item"><Link to="/user?userid" className='text-brown'>Change password</Link></li>
                      <li className="dropdown-item" onClick={handleLogout}>Sign out</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className='nav-icon d-flex'>
                  <button><Link to="/login" className='text-brown'>Log In</Link></button>
                </div>
                <div className='nav-icon d-flex'>
                  <button><Link to="/register" className='text-brown'>Sign Up</Link></button>
                </div>
              </>
            )}
            <div className='spacex'></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
