import React from "react";
import NavBar from "../components/NavBar";
import ProImg from "../images/products/products/mochies/Christmas dumpling.png"
import QuantityForm from "../components/Quantity";
const Cart = () => {
    return (
        <div>
            <NavBar/>
            <table className="text-center">
            <tr>
                <td className="col-auto">Product</td>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
            </tr>
            <tr>
                <td className="col-5"><img src= {ProImg} alt="..." className="col-5"/></td>
                <td>Name</td>
                <td><QuantityForm/></td>
                <td>Price</td>
            </tr>
        </table>
        </div>
    )
}
export default Cart;