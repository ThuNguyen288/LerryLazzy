import express from "express"
import userController from '../controllers/userController'
import productController from '../controllers/productController'


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

    return app.use("/api", router)
}

module.exports = initWebRoutes