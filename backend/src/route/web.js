import express from "express";
import userController from '../controllers/userController';
import productController from '../controllers/productController';
import authController from '../controllers/authController'

let router = express.Router();

//create == post
//read == get
//edit == update
//delete == delete

let initWebRoutes = (app) => { //rest api
    router.post('/api/verify-token', authController.verifyToken);

    // for user
    router.post('/api/register', userController.handleRegister);
    router.post('/api/login', userController.handleLogin);

    router.put('/api/change-profile', userController.hanldeChangeProfile);

    router.delete('/api/delete-account', userController.handleDeleteAccount);

    // for product
    router.get('/api/product', productController.displayProducts);
    router.get('/api/product-image/:id', productController.displayProductImage);

    return app.use("/", router);
}

module.exports = initWebRoutes;