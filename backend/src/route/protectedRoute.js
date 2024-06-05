import express from "express";
import userController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware'; 

let protectedRouter = express.Router();

let protectedRoutes = (app) => {
    protectedRouter.get('/profile', authMiddleware.verifyToken, userController.handleShowProfile);
    protectedRouter.get('/show-profile', authMiddleware.verifyToken, userController.handleShowProfile);
    protectedRouter.put('/update-profile', userController.handleChangeProfile);

    return app.use("/api/protected", protectedRouter);
}

module.exports = protectedRoutes;