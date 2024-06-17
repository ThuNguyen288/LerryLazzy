import db from '../models/index'
let { Op } = require('sequelize')

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
            let products = await db.Product.findAll()
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
            let review = {
                averageRating: 0.0,
                totalReviews: 0,
                starCounts: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0
                }
            }

            let result = await db.Review.findOne({
                attributes: [
                    [db.sequelize.fn('COUNT', db.sequelize.col('Rating')), 'TotalReviews'],
                    [db.sequelize.fn('AVG', db.sequelize.cast(db.sequelize.col('Rating'), 'FLOAT')), 'AverageRating']
                ],
                where: { ProductID: productid },
                group: ['ProductID'],
                order: ['ProductID']
            })

            let starCountsResult = await db.Review.findAll({
                attributes: ['Rating', [db.sequelize.fn('COUNT', db.sequelize.col('Rating')), 'Count']],
                where: { ProductID: productid },
                group: ['Rating'],
            })

            if (result && result.AverageRating && result.TotalReviews) {
                review.averageRating = parseFloat(result.AverageRating.toFixed(1))
                review.totalReviews = review.totalReviews = parseInt(result.TotalReviews, 10)
            }

            starCountsResult.forEach(row => {
                review.starCounts[row.Rating] = parseInt(row.Count, 10)
            })

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
            let result = await db.OrderItem.findOne({
                attributes: [
                    [db.sequelize.fn('COUNT', db.sequelize.col('OrderItem.OrderID')), 'OrderCount'],
                    [db.sequelize.fn('SUM', db.sequelize.col('OrderItem.Quantity')), 'TotalQuantity']
                ],
                where: { ProductID: productid },
                group: ['ProductID'],
                order: ['ProductID']
            })

            resolve(result ? { 
                totalOrders: result.OrderCount, 
                totalQuantity: result.TotalQuantity 
            } : { 
                totalOrders: 0, 
                totalQuantity: 0 
            })
        } catch (error) {
            console.error('Error in calculate total orders:', error)
            reject(error)
        }
    })
}

// Function to show hot product
let getHotProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let products = await getAllProducts()

            let productPromises = products.map(async (product) => {
                let orderData = await calTotalOrders(product.ProductID)
                return {
                    ...product,
                    orderCount: orderData.totalOrders,
                    totalQuantity: orderData.totalQuantity
                }
            })

            let productsWithOrderCounts = await Promise.all(productPromises)

            productsWithOrderCounts.sort((a, b) => b.orderCount - a.orderCount)

            resolve(productsWithOrderCounts)
        } catch (error) {
            console.error('Error handling display product: ', error)
            reject(error)
        }
    })
}

// Function to show to new product
let getNewProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let products = await getAllProducts()

            products.sort((a, b) => b.ProductID - a.ProductID)

            let newProducts = products.slice(0, 8)

            resolve(newProducts)
        } catch (error) {
            console.error('Error handling display product: ', error)
            reject(error)
        }
    })
}

// Function to get all review for product
let getAllReviews = (productid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let reviews = await db.Review.findAll({
                where: { ProductID: productid },
                include: [
                    {
                        model: db.User,
                        attributes: ['Username', 'Firstname', 'Lastname'],
                        as: 'user'
                    }
                ],
                order: [['ReviewDate', 'DESC']],
                raw: true
            })
                
            resolve(reviews)
        } catch (error) {
            console.error('Error in getAllReviews:', error)
            reject(error)
            throw error
        }
    })
}

// Function to get product by keyword
let searchProduct = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                where: {
                    Name: {
                        [Op.like]: `%${keyword}%`
                    }
                }
            })
            
            let count = products.length
            return resolve({ products, count })
        } catch (error) {
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
    getHotProduct: getHotProduct,
    getNewProduct: getNewProduct,
    getAllReviews: getAllReviews,
    searchProduct: searchProduct
}

