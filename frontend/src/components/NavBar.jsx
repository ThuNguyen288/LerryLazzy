import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from "../images/Logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top w-100 menu bg-white">
      <div className="container-fluid">
        <div className="navbar-brand w-25 ml-30 mr-0 w-auto">
          <Link to="/" className='text-brown'>
          <img src={logo} alt="logo" className="logo" />
          </Link>
        </div>
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}
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
              <FontAwesomeIcon icon={faSearch} className="text-brown mx-3" role="button" data-bs-toggle="dropdown" aria-expanded="false" />
              {/* <ul className="dropdown-menu border border-0 bg-transparent">
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
              </ul> */}
            </div>
            <div className="nav-icon d-flex dropdown">
              <div className="text-black" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <FontAwesomeIcon icon={faUser} className="text-brown mx-2" />
              </div>
              <ul className="dropdown-menu">
                  <li className="dropdown-item"><Link to="/user?userid" className='text-brown'>Profile</Link></li>
                  <li className="dropdown-item"><Link to="/user?userid" className='text-brown'>Change password</Link></li>
                  <li className="dropdown-item"><Link to="/login" className='text-brown'>Sign out</Link></li>
              </ul>
            </div>
            <div className="nav-icon d-flex">
              <Link to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} className="text-brown mx-2" />
              </Link>
            </div>
            <div className='spacex'></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
