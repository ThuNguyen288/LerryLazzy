import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand">Home</div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul className="navbar-nav">
            {/* Nav-bar item*/}
            <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <Link to = "/" >Materials</Link>
              </div>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><div className="dropdown-item" >Kim Moc</div></li>
                <li><div className="dropdown-item">Phu Kien</div></li>
              </ul> 
            </li>    {/* end */} 
            <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <Link to = "/">Products</Link>
              </div>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><div className="dropdown-item" >Chain</div></li>
                <li><div className="dropdown-item">Animal</div></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="nav-item">
              <div className="nav-link" role="button" aria-expanded="false">
                <Link to = "/login">Account</Link>
              </div>
            </div> 
      </div>
    </nav>
  );
};

export default NavBar;




