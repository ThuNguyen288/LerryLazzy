import reviewService from '../services/reviewService'

let handlePostReview = async (req, res) => {
    try {
        let userid = req.user.userid 
        let { productid, rating, comment } = req.body

        let review = await reviewService.postReview(userid, productid, rating, comment)
        return res.status(200).json(review)
    } catch (error) {
        console.error('Error handling post a review request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

module.exports = {
    handlePostReview: handlePostReview
}