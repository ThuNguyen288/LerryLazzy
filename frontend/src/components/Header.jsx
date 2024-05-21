import React from "react";
import { Link } from "react-router-dom";
import "../App.css"
const Header =() => {
    return(
        <div className="App-header">
            <div className="float-end d-block">
                <nav className="fs-5">
                    <Link to = "/login" className="text-white p-3 fs-5">Account</Link>
                    <Link to = "/contact" className="text-white p-3 ">Contact</Link>
                    <Link to = "/about" className="text-white p-3">About</Link>
                    <Link to = "/cart" className="text-white p-3">Cart</Link>
                    <Link to = "/wishlish" className="text-white p-3">Wishlist</Link>
                </nav>
                <div className="text-secondary fs-1 ">
                    logo
                </div>
            </div>
        </div>
    )
}
export default Header