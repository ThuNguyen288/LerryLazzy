import React, { useEffect, useState } from "react";
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
                    <div className="card h-100">
                        <img src={`${process.env.PUBLIC_URL}${product.Image}`} className="card-img-top container" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{product.Name}</h5>
                            <p className="card-text">{product.Description}</p>
                            <p className="card-text"><strong>Price: </strong>{product.Price}đ</p>
                            <p className="card-text"><strong>Rating: </strong>{product.AvgRating}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Item;
