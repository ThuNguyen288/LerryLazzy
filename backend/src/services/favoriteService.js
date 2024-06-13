import db from '../models/index'

// Function add or remove favorite product
let addRemoveFavorite = (userid, productid) => {
    return new Promise (async (resolve, reject) => {
        try {
            let favoData = {
                errCode: 0,
                errMessage: ''
            }

            let user = await db.User.findOne({
                where: { UserID: userid }
            })
            if (!user) {
                favoData.errCode = 1
                favoData.errMessage = 'User not found'
                return resolve(favoData)
            }

            let product = await db.Product.findOne({
                where: { ProductID: productid }
            })
            if (!product) {
                favoData.errCode = 2
                favoData.errMessage = 'Product not found'
                return resolve(favoData)
            }

            let productInFavo = await db.Favorite.findOne({
                where: { UserID: userid, ProductID: productid }
            })

            if (!productInFavo) {
                await db.Favorite.create({
                    UserID: userid,
                    ProductID: productid,
                })
                favoData.errMessage = 'Added product to favorite successfully!'
                return resolve(favoData)
            } else {
                await db.Favorite.destroy({
                    where: { 
                        UserID: userid, 
                        ProductID: productid 
                    }
                })
                favoData.errMessage = 'Remove product from favorite successfully!'
                return resolve(favoData)
            }  
        } catch (error) {
            reject(error)
        }
    })
}

// Function to show favorite of user
let showFavorite = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let favoData = {
                errCode: 0,
                errMessage: '',
                favorites: [],
            }

            let user = await db.User.findOne({
                where: { UserID: userid }
            })
            if (!user) {
                favoData.errCode = 1
                favoData.errMessage = 'User not found'
                return resolve(favoData)
            }

            let favorites = await db.Favorite.findAll({
                where: { UserID: userid },
            })
            if (!favorites || favorites.length === 0) {
                favoData.errCode = 2
                favoData.errMessage = 'You don\'t have any favorite products '
                return resolve(favoData)
            }

            favoData.errMessage = 'Get favorite successfully!'
            favoData.favorites = favorites;
            return resolve(favoData)
        } catch (error) {
            reject(error)
        }
    })
}

// Function to check product in favorite
let checkFavorite = (userid, productid) => {
    return new Promise (async (resolve, reject) => {
        try {
            let favoData = {
                errCode: 0,
                errMessage: '',
                inFavo: false,
            }

            let user = await db.User.findOne({
                where: { UserID: userid }
            })
            if (!user) {
                favoData.errCode = 1
                favoData.errMessage = 'User not found'
                return resolve(favoData)
            }

            let product = await db.Product.findOne({
                where: { ProductID: productid }
            })
            if (!product) {
                favoData.errCode = 2
                favoData.errMessage = 'Product not found'
                return resolve(favoData)
            }

            let productInFavo = await db.Favorite.findOne({
                where: { UserID: userid, ProductID: productid }
            })

            if (!productInFavo) {
                
                favoData.errCode = 3
                favoData.errMessage = 'Product not in favorite'
                return resolve(favoData)
            }

            favoData.inFavo = true
            favoData.errMessage = 'Product in favorite'
            return resolve(favoData)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    addRemoveFavorite: addRemoveFavorite ,
    showFavorite: showFavorite,
    checkFavorite: checkFavorite
}