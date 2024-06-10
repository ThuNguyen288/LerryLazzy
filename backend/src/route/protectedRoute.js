import express from 'express'
import cartController from '../controllers/cartController'
import userController from '../controllers/userController'
import authMiddleware from '../middleware/authMiddleware'

let protectedRouter = express.Router() 

let protectedRoutes = (app) => {
    // Router for user
    protectedRouter.get('/profile', authMiddleware.authenticateToken, userController.handleShowProfile) 
    protectedRouter.get('/show-profile', authMiddleware.authenticateToken, userController.handleShowProfile) 
    protectedRouter.put('/update-profile', authMiddleware.authenticateToken, userController.handleChangeProfile) 
    protectedRouter.put('/change-password', authMiddleware.authenticateToken, userController.handleChangePassword) 
    protectedRouter.delete('/delete-account', authMiddleware.authenticateToken, userController.handleDeleteAccount)

    // Router for cart
    protectedRouter.put('/add-to-cart', authMiddleware.authenticateToken, cartController.handleAddToCart)
    protectedRouter.get('/show-cart', authMiddleware.authenticateToken, cartController.handleShowCart)
    protectedRouter.delete('/delete-from-cart', authMiddleware.authenticateToken, cartController.handleRemoveFromCart)
    protectedRouter.put('/increase-quantity', authMiddleware.authenticateToken, cartController.handleIncreaseQuantity)
    protectedRouter.put('/decrease-quantity', authMiddleware.authenticateToken, cartController.handleDecreaseQuantity)
    protectedRouter.put('/add-large-quantity', authMiddleware.authenticateToken, cartController.handleAddLargeQuantity)
    protectedRouter.put('/update-quantity', authMiddleware.authenticateToken, cartController.handleUpdateQuantity)
    protectedRouter.delete('/remove-all-product', authMiddleware.authenticateToken, cartController.handleRemoveAllProduct)
    protectedRouter.get('/get-total-quantity', authMiddleware.authenticateToken, cartController.handleGetTotalQuantity)
    
    return app.use('/api/protected', protectedRouter) 
}

module.exports = protectedRoutes 