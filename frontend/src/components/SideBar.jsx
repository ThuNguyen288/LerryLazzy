import { ChevronRightIcon } from '@primer/octicons-react'
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import '../App.css'
    
const SideBar = () => {
    const [iframeUrl, setIframeUrl] = useState(() => {
        const storedUrl = localStorage.getItem('currentUrl')
        return storedUrl ? storedUrl : "/profile"
    })

    useEffect(() => {
        localStorage.setItem('currentUrl', iframeUrl)
      }, [iframeUrl])

    const handleLinkClick = (url) => {
        setIframeUrl(url)
    }

    return(
       <div className="sidebar">
            <div className="w-25 float-start">
                <div className="d-flex flex-column h-100 text-white bg-transparent">
                    <Link to="profile" className="text-decoration-none text-brown link align-items-center justify-content-center" onClick={() => handleLinkClick("/profile")}>
                        <button className="sidebar-item">
                            Profile
                            <span><ChevronRightIcon className='float-end icon mt-1' size={16} /></span>
                        </button>
                    </Link>
                    <Link to="cart" className="text-decoration-none text-brown link" onClick={() => handleLinkClick("/cart")}>
                        <button className="sidebar-item">
                            Cart
                            <span><ChevronRightIcon className='float-end icon mt-1' size={16} /></span>
                        </button>
                    </Link>
                    <Link to="favorite" className="text-decoration-none text-brown link" onClick={() => handleLinkClick("/favorite")}>
                        <button className="sidebar-item">
                            Favorite
                            <span><ChevronRightIcon className='float-end icon mt-1' size={16} /></span>
                        </button>
                    </Link>
                    <Link to="order" className="text-decoration-none text-brown link" onClick={() => handleLinkClick("/order")}>
                        <button className="sidebar-item">
                            Order
                            <span><ChevronRightIcon className='float-end icon mt-1' size={16} /></span>
                        </button>
                    </Link>
                    <Link to="changepassword" className="text-decoration-none text-brown link" onClick={() => handleLinkClick("/changepassword")}>
                        <button className="sidebar-item border-b">
                            Change Password
                            <span><ChevronRightIcon className='float-end icon mt-1' size={16} /></span>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="flex-grow-1 px-5 w-75 float-end justify-content-center">
                {iframeUrl && (
                    <iframe
                        src={iframeUrl}
                        title="Content Frame"
                        style={{ width: "90%", height: "600px", border: "none" }}
                        className="mx-5"
                    ></iframe>
                )}
            </div>
       </div>
    )
}
export default SideBar