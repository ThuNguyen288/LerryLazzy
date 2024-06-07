import express from "express"
import productController from '../controllers/productController'
import userController from '../controllers/userController'
let router = express.Router()

let initWebRoutes = (app) => { //rest api


    // Routes for user
    router.post('/register', userController.handleRegister)
    router.post('/login', userController.handleLogin)
    router.post('/reset-password/request', userController.handleRequestResetPassword)
    router.post('/reset-password/enter-code', userController.handleEnterCode)
    router.put('/reset-password', userController.handleResetPassword)
    router.delete('/delete-account', userController.handleDeleteAccount)

    // Routes for product
    router.get('/product', productController.displayProducts)

    return app.use("/api", router)
}

module.exports = initWebRoutes