import React from "react";
import QuantityForm from "../components/Quantity";
import img from "../images/img.jpg"
import "../App.css"
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
const Cart = () => {
    return (
       <div>
            <NavBar/>
            <div className="d-flex">
                <SideBar/>
                <div className=" w-100 cart">
                    <h2 className="text-center my-5">Cart</h2>
                    <table className="w-100 justify-space-between" >
                    <tr className="border-bottom">
                        <td className="">Product</td>
                        <td></td>
                        <td>Price</td>
                        <td>Quantity</td>
                        <td>Subtotal</td>
                    </tr>
                    <tr>
                        <td className=""><img src={img} alt="..." className="w100"/></td>
                        <td>Details</td>
                        <td>Price</td>
                        <td className=""><div><QuantityForm/></div></td>
                        <td>Subtotal</td>
                    </tr>
                    </table>
                </div>
            </div>
            <Footer/>
       </div>
    )
}
export default Cart;