import React from "react";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import Header from "../components/Header";
import '../App.css';

const HomePage = () => {

  return (
    <div>
      <div className="App-header">
        <Header/>
      </div>
      <div>
        <NavBar/>
      </div>
      <div className="text-center"> 
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