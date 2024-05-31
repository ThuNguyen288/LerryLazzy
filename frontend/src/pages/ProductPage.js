import React from "react";
import Footer from "../components/Footer";
import Item from "../components/Item";
import NavBar from "../components/NavBar";

const ProductPage = () => {
    return (
        <div>
            <NavBar/>
            <div className="container my-5 ">
                <Item/>
            </div>
            <Footer/>
        </div>
        
    )
}

export default ProductPage;
