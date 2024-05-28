import React from "react";
import NavBar from "../components/NavBar";
import Items from "../components/Item";
import Footer from "../components/Footer";
const Products = () => {
    return (
        <div>
            <NavBar/>
            <div className="container my-5 ">
                <Items/>
            </div>
            <Footer className/>
        </div>
        
    )
 }

export default Products;
