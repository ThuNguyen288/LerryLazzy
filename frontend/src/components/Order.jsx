import React from "react";
import img from "../images/img.jpg";
import "../App.css";

const Order = () => {
    return (
        <div className="text-brown m-5 border border-secondary px-5">
            <div className="d-flex justify-content-between bg-grey mx-auto mb-3 mt-5">
                <div className="d-block px-3 py-2">
                    <h6>Order no:</h6>
                    <p>000000</p>
                </div>
                <div className="d-block px-3 py-2">
                    <h6>Shipped Date:</h6>
                    <p>23/12/2024</p>
                </div>
                <div className="d-block px-3 py-2">
                    <h6>Status:</h6>
                    <p>Awaiting delivery</p>
                </div>
                <div className="d-block px-3 py-2">
                    <h6>Order Amount:</h6>
                    <p>1.5$</p>
                </div>
            </div>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="d-flex">
                    <div className="d-block mr-2">
                        <img src={img} alt="" className="miniImg" />
                    </div>
                    <div className="d-block mx-2">
                        <img src={img} alt="" className="miniImg" />
                    </div>
                    <div className="d-block mx-2">
                        <img src={img} alt="" className="miniImg" />
                    </div>
                </div>
                <div className="d-flex">
                    <button className="my-4 btn btn-transparent border p-3 mx-2">Order Detail</button>
                    <button className="my-4 btn btn-transparent border p-3 ml-2">Track Order</button>
                </div>
            </div>
        </div>
    );
}

export default Order;
