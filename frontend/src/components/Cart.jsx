import React from "react";
import NavBar from "./NavBar";
import QuantityForm from "./Quantity";
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
                <td className="col-5"><img  alt="..." className="col-5"/></td>
                <td>Name</td>
                <td><QuantityForm/></td>
                <td>Price</td>
            </tr>
        </table>
        </div>
    )
}
export default Cart;