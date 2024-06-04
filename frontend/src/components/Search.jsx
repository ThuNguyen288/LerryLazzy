import React from "react";
import "../App.css"
const Search = () => {
    return (
        <div className="justify-content-center search-box ">
            <input type="text" placeholder="Search..." className="border-none btn bg-trans "/>
            <button><i className="fas fa-search"></i></button>
        </div>
    )
}

export default Search;