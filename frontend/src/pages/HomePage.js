import React from "react";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import '../App.css';

const HomePage = () => {

  return (
    <div className="bg-img">
      <div>
        <NavBar/>
      </div>
      <div className="text-center py-5"> 
        <h1>Welcome to LerryLazzyShop</h1>
        <p>Explore our amazing products and start shopping!</p>
      </div>
      <div className="mx-5">      
        <Banner/>
      </div>
    </div>
  );
};

export default HomePage;