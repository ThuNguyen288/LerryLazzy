import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { getProductsByCategory, getProductsBySubcategory, getProductImage } from "../services/productService";

const Item = ({ categoryid, subcategoryid }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productImages, setProductImages] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (categoryid) {
                    response = await getProductsByCategory(categoryid);
                } else if (subcategoryid) {
                    response = await getProductsBySubcategory(subcategoryid);
                }
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

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const images = {};
                for (const product of products) {
                    const image = await getProductImage(product.ProductID);
                    images[product.ProductID] = image;
                }
                console.log('Product Images:', productImages);
                setProductImages(images);
            } catch (error) {
                console.error('Error fetching product images: ', error);
            }
        };

        if (products.length > 0) {
            fetchImages();
        }
    }, [products]);

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
                            <img src={productImages[product.ProductID]} className="card-img" alt={product.Name} />
                            <div className="product-action">
                                <Link to="/">
                                    <FontAwesomeIcon icon={faShoppingCart} className="mx-2" />
                                </Link>
                                <Link to="/">
                                    <FontAwesomeIcon icon={faHeart} className="mx-2" />
                                </Link>
                            </div>
                        </div>
                        <div className="product-content">
                            <h3 className="product-title fw-bold"><Link to={`/product/${product.ProductID}`}>{product.Name}</Link></h3>
                            <span className="product-price">{product.Price} đ</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Item;
