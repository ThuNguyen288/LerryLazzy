import express from "express";
import productController from '../controllers/productController';
import userController from '../controllers/userController';
let router = express.Router();

let initWebRoutes = (app) => { //rest api


    // Routes for user
    router.post('/register', userController.handleRegister);
    router.post('/login', userController.handleLogin);
    router.put('/change-profile', userController.handleChangeProfile);
    router.delete('/delete-account', userController.handleDeleteAccount);

    // Routes for product
    router.get('/product', productController.displayProducts);
    router.get('/product-image/:id', productController.displayProductImage);

    return app.use("/api", router);
}

module.exports = initWebRoutes;