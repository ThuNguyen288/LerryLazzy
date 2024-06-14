import db from '../models/index'

let postReview = (userid, productid, rating, comment) => {
    return new Promise(async (resolve, reject) => {
        try {
            let reviewData = {
                errCode: 0,
                errMessage: '',
                review: ''
            }

            let user = await db.User.findOne({
                where: { UserID: userid }
            })

            if(!user) {
                reviewData.errCode = 1
                reviewData.errMessage = 'Use need to login first'
                return resolve(review)
            }

            let product = await db.Product.findOne({
                where: { ProductID: productid }
            })

            if(!product) {
                reviewData.errCode = 2
                reviewData.errMessage = 'Product not found'
                return resolve(review)
            }

            let review = await db.Review.create({
                UserID: userid,
                ProductID: productid,
                Rating: rating,
                Comment: comment,
                ReviewDate: new Date(),
            })

            reviewData.errMessage = 'Post a review successfully!'
            reviewData.review = review
            return resolve(reviewData)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    postReview: postReview
}