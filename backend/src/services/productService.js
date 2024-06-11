import db from '../models/index'

// Function to get all product by CategoryID
let getProductsByCategory = (categoryid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                where: { CategoryID: categoryid },
            })
            resolve(products)
        } catch (error) {
            reject(error)
        }
    })
}

// Function to get all product by SubcategoryID
let getProductsBySubcategory = (subcategoryid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                where: { SubcategoryID: subcategoryid },
            })
            resolve(products)
        } catch (error) {
            reject(error)
        }
    })
}

// Function to get product by id
let getProductById = (productid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: { ProductID: productid },
            })
            resolve(product)
        } catch (error) {
            console.error('Error in getProductWithDetails function:', error)
            reject(error)
        }
    })
}

// Function to get all products
let getAllProducts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                include: [{
                    model: db.Review,
                }],
            })
            console.log('Get all products: ', products)
            resolve(products)
        } catch (error) {
            reject(error)
        }
    })
}

// Function to calculate average rating of product
let calculateReview = (productid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const review = {
                averageRating: 0,
                totalReviews: 0
            }

            const result = await db.Review.findOne({
                attributes: [
                    [db.sequelize.fn('COUNT', db.sequelize.col('Rating')), 'TotalReviews'],
                    [db.sequelize.fn('AVG', db.sequelize.col('Rating')), 'AverageRating']
                ],
                where: { ProductID: productid },
                group: ['ProductID'],
                order: ['ProductID']
            })

            if (result && result.AverageRating && result.TotalReviews) {
                review.averageRating = result.AverageRating
                review.totalReviews = result.TotalReviews
            }

            resolve(review)
        } catch (error) {
            console.error('Error in calculate review:', error)
            reject(error)
        }
    })
}

// Function to calculate total ordered of product
let calTotalOrders = (productid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.OrderItem.findOne({
                attributes: [
                    [db.sequelize.fn('COUNT', db.sequelize.col('OrderItem.OrderID')), 'OrderCount']
                ],
                where: { ProductID: productid },
                group: ['ProductID'],
                order: ['ProductID']
            })

            resolve(result ? result.OrderCount : 0)
        } catch (error) {
            console.error('Error in calculate total orders:', error)
            reject(error)
        }
    })
}

module.exports = {
    getProductsByCategory: getProductsByCategory,
    getProductsBySubcategory: getProductsBySubcategory,
    getProductById: getProductById,
    getAllProducts: getAllProducts,
    calculateReview: calculateReview,
    calTotalOrders: calTotalOrders,
}

