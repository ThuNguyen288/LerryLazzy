import React from "react";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import '../App.css';
import Footer from "../components/Footer";
import Items from "../components/Item";

const HomePage = () => {

  return (
    <div className="bg-img">
      <div>
        <NavBar/>
      </div>
      <div className="text-center justify-content-center py-5 mx-auto text-darkbrown"> 
        <h1 className="text-100">Welcome to LerryLazzyShop</h1>
        <p className="text-20">Explore our amazing products and start shopping!</p>
      </div>
      <div className="mx-auto">      
        <Banner/>
      </div>
      <div className="mx-auto pb-5 w-80 text-center bg-white">
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