import React from "react";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import '../App.css';
import Footer from "../components/Footer";
import Items from "../components/Item";

const HomePage = () => {

  return (
    
    <div className="bg-img bg-1">
      <NavBar/>
      <Banner/>
      <div className="mx-auto mb-5 pb-5 w-80 text-center bg-white">
        <h1 className="my-5 text-100">Hot Items</h1>
        <Items/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default HomePage;