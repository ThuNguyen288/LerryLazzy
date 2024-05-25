import express from "express";
import homeController from '../controllers/homeController';

let router = express.Router();

//create == post
//read == get
//edit == update
//delete == delete

let initWebRoutes = (app) => { //rest api
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.get('/get-crud', homeController.displayCRUD);

    router.post('/post-crud', homeController.postCRUD);


    return app.use("/", router);
}

module.exports = initWebRoutes;