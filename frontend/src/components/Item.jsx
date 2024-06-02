import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { displayProductsByCategory, displayProductsBySubcategory } from "../services/productService";

const Item = ({ categoryid, subcategoryid }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (categoryid) {
                    response = await displayProductsByCategory(categoryid);
                } else if (subcategoryid) {
                    response = await displayProductsBySubcategory(subcategoryid);
                }
                console.log('Display products from backend: ', response.data);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products: ', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [categoryid, subcategoryid]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="row row-cols-1 row-cols-md-4 g-4">
            {products.map(product => (
                <div key={product.ProductID} className="col">
                    <div className="card h-100 product-box">
                        <div className="product-image">
                            <img src={`${process.env.PUBLIC_URL}${product.Image}`} className="card-img" alt={product.Name} />
                            <div className="product-action">
                                <Link to="/cart">
                                    <FontAwesomeIcon icon={faShoppingCart} className="text-brown mx-2" />
                                </Link>
                                <Link to="/favorite">
                                    <FontAwesomeIcon icon={faHeart} className="text-brown mx-2" />
                                </Link>
                            </div>
                        </div>
                        <div className="product-content">
                            <h3 className="product-title fw-bold"><a href="/">{product.Name}</a></h3>
                            <span className="product-price">{product.Price} đ</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Item;
