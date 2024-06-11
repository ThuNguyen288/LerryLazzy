import React from "react"
import { Link } from "react-router-dom"
import '../App.css'
    
const SideBar = () => {
    return(
        <div className="sidebar w-20 bg-g text-white p-3 me-5">
            <h5 className=''>Shopping</h5>
            <button className='sidebar-item'>
                <i className='fas fa-list icon'/>
                <Link to="/order" className='link'>Order</Link>
                <span className="badge text-white bg-danger me-2 mt-1 float-end rounded-circle ">4</span>
            </button>
            <button className='sidebar-item'>
                <i className='fas fa-shopping-cart icon'/>
                <Link to="/cart" className='link'>Cart</Link>
            </button>
            <button className='sidebar-item'>
                <i className='fas fa-heart icon'/>
                <Link to="/wishlist" className='link'>Wish List</Link>
            </button>
            <h5 className=''>Manage Account</h5>
            <button className='sidebar-item'>
                <i className='fas fa-user icon'/>
                <Link to="/profile/:username" className='link'>Personal Info</Link>
            </button>
            <button className='sidebar-item'>
            <i className='fas fa-key icon'/>
                <Link to="/changepassword" className='link'>Change Pasword</Link>
            </button>
            <button className='sidebar-item'>
                <i className='fas fa-bell icon'/>
                <Link to="/notification" className='link'>Notification</Link>
            </button>
            
        </div>
    )
}
export default SideBar;