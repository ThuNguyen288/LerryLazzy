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
    router.get('/edit-crud', homeController.editCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/post-crud', homeController.postCRUD);
    router.post('/put-crud', homeController.putCRUD);

    return app.use("/", router);
}

module.exports = initWebRoutes;