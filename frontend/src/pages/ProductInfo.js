import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductsById } from "../services/productService";

const Item = ({ productid }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProductsById(productid);
                console.log('Display product from backend: ', response.data);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product: ', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [productid]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="row row-cols-1 row-cols-md-4 g-4">
            <div key={product.ProductID} className="col">
                <div className="card h-100 product-box">
                    <div className="product-image">
                        <Link to={`/product/${product.ProductID}`}>
                            <img src={`${process.env.PUBLIC_URL}${product.Image}`} className="card-img" alt={product.Name}/>
                        </Link>
                        <div className="product-action">
                            <Link to="/">
                                <FontAwesomeIcon icon={faShoppingCart} className="text-brown mx-2" />
                            </Link>
                            <Link to="/">
                                <FontAwesomeIcon icon={faHeart} className="text-brown mx-2" />
                            </Link>
                        </div>
                    </div>
                    <div className="product-content">
                        <h3 className="product-title fw-bold">{product.Name}</h3>
                        <span className="product-price">{product.Price} đ</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;
