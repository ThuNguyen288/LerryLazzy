import React from "react";
import Footer from "../components/Footer";
import ItemDetail from "../components/ItemDetail";
import NavBar from "../components/NavBar";
import './ProductPage.scss';


const ProductInfo = () => {
   
    return (
        <div>
            <NavBar />
            <div className="container mt-3"> 
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a className="breadcrumb-link" href="/">Home</a></li>
                    </ol>
                </nav>
            </div>
            <div className="container my-4">
                <ItemDetail/>  
            </div>
            <Footer />
        </div>
    );
};

export default ProductInfo;
