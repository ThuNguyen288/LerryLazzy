import express from "express";
import userController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware'; 

let protectedRouter = express.Router();

let protectedRoutes = (app) => {
    protectedRouter.get('/profile', authMiddleware.verifyToken, userController.handleShowProfile);
    return app.use("/api/protected", protectedRouter);
}

module.exports = protectedRoutes;