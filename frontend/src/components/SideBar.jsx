import React, { useContext } from 'react'
import { LuCreditCard, LuHeart, LuShoppingBag, LuStar, LuUser, LuBell, LuBadgeHelp, LuBadgeInfo, LuLogOut, LuMapPin } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './SideBar.scss'

    
const SideBar = () => {
    const { logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
        window.location.href='/'
    }

    return(
        <div className='offcanvas-body d-block pb-lg-0'>
            <div className='cart-header topic'>Dashboard</div>
            <nav className='list-group list-group-borderless mt-1'>
                <Link to='/order' className='list-group-item list-group-item-action d-flex align-items-center'>
                    <LuShoppingBag className='fs-base opacity-75 me-2'/>Order
                    <span className='badge rounded-pill ms-auto'>1</span>
                </Link>
                <Link to='/favorite' className='list-group-item list-group-item-action d-flex align-items-center'>
                    <LuHeart className='fs-base opacity-75 me-2'/>Favorite
                </Link>
                <Link to='#' className='list-group-item list-group-item-action d-flex align-items-center'>
                    <LuCreditCard className='fs-base opacity-75 me-2'/>Payment method
                </Link>
                <Link to='#' className='list-group-item list-group-item-action d-flex align-items-center'>
                    <LuStar className='fs-base opacity-75 me-2'/>My review
                </Link>
            </nav>
            <div className='cart-header topic mt-3'>Manage account</div>
            <nav className='list-group list-group-borderless mt-1'>
                <Link to='/profile' className='list-group-item list-group-item-action d-flex align-items-center'>
                    <LuUser className='fs-base opacity-75 me-2'/>Personal info
                </Link>
                <Link to='#' className='list-group-item list-group-item-action d-flex align-items-center'>
                    <LuMapPin className='fs-base opacity-75 me-2'/>Address
                </Link>
                <Link to='/notification' className='list-group-item list-group-item-action d-flex align-items-center'>
                    <LuBell className='fs-base opacity-75 me-2'/>Notification
                </Link>
            </nav>
            <div className='cart-header topic mt-3'>Customer service</div>
            <nav className='list-group list-group-borderless mt-1'>
                <Link to='#' className='list-group-item list-group-item-action d-flex align-items-center'>
                    <LuBadgeHelp className='fs-base opacity-75 me-2'/>Help center
                </Link>
                <Link to='#' className='list-group-item list-group-item-action d-flex align-items-center'>
                    <LuBadgeInfo className='fs-base opacity-75 me-2'/>Terms and conditions
                </Link>
            </nav>
            <nav className='list-group list-group-borderless pt-3'>
                <Link className='list-group-item list-group-item-action d-flex align-items-center border-none' onClick={handleLogout}>
                    <LuLogOut className='fs-base opacity-75 me-2'/>Logout
                </Link>
            </nav>
            
            
            {/* <div className=''>Shopping</div>
            <button className='sidebar-item'>
                <i className='fas fa-list icon'/>
                <Link to='/order' className='link'>Order</Link>
                <span className='badge text-white bg-danger me-2 mt-1 float-end rounded-circle '>4</span>
            </button>
            <button className='sidebar-item'>
                <i className='fas fa-shopping-cart icon'/>
                <Link to='/cart' className='link'>Cart</Link>
            </button>
            <button className='sidebar-item'>
                <i className='fas fa-heart icon'/>
                <Link to='/wishlist' className='link'>Wish List</Link>
            </button>
            <div className=''>Manage Account</div>
            <button className='sidebar-item'>
                <i className='fas fa-user icon'/>
                <Link to='/profile/:username' className='link'>Personal Info</Link>
            </button>
            <button className='sidebar-item'>
            <i className='fas fa-key icon'/>
                <Link to='/changepassword' className='link'>Change Pasword</Link>
            </button>
            <button className='sidebar-item'>
                <i className='fas fa-bell icon'/>
                <Link to='/notification' className='link'>Notification</Link>
            </button> */}
            
        </div>
    )
}
export default SideBar;