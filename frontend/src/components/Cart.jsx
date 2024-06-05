import React from "react";
import QuantityForm from "./Quantity";
import img from "../images/img.jpg"
import "../App.css"
const Cart = () => {
    return (
        <div className=" w-100 cart">
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
    )
}
export default Cart;