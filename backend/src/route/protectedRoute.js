import express from "express" 
import authMiddleware from '../middleware/authMiddleware'
import userController from '../controllers/userController'
import cartController from '../controllers/cartController' 
  

let protectedRouter = express.Router() 

let protectedRoutes = (app) => {
    // Router for user
    protectedRouter.get('/profile', authMiddleware.authenticateToken, userController.handleShowProfile) 
    protectedRouter.get('/show-profile', authMiddleware.authenticateToken, userController.handleShowProfile) 
    protectedRouter.put('/update-profile', authMiddleware.authenticateToken, userController.handleChangeProfile) 
    protectedRouter.put('/change-password', authMiddleware.authenticateToken, userController.handleChangePassword) 
    protectedRouter.delete('/delete-account', authMiddleware.authenticateToken, userController.handleDeleteAccount)

    // Router for product
    protectedRouter.put('/add-to-cart', authMiddleware.authenticateToken, cartController.handleAddToCart)
    protectedRouter.get('/show-cart', authMiddleware.authenticateToken, cartController.handleShowCart)
    protectedRouter.delete('/delete-from-cart', authMiddleware.authenticateToken, cartController.handleRemoveFromCart)
    
    return app.use("/api/protected", protectedRouter) 
}

module.exports = protectedRoutes 