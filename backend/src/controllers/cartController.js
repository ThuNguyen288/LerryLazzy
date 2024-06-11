import cartService from '../services/cartService'

let handleAddToCart = async (req, res) => {
    try {
        let userid = req.user.userid
        let { productid } = req.body

        if (!userid) {
            return res.status(401).json({
                errCode: 1,
                message: 'You need to login first',
            })
        }

        let message = await cartService.addProductToCart(userid, productid)
        return res.status(200).json(message)
        
    } catch (error) {
        console.error('Error handling add to cart request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleShowCart = async (req, res) => {
    try {
        let userid = req.user.userid

        if (!userid) {
            return res.status(401).json({
                errCode: 1,
                message: 'You need to login first',
            })
        }
        
        let message = await cartService.showCart(userid)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling show cart request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleRemoveFromCart = async (req, res) => {
    try {
        let userid = req.user.userid
        let { productid } = req.body

        if (!userid) {
            return res.status(401).json({
                errCode: 1,
                message: 'You need to login first',
            })
        }

        let message = await cartService.removeProductFromCart(userid, productid)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling delete from cart request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleIncreaseQuantity = async (req, res) => {
    try {
        let userid = req.user.userid
        let { productid } = req.body

        if (!userid) {
            return res.status(401).json({
                errCode: 1,
                message: 'You need to login first',
            })
        }

        let message = await cartService.increaseQuantity(userid, productid)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling increase quantity request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleDecreaseQuantity = async (req, res) => {
    try {
        let userid = req.user.userid
        let { productid } = req.body

        if (!userid) {
            return res.status(401).json({
                errCode: 1,
                message: 'You need to login first',
            })
        }

        let message = await cartService.decreaseQuantity(userid, productid)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling decrease quantity request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleAddLargeQuantity = async (req, res) => {
    try {
        let userid = req.user.userid
        let { productid, quantity } = req.body

        if (!userid) {
            return res.status(401).json({
                errCode: 1,
                message: 'You need to login first',
            })
        }

        let message = await cartService.addLargeQuantity(userid, productid, quantity)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling add large quantity request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleUpdateQuantity = async (req, res) => {
    try {
        let userid = req.user.userid
        let { productid, quantity } = req.body

        if (!userid) {
            return res.status(401).json({
                errCode: 1,
                message: 'You need to login first',
            })
        }

        let message = await cartService.updateQuantity(userid, productid, quantity)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling update quantity request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleRemoveAllProduct = async (req, res) => {
    try {
        let userid = req.user.userid

        if (!userid) {
            return res.status(401).json({
                errCode: 1,
                message: 'You need to login first',
            })
        }
        
        let message = await cartService.removeAllProduct(userid)
        return res.status(200).json(message)
    } catch (error) {

    }
}

let handleGetTotalQuantity = async (req, res) => {
    try {
        let userid = req.user.userid
        if (!userid) {
            return res.status(401).json({
                errCode: 1,
                message: 'You need to login first',
            })
        }

        let message = await cartService.getTotalQuantity(userid)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling get total quantity request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

module.exports = {
    handleAddToCart: handleAddToCart,
    handleShowCart: handleShowCart,
    handleRemoveFromCart: handleRemoveFromCart,
    handleIncreaseQuantity: handleIncreaseQuantity,
    handleDecreaseQuantity: handleDecreaseQuantity,
    handleAddLargeQuantity: handleAddLargeQuantity,
    handleUpdateQuantity: handleUpdateQuantity,
    handleRemoveAllProduct: handleRemoveAllProduct,
    handleGetTotalQuantity: handleGetTotalQuantity
}