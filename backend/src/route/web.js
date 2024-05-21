import express from "express";
import homeController from '../controllers/homeController';

let router = express.Router();

//create == post
//read == get
//edit == update
//delete == delete

let initWebRoutes = (app) => { //rest api
    router.get('/', homeController.getHomePage);


    return app.use("/", router);
}

module.exports = initWebRoutes;