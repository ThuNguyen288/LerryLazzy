// import React from "react";
// import { Link, Outlet } from "react-router-dom";
// import '../App.css'
// const Account = () => {
//     return(
//         <div>
//             <h3 className="text-center p-5">Account</h3>
//             <div className="w-25">
//                 <div className="d-flex flex-column h-100 p-3 text-white bg-transparent">
//                     <div className="sidebar-item">
//                         <Link to="order" className="text-decoration-none text-brown">Order</Link>
//                     </div>
//                     <div className="sidebar-item">
//                         <Link to="/account/wishlist" className="text-decoration-none text-brown">Wish List</Link>
//                     </div>
//                     <div className="sidebar-item">
//                         <Link to="/account/address" className="text-decoration-none text-brown">Address</Link>
//                     </div>
//                     <div className="sidebar-item"> 
//                         <Link to="/account/address" className="text-decoration-none text-brown">Address</Link>
//                     </div>
//                     <div className="sidebar-item border-bottom border-secondary ">
//                         <Link to="/account/payment" className="text-decoration-none text-brown">Payment Method</Link>
//                     </div>
//                 </div>
                
//                 <Outlet/>
//         </div>
//         </div>
        
//     )
// }

// export default Account;
import React from "react";
import '../App.css';
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const Account = () => {
    return (
        <div>
            <NavBar/>
            <div  className="container">
                <h1 className="text-center p-5">My Account</h1>
                <SideBar/>
            </div>
        </div>
    );
}

export default Account;
