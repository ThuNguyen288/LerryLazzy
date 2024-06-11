import db from '../models/index'
import orderService from '../services/orderService'

let handleCreateNewOrder = async(req, res) => {
    try {
        let userid = req.user.userid
        let data = req.body

        console.log(data)

        let message = await orderService.createNewOrder(userid, data)

        if (message.errCode === 0) {
            return res.status(201).json(message)
        } else {
            return res.status(400).json(message)
        }
    } catch (error) {
        console.error('Error handling create new order request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleClearCart = async (req, res) => {
    try {
        let userid = req.user.userid
        let message = await orderService.clearCart(userid)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling clear cart request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

module.exports = {
    handleCreateNewOrder: handleCreateNewOrder,
    handleClearCart: handleClearCart,
}



