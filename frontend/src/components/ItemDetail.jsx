import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { getProductById } from "../services/productService";

import './ItemDetail.scss';

const ItemDetail = () => {
    const { productid } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(productid);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productid]);

    if (loading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="card card-body">
            <div className="container-fluid">
                <div className="wrapper row">
                    <div className="preview col-md-6 my-3">
                        <div className="preview-pic tab-content">
                            <div className="tab-pane active">
                                <img className='image-preview' src={`${process.env.PUBLIC_URL}${product.Image}`} alt={product.Name} />
                            </div>
                        </div>
                    </div>
                    <div className="details col-md-6 my-3">
                        <h3 className="producttitle">{product.Name}</h3>
                        <div className="rating">
                            <div className="stars">
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                            </div>
                            <span className="review-no">41 reviews</span>
                        </div>
                        <p className="product-description">{product.Description}</p>
                        <h4 className="price">Current price: <span>{product.Price} đ</span></h4>
                        <p className="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
                        <h5 className="sizes">sizes:
                            <span className="size" data-toggle="tooltip" title="small">s</span>
                            <span className="size" data-toggle="tooltip" title="medium">m</span>
                            <span className="size" data-toggle="tooltip" title="large">l</span>
                            <span className="size" data-toggle="tooltip" title="xtra large">xl</span>
                        </h5>
                        <div className="action">
                            <button className="add-to-cart btn btn-default" type="button">Add to cart</button>
                            <button className="like btn btn-default" type="button"><span className="fa fa-heart"></span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;