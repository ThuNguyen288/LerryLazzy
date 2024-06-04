import React from "react";
import "../App.css"
const Search = () => {
    
    return (
        <div className="search-box">
            <input type="search" placeholder="Search..." className="search-input"/>
            <button><i className="fas fa-search"></i></button>
        </div>
    )
}

export default Search;