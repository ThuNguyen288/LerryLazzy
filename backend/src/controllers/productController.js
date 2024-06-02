import productService from '../services/productService';

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
            products = await productService.getProductWithDetails(productid);
            console.log('Get product with details: ', products);
        }
        return res.status(200).json({
            errCode: 0,
            data: products
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while retrieving products.');
    }
};

let displayProductDetails = async (req, res) => {
    // try {
    //     let productId = req.query.productid;
    //     let productInfo = await productService.getProductWithDetails(productId)
    //     console.log(productId);
    //     return res.status(200).json({
    //         errCode: 0,
    //         data: productInfo
    //     })
    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).send('An error occurred while retrieving products.');
    // }
}

module.exports = {
    displayProducts,
    displayProductDetails
};
