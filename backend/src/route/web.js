import express from "express";
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import productController from '../controllers/productController';

let router = express.Router();

//create == post
//read == get
//edit == update
//delete == delete

let initWebRoutes = (app) => { //rest api
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.get('/get-crud', homeController.displayCRUD);
    router.get('/edit-crud', homeController.editCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);


    router.post('/post-crud', homeController.postCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.post('/api/login', userController.handleLogin);

    // for product
    router.get('/api/product', productController.displayProducts);
    router.get('/api/top-rate-product', productController.displayTopRating);

    return app.use("/", router);
}

module.exports = initWebRoutes;