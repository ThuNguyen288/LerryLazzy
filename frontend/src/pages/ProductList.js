import React, { useState, useEffect } from 'react';
import { useSearch } from '../context/SearchContext';
import { getProductByKeyword } from '../services/productService';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const ProductList = () => {
    const { keyword } = useSearch();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await getProductByKeyword(keyword)
                console.log(response)

                if (response.errCode === 0) {
                    setProducts(response.products);
                    setError(null);
                } else {
                    setError(response.errMessage);
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error searching products:', error);
                setError('An error occurred while searching for products.');
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        if (keyword !== '') {
            fetchProducts();
        } else {
            setProducts([]);
        }
    }, [keyword]);

    return (
        <div>
            <NavBar />
            {loading && <p>Loading...</p>}
            {error && <div>{error}</div>}
            <h1>Product:</h1>
            {products.map(product => (
                <div key={product.ProductID}>
                    <p>{product.Name}</p>
                    <p>{product.Price}</p>
                </div>
            ))}
            <Footer />
        </div>
    );
};

export default ProductList;
