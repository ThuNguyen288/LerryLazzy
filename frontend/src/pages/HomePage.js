import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {

  return (
    <div>
      <div>
        <h1>Welcome to LerryLazzyShop</h1>
        <p>Explore our amazing products and start shopping!</p>
      </div>
      <button>
        <Link to = "/login">Account</Link>
      </button>
    </div>
  );
};

export default HomePage;