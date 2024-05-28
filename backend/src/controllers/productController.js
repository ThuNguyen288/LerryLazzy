import db from '../models/index';
import productService from '../services/productService';

let displayProducts = async (req, res) => {
    let productData = await productService.getAllProducts();
    console.log(productData);
    return res.render('test/showProduct.ejs', {
        productData: productData
    });
}

module.exports = {
    displayProducts: displayProducts
}