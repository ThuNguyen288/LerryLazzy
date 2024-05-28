import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from "../images/Logo(without backgound).png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <nav className="text-20 navbar navbar-expand-lg bg-5 w-100">
      <div className="container-fluid">
        <div className="navbar-brand w-25 ml-50 mr-0 w-auto">
          <img src={logo} alt="logo" className="w-50" />
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mx-0" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 text-center mx-auto d-flex justify-content-center w-50">
            <li className="nav-item">
              <div className="text-brown mx-5"><Link to="/" className='text-brown'>HOME</Link></div>
            </li>
            <li className='nav-item'>
              <div className="text-brown mx-5"><Link to="/" className='text-brown'>WOOL</Link></div>
            </li>
            <li className="nav-item dropdown">
              <div className="text-brown mx-5 dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                PRODUCTS
              </div>
              <ul className="dropdown-menu">
                <li><div className="dropdown-item"><Link to="/products" className='text-brown'>Products</Link></div></li>
                <li><div className="dropdown-item"><Link to="/products" className='text-brown'>Wool</Link></div></li>
                <li><div className="dropdown-item"><Link to="/products" className='text-brown'>Material</Link></div></li>
                <li><div className="dropdown-item"><Link to="/products" className='text-brown'>Set</Link></div></li>
              </ul>
            </li>
            <li className='nav-item'>
              <div className="mx-5"><Link to="/" className='text-brown'>MATERIAL</Link></div>
            </li>
            <li className='nav-item'>
              <div className="mx-5"><Link to="/" className='text-brown'>TOOL</Link></div>
            </li>
          </ul>
          <div className="d-flex ms-auto align-items-center">
            <div className="nav-item dropdown">
              <FontAwesomeIcon icon={faSearch} className="text-brown mx-3 text-25" role="button" data-bs-toggle="dropdown" aria-expanded="false" />
              <ul className="dropdown-menu border border-0 bg-transparent">
                <li className='search bg-white rounded-pill'>
                  <form className="d-flex mx-auto rounded" role="search">
                    <div className="input-group rounded">
                      <span className="input-group-text border-0 bg-white" id="search-addon">
                        <FontAwesomeIcon icon={faSearch} className="text-brown" />
                      </span>
                      <input type="search" className="form-control border-0 mx-2" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                    </div>
                  </form>
                </li>
              </ul>
            </div>
            <div className="nav-item d-flex px-2">
              <Link to="/login">
                <FontAwesomeIcon icon={faUser} className="text-brown mx-3 text-25" />
              </Link>
            </div>
            <div className="nav-item d-flex px-2">
              <Link to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} className="text-brown mx-3 text-25" />
              </Link>
            </div>
            <div className="nav-item d-flex px-2">
              <Link to="/wishlist">
                <FontAwesomeIcon icon={faHeart} className="text-danger mx-3 text-25" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
