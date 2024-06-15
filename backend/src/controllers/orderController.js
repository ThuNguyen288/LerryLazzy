import orderService from '../services/orderService'
import cron from 'node-cron'

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
        let { orderid, note } = req.body

        let message = await orderService.clearCart(userid, orderid, note)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling clear cart request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleShowOrder = async (req, res) => {
    try {
        let userid = req.user.userid 
        let  { orderid } = req.query

        let message = await orderService.showOrder(userid, orderid)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling show order request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleShowOrderItem = async (req, res) => {
    try {
        let userid = req.user.userid
        let { orderid } = req.query

        let message = await orderService.showOrderItem(userid, orderid)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling show order item request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleShowAllOrders = async (req, res) => {
    try {
        let userid = req.user.userid
        let message = await orderService.showAllOrders(userid)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling show all orders request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleApplyCoupon = async (req, res) => {
    try {
        let userid = req.user.userid
        let { code } = req.body
        let message = await orderService.applyCoupon(userid, code)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling apply coupn request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleUpdateOrderStatus = async () => {
    try {
        let pickupToDelivery = await orderService.updatePickupStatus()
        let deliveryToDelivered = await orderService.updateDeliveryStatus()
        let confirmToCancel = await orderService.updateConfirmStatus()

        if (pickupToDelivery.errCode !== 0) {
            console.log('Update pending pick up to pending delivery:', pickupToDelivery.errMessage);
        }

        if (deliveryToDelivered.errCode !== 0) {
            console.log('Update pending delivery to delivered:', deliveryToDelivered.errMessage);
        }
        
        if (confirmToCancel.errCode !== 0) {
            console.log('Update pending confirmation to canceled:', confirmToCancel.errMessage);
        }

        console.log('Order status updated successfully')
        return {
            pickupToDelivery,
            deliveryToDelivered,
            confirmToCancel
        }
    } catch (error) {
        console.error('Error handling update order status request:', error);
    }
}

// Cron job to run every 5 minutes
cron.schedule('*/10 * * * *', async () => {
    console.log('Running a task every 5 minutes')
    let message = await handleUpdateOrderStatus()
    console.log(message)
})

module.exports = {
    handleCreateNewOrder: handleCreateNewOrder,
    handleClearCart: handleClearCart,
    handleShowOrder: handleShowOrder,
    handleShowOrderItem: handleShowOrderItem,
    handleShowAllOrders: handleShowAllOrders,
    handleUpdateOrderStatus: handleUpdateOrderStatus,
    handleApplyCoupon: handleApplyCoupon
}



