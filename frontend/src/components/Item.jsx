import React, { Component } from "react";
import item from "../images/img.jpg";
import { displayProducts } from "../services/productService";

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true,
            error: null
        };
    }

    async componentDidMount() {
        try {
            const response = await displayProducts(1);
            console.log('Display products from backend: ', response.data);
            this.setState({ products: response.data, loading: false });
        } catch (error) {
            console.error('Error fetching products: ', error);
            this.setState({ error: error.message, loading: false });
        }
    }

    render() {
        const { products, loading, error } = this.state;

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
                            <img src={`${process.env.PUBLIC_URL}${product.Image}`}  className="card-img-top container" alt="..." />
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
    }
}

export default Items;
