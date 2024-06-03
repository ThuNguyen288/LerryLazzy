import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';
    
    const SideBar = () => {
        const [iframeUrl, setIframeUrl] = useState("");
    
        const handleLinkClick = (url) => {
            setIframeUrl(url);
        }
    return(
       <div>
            <div className="w-25 float-start my-5">
                <div className="d-flex flex-column h-100 p-3 text-white bg-transparent">
                    <div className="sidebar-item">
                        <Link to="order" className="text-decoration-none text-brown" onClick={() => handleLinkClick("/order")}>Order</Link>
                    </div>
                    <div className="sidebar-item">
                        <Link to="wishlist" className="text-decoration-none text-brown" onClick={() => handleLinkClick("/wishlist")}>Wish List</Link>
                    </div>
                    <div className="sidebar-item">
                        <Link to="address" className="text-decoration-none text-brown" onClick={() => handleLinkClick("/address")}>Address</Link>
                    </div>
                    <div className="sidebar-item">
                        <Link to="info" className="text-decoration-none text-brown" onClick={() => handleLinkClick("/info")}>Personal Info</Link>
                    </div>
                    <div className="sidebar-item border-bottom border-secondary">
                        <Link to="payment" className="text-decoration-none text-brown" onClick={() => handleLinkClick("/payment")}>Payment Method</Link>
                    </div>
                </div>
            </div>
            <div className="flex-grow-1 p-3 w-75 float-end justify-content-center">
                {iframeUrl && (
                    <iframe
                        src={iframeUrl}
                        title="Content Frame"
                        style={{ width: "100%", height: "500px", border: "none" }}
                    ></iframe>
                )}
            </div>
       </div>
    )
}
export default SideBar;