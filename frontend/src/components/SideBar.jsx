import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';
    
    const SideBar = () => {
        const [iframeUrl, setIframeUrl] = useState("/profile");
    
        const handleLinkClick = (url) => {
            setIframeUrl(url);
        }
    return(
       <div className="sidebar">
            <div className="w-25 float-start">
                <div className="d-flex flex-column h-100 p-3 text-white bg-transparent">
                        <Link to="profile" className="text-decoration-none text-brown link" onClick={() => handleLinkClick("/profile")}>
                            <button className="sidebar-item">
                                Profile
                                <span><i className="fas fa-caret-right float-end icon"/></span>
                            </button>
                        </Link>
                        <Link to="cart" className="text-decoration-none text-brown link" onClick={() => handleLinkClick("/cart")}>
                            <button className="sidebar-item">
                                Cart
                                <span><i className="fas fa-caret-right float-end icon"/></span>
                            </button>
                        </Link>
                        <Link to="wishlist" className="text-decoration-none text-brown link" onClick={() => handleLinkClick("/wishlist")}>
                            <button className="sidebar-item">
                                Wish List
                                <span><i className="fas fa-caret-right float-end icon"/></span>
                            </button>
                        </Link>
                        <Link to="order" className="text-decoration-none text-brown link" onClick={() => handleLinkClick("/order")}>
                            <button className="sidebar-item">
                                Order
                                <span><i className="fas fa-caret-right float-end icon"/></span>
                            </button>
                        </Link>
                        <Link to="changepassword" className="text-decoration-none text-brown link" onClick={() => handleLinkClick("/changepassword")}>
                            <button className="sidebar-item border-b">
                                Change Password
                                <span><i className="fas fa-larger-right float-end icon"/></span>
                            </button>
                        </Link>
                </div>
            </div>
            <div className="flex-grow-1 p-3 w-75 float-end justify-content-center">
                {iframeUrl && (
                    <iframe
                        src={iframeUrl}
                        title="Content Frame"
                        style={{ width: "97%", height: "500px", border: "none" }}
                        className="mx-5"
                    ></iframe>
                )}
            </div>
       </div>
    )
}
export default SideBar;