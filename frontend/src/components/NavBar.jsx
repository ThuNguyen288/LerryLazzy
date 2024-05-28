import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from "../images/Logo(without backgound).png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-5 w-100">
      <div className="container-fluid">
        <div className="navbar-brand w-25">
          <img src={logo} alt="logo" className="w-50" />
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 text-center mx-auto d-flex justify-content-center w-50">
            <li className="nav-item">
              <div className="nav-link"><Link to="/">HOME</Link></div>
            </li>
            <li className='nav-item'>
              <div className="nav-link"><Link to="/">WOOL</Link></div>
            </li>
            <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                PRODUCTS
              </div>
              <ul className="dropdown-menu">
                <li><div className="dropdown-item"><Link to="/products">Products</Link></div></li>
                <li><div className="dropdown-item"><Link to="/products">Wool</Link></div></li>
                <li><div className="dropdown-item"><Link to="/products">Material</Link></div></li>
                <li><div className="dropdown-item"><Link to="/products">Set</Link></div></li>
              </ul>
            </li>
            <li className='nav-item'>
              <div className="nav-link"><Link to="/">MATERIAL</Link></div>
            </li>
            <li className='nav-item'>
              <div className="nav-link"><Link to="/">TOOL</Link></div>
            </li>
          </ul>
          <div className="d-flex align-items-center w-25">
            <div className="nav-item dropdown">
              <FontAwesomeIcon icon={faSearch} className="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false" />
              <ul className="dropdown-menu w-100">
                <form className="d-flex w-100" role="search">
                  <input className="form-control me-2 w-100" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-secondary" type="submit">Search</button>
                </form>
              </ul>
            </div>
            <div className="nav-item d-flex px-2">
              <Link to="/login">
                <FontAwesomeIcon icon={faUser} className="nav-link" />
              </Link>
            </div>
            <div className="nav-item d-flex px-2">
              <Link to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} className="nav-link" />
              </Link>
            </div>
            <div className="nav-item d-flex px-2">
              <Link to="/cart">
                <FontAwesomeIcon icon={faHeart} className="nav-link" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
