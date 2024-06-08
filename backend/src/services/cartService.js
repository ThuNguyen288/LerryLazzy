import db from '../models/index'

// Function to add product to cart
let addProductToCart = (userid, productid) => {
    return new Promise (async (resolve, reject) => {
        try {
            let cartData = {
                errCode: 0,
                errMessage: ''
            }

            let user = await db.User.findOne({
                where: { UserID: userid }
            })
            if (!user) {
                cartData.errCode = 1
                cartData.errMessage = 'User not found'
                resolve(cartData)
            }

            let product = await db.Product.findOne({
                where: { ProductID: productid }
            })
            if (!product) {
                cartData.errCode = 2
                cartData.errMessage = 'Product not found'
                resolve(cartData)
            }

            let productInCart = await db.Cart.findOne({
                where: { UserID: userid, ProductID: productid }
            })

            if (!productInCart) {
                await db.Cart.create({
                    UserID: userid,
                    ProductID: productid,
                    Quantity: 1
                })
                
                cartData.errMessage = 'Added product to cart successfully!'
                resolve(cartData)
            } else {
                let quantity = productInCart.Quantity + 1
                await db.Cart.update({
                    Quantity: quantity
                }, {
                    where: { UserID: userid, ProductID: productid }
                })
                
                cartData.errMessage = 'Increased product quantity in cart successfully!'
                resolve(cartData)
            }
        } catch (error) {
            reject(error)
        }
    })
}

// Funtion to count quantity of product in cart
let getTotalProduct = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cartData = {
                errCode: 0,
                errMessage: ''
            }

            let user = await db.User.findOne({
                where: { UserID: userid }
            })
            if (!user) {
                cartData.errCode = 1
                cartData.errMessage = 'User not found'
                resolve(cartData)
            }

            
        } catch (error) {
            reject(error)
        }
    })
}

// Function to show cart of user
let showCart = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cartData = {
                errCode: 0,
                errMessage: '',
                cart: [],
                numberProduct: 0
            }

            let user = await db.User.findOne({
                where: { UserID: userid }
            })
            if (!user) {
                cartData.errCode = 1
                cartData.errMessage = 'User not found'
                resolve(cartData)
            }

            let cart = await db.Cart.findAll({
                where: { UserID: userid },
            })
            if (!cart || cart.length === 0) {
                cartData.errCode = 2
                cartData.errMessage = 'Cart is empty'
                resolve(cartData)
                return
            }
            let total = await db.Cart.findAll({
                attributes: [
                    [db.sequelize.fn('COUNT', db.sequelize.col('UserID')), 'NumberOfProduct'],
                ],
                where: { UserID: userid },
                group: [ 'UserID' ]
            })

            cartData.errMessage = 'Get cart successfully!'
            cartData.cart = cart;
            cartData.numberProduct = total[0].NumberOfProduct
            resolve(cartData)
        } catch (error) {
            reject(error)
        }
    })
}

// Funtion to delete product from cart
let removeProductFromCart = (userid, productid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cartData = {
                errCode: 0,
                errMessage: ''
            }

            let user = await db.User.findOne({
                where: { UserID: userid }
            })
            if (!user) {
                cartData.errCode = 1
                cartData.errMessage = 'User not found'
                resolve(cartData)
            }

            let product = await db.Product.findOne({
                where: { ProductID: productid }
            })
            if (!product) {
                cartData.errCode = 2
                cartData.errMessage = 'Product not found'
                resolve(cartData)
            }
            
            await db.Cart.destroy({
                where: { UserID: userid, ProductID: productid }
            })
            
            cartData.errMessage = 'Delete product successfully!'
            resolve(cartData)
        } catch (error) {
            reject(error)
        }
    })
} 

module.exports = {
    addProductToCart: addProductToCart,
    showCart: showCart,
    removeProductFromCart: removeProductFromCart
}