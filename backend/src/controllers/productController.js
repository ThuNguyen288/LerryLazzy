import productService from '../services/productService';
import db from '../models/index';

let displayProducts = async (req, res) => {
    try {
        let { productid, categoryid, subcategoryid }  = req.query;
        let products = '';
        if (categoryid) {
            products = await productService.getProductsByCategory(categoryid);
            console.log('Get products by category: ', products);
        } else if (subcategoryid) {
            products = await productService.getProductsBySubcategory(subcategoryid);
            console.log('Get products by subcategory: ', products);
        } else if (productid) {
            if (!productid) {
                return res.status(400).json({
                    errCode: 1,
                    message: 'Product ID is required!'
                });
            }
    
            // Retrieve product details
            products = await productService.getProductById(productid);
            console.log('Product details:', products);
    
            // Calculate average rating
            let averageRating = await productService.calAverageRating(productid);
            console.log('Average Rating:', averageRating);
    
            // Calculate total orders
            let totalOrders = await productService.calTotalOrders(productid);
            console.log('Total Orders:', totalOrders);
    
            products.AverageRating = averageRating;
            products.TotalOrders = totalOrders;

        }
        return res.status(200).json({
            errCode: 0,
            data: products
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        });
    }
};

let displayTopRating = async (req,res) => {
    let limit = req.query.limit;
    if (!limit) limit = 8;

    try {
        const products = await productService.getAllProducts();
        console.log(products);
        return products;
    } catch (error) {
        console.error('Error: ', error);
        return res.status(200).json({
            errCode: -1,
            message: 'Failed to fetch products.'
        })
    }
};

let displayProductImage = async (req, res) => {
    const productid = req.params.id;
    try {
        let imageData = await productService.getProductImage(productid);
        res.setHeader('Content-Type', 'image/png');
        res.send(imageData);
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        });
    }
};


module.exports = {
    displayProducts,
    displayTopRating,
    displayProductImage
};
