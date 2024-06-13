import favoriteService from '../services/favoriteService'

let handleAddRemoveFavorite = async (req, res) => {
    try {
        let userid = req.user.userid 
        let { productid } = req.body
        let message = await favoriteService.addRemoveFavorite (userid, productid)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling add favorite product request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleShowFavorite = async (req, res) => {
    try {
        let userid = req.user.userid 
        
        let message = await favoriteService.showFavorite(userid)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling show favorite request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleCheckFavorite = async (req, res) => {
    try {
        let userid = req.user.userid 
        let { productid } = req.query
        let message = await favoriteService.checkFavorite(userid, productid)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling check product in favorite request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

module.exports = {
    handleAddRemoveFavorite: handleAddRemoveFavorite,
    handleShowFavorite: handleShowFavorite,
    handleCheckFavorite: handleCheckFavorite
}

