import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-brand">LENLENSHOP</div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div className="nav-link active" aria-current="page"><Link to = "/">HOME</Link></div>
            </li>
            <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                PRODUCTS
              </div>
              <ul className="dropdown-menu">
                <li><div className="dropdown-item"><Link to = "/products">Products</Link></div></li>
                <li><div className="dropdown-item" ><Link to = "/products">Wool</Link></div></li>
                <li><div className="dropdown-item" ><Link to = "/products">Material</Link></div></li>
                <li><div className="dropdown-item" ><Link to = "/products">Set</Link></div></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-secondary" type="submit">Search</button>
          </form>
          <div className='nav-item px-3'><Link to= "/login">Account</Link></div>
          <div className='nav-item px-3'><Link to= "/cart">Cart</Link></div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;




