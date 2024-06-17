import express from 'express'
import userController from '../controllers/userController'
import productController from '../controllers/productController'
import orderController from '../controllers/orderController'
import clientController from '../controllers/admin/clientController'
import orderClientController from '../controllers/admin/orderClientController.js'
 
let router = express.Router()

let initWebRoutes = (app) => { //rest api

    // Routes for user
    router.post('/register', userController.handleRegister)
    router.post('/login', userController.handleLogin)
    router.post('/reset-password/request', userController.handleRequestResetPassword)
    router.post('/reset-password/enter-code', userController.handleEnterCode)
    router.put('/reset-password', userController.handleResetPassword)

    // Routes for product
    router.get('/product', productController.displayProducts)
    router.get('/hot-product', productController.displayHotProduct)
    router.get('/new-product', productController.displayNewProduct)
    router.get('/product/review', productController.displayProductReviews)
    router.get('/search-product', productController.displayProductByKeyword)

    // Router for order
    router.put('update-order-status', orderController.handleUpdateOrderStatus)

    // Router for admin
    router.get('/admin/show-client', clientController.countUsersCreated)
    router.get('/admin/show-order', orderClientController.countOrdersCreated)
    router.get('/admin/show-product', productController.displayAllProduct)
    // router.get('/admin/show-all-order' orderClientController.)


    return app.use('/api', router)
}

module.exports = initWebRoutes