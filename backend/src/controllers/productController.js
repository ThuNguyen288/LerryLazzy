import productService from '../services/productService'

let updloadProduct = async (req, res) => {
    try {
        let { name, description, price, categoryid, subcategoryid } = req.body
        let image = req.file ? req.file.buffer : null

        let product = await productService.createNewProduct({ name, description, price, categoryid, subcategoryid, image })
        return res.status(200).json({
            errCode: 0,
            message: 'Product created successfully',
            product: product
        })
    } catch (error) {
        console.error('Error handling upload product request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
    
}

let displayProducts = async (req, res) => {
    try {
        let { productid, categoryid, subcategoryid }  = req.query
        let products = ''
        if (categoryid) {
            products = await productService.getProductsByCategory(categoryid)
            console.log('Get products by category: ', products)

        } else if (subcategoryid) {
            products = await productService.getProductsBySubcategory(subcategoryid)
            console.log('Get products by subcategory: ', products)

        } else if (productid) {
            // Retrieve product details
            products = await productService.getProductById(productid)
            
            // Calculate average rating and total reviews
            let review = await productService.calculateReview(productid)
    
            // Calculate total orders
            let totalOrders = await productService.calTotalOrders(productid)
            
            products.AverageRating = review.averageRating
            products.TotalReviews = review.totalReviews
            products.TotalOrders = totalOrders

            console.log('Product details:', products)

        }
        return res.status(200).json(products)
    } catch (error) {
        console.error('Error handling display prroduct request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let displayTopRating = async (req,res) => {
    let limit = req.query.limit
    if (!limit) limit = 8

    try {
        const products = await productService.getAllProducts()
        console.log(products)
        return products
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

module.exports = {
    updloadProduct,
    displayProducts,
    displayTopRating,
}
