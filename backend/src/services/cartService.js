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
                return resolve(cartData)
            }

            let product = await db.Product.findOne({
                where: { ProductID: productid }
            })
            if (!product) {
                cartData.errCode = 2
                cartData.errMessage = 'Product not found'
                return resolve(cartData)
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
                return resolve(cartData)
            } else {
                let quantity = productInCart.Quantity + 1
                await db.Cart.update({
                    Quantity: quantity
                }, {
                    where: { UserID: userid, ProductID: productid }
                })
                
                cartData.errMessage = 'Increased product quantity in cart successfully!'
                return resolve(cartData)
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
                return resolve(cartData)
            }

            let cart = await db.Cart.findAll({
                where: { UserID: userid },
            })
            if (!cart || cart.length === 0) {
                cartData.errCode = 2
                cartData.errMessage = 'Cart is empty'
                return resolve(cartData)
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
            return resolve(cartData)
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
                return resolve(cartData)
            }

            let product = await db.Product.findOne({
                where: { ProductID: productid }
            })
            if (!product) {
                cartData.errCode = 2
                cartData.errMessage = 'Product not found'
                return resolve(cartData)
            }
            
            await db.Cart.destroy({
                where: { UserID: userid, ProductID: productid }
            })
            
            cartData.errMessage = 'Delete product successfully!'
            return resolve(cartData)
        } catch (error) {
            reject(error)
        }
    })
}

// Function to increase quantity of product
let increaseQuantity = (userid, productid) => {
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
                return resolve(cartData)
            }

            let product = await db.Product.findOne({
                where: { ProductID: productid }
            })
            if (!product) {
                cartData.errCode = 2
                cartData.errMessage = 'Product not found'
                return resolve(cartData)
            }

            let quantity = await db.Cart.findOne({
                where: { UserID: userid, ProductID: productid }
            })
            await db.Cart.update({
                Quantity: quantity.Quantity + 1
            }, {
                where: { UserID: userid, ProductID: productid }
            })
            cartData.errMessage = 'Increased product quantity successfully!'
            return resolve(cartData)
        } catch (error) {
            reject(error)
        }
    })
}

// Function to decrease quantity of product
let decreaseQuantity = (userid, productid) => {
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
                return resolve(cartData)
            }

            let product = await db.Product.findOne({
                where: { ProductID: productid }
            })
            if (!product) {
                cartData.errCode = 2
                cartData.errMessage = 'Product not found'
                return resolve(cartData)
            }

            let quantity = await db.Cart.findOne({
                where: { UserID: userid, ProductID: productid }
            })

            if (quantity.Quantity > 1) {
                await db.Cart.update({
                    Quantity: quantity.Quantity - 1
                }, {
                    where: { UserID: userid, ProductID: productid }
                })
                cartData.errMessage = 'Decreased product quantity successfully!'
                return resolve(cartData)
            } else {
                await db.Cart.destroy({
                    where: { UserID: userid, ProductID: productid }
                })
                cartData.errMessage = 'Product removed from cart successfully!'
                return resolve(cartData)
            }
        } catch (error) {
            reject(error)
        }
    })
}

// Function to add large quantities of product
let addLargeQuantity = (userid,  productid, quantity) => {
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
                return resolve(cartData)
            }

            let product = await db.Product.findOne({
                where: { ProductID: productid }
            })
            if (!product) {
                cartData.errCode = 2
                cartData.errMessage = 'Product not found'
                return resolve(cartData)
            }

            let cartItem = await db.Cart.findOne({
                where: { UserID: userid, ProductID: productid }
            })

            let newQuantity = parseInt(quantity, 10)

            if (cartItem) { 
                await db.Cart.update({
                    Quantity: cartItem.Quantity + newQuantity
                }, {
                    where: { UserID: userid, ProductID: productid }
                })
            } else {
                await db.Cart.create({
                    UserID: userid,
                    ProductID: productid,
                    Quantity: quantity
                })
            }

            cartData.errMessage = 'Product quantity updated successfully!'
            return resolve(cartData)
        } catch (error) {
            reject(error)
        }
    })
}

// Function to update quantities of product
let updateQuantity = (userid, productid, quantity) => {
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
                return resolve(cartData)
            }

            let product = await db.Product.findOne({
                where: { ProductID: productid }
            })
            if (!product) {
                cartData.errCode = 2
                cartData.errMessage = 'Product not found'
                return resolve(cartData)
            }

            await db.Cart.update({
                Quantity: quantity
            }, {
                where: { UserID: userid, ProductID: productid }
            })

            cartData.errMessage = 'Product quantity updated successfully!'
            return resolve(cartData)
        } catch (error) {
            reject(error)
        }
    })
}

// Function to remove all product from cart
let removeAllProduct = (userid) => {
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
                return resolve(cartData)
            }

            await db.Cart.destroy({
                where: { UserID: userid }
            })
            cartData.errMessage = 'All products removed from cart successfully!'
            return resolve(cartData)
        } catch (error) {
            reject(error)
        }
    })
}

let getTotalQuantity = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cartData = {
                errCode: 0,
                errMessage: '',
                getTotalQuantity: 0
            }

            let user = await db.User.findOne({
                where: { UserID: userid }
            })
            if (!user) {
                cartData.errCode = 1
                cartData.errMessage = 'User not found'
                return resolve(cartData)
            }
            
            let cartItem = await db.Cart.findAll({
                where: { UserID: userid },
            })

            cartData.getTotalQuantity = cartItem.reduce((total, item) => total + item.Quantity, 0)
            cartData.errMessage = 'Total quantity calculated successfully!'
            return resolve(cartData)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    addProductToCart: addProductToCart,
    showCart: showCart,
    removeProductFromCart: removeProductFromCart,
    increaseQuantity: increaseQuantity,
    decreaseQuantity: decreaseQuantity,
    addLargeQuantity: addLargeQuantity,
    updateQuantity: updateQuantity,
    removeAllProduct: removeAllProduct,
    getTotalQuantity: getTotalQuantity
}