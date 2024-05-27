import React from "react";
import NavBar from "../components/NavBar";
import Items from "../components/Item";
const Products = () => {
    return (
        <div>
            <NavBar/>
            <div className="container mt-5">
                <Items/>
            </div>
        </div>
        
    )
 }

export default Products;
