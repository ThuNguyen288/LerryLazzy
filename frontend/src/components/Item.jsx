import React from "react";
import item from "../images/img.jpg"
const Items =() => {
    return(
        <div className="row row-cols-1 row-cols-md-4 g-4">
            {/* chạy if */}
            <div className="col">
                <div className="card h-100">
                <img src={item} className="card-img-top container" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">Name</h5>
                    <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                </div>
            </div>
            {/* Hết if */}
        </div>
    )
}

export default Items;