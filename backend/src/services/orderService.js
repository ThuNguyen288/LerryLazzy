import db from '../models/index'

// Function create new order
let createNewOrder = (userid, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data)
            let orderData = {
                errCode: 0,
                errMessage: '',
                order: null
            }

            let user = await db.User.findOne({
                where: { UserID: userid }
            })

            if(!user) {
                orderData.errCode = 1
                orderData.errMessage = 'User not found'
                return resolve(orderData)
            }

            if (!data || data.shippingAddress === '' || data.paymentMethod === '' || data.totalPrice === '' || data.deliveryMethod === '') {
                orderData.errCode = 3
                orderData.errMessage = 'Missing required parameters!'
                return resolve(orderData)
            }

            let cartItems = await db.Cart.findAll({
                where: { userid: userid },
            })

            if (!cartItems || cartItems.length === 0) {
                orderData.errCode = 2
                orderData.errMessage = 'Your cart is empty'
                return resolve(orderData)
            }

            await db.sequelize.transaction(async (t) => {
                for (const item of cartItems) {
                    const product = await db.Product.findOne({
                        where: { ProductID: item.ProductID },
                        transaction: t,
                        lock: true 
                    })
                    if (!product) {
                        orderData.errCode = 4
                        orderData.errMessage = `Not found product with ID: ${item.ProductID}`
                        return resolve(orderData)
                    }
                    if (product.Quantity < item.Quantity) {
                        orderData.errCode = 5
                        orderData.errMessage = `Not enough quantity available for ${product.Name}`
                        return resolve(orderData)
                    }
                    const updatedInStock = product.Quantity - item.Quantity
                    await db.Product.update({
                        Quantity: updatedInStock
                    }, {
                        where: { ProductID: item.ProductID },
                        transaction: t 
                    })
                    item.Price = product.Price 
                }

                orderData.order = await db.Order.create({
                    UserID: userid,
                    OrderDate: new Date(),
                    ShippingAddress: data.shippingAddress,
                    PaymentMethod: data.paymentMethod,
                    TotalPrice: data.totalPrice,
                    CouponID: data.couponid,
                    Status: 'Pending Confirmation',
                    StatusDate: new Date(),
                    DeliveryMethod: data.deliveryMethod
                }, { transaction: t })

                let orderItemsData = cartItems.map((item) => ({
                    OrderID: orderData.order.OrderID,
                    ProductID: item.ProductID,
                    Quantity: item.Quantity,
                    Price: item.Price
                }))

                await db.OrderItem.bulkCreate(orderItemsData, { transaction: t })

                orderData.errMessage = 'Ordered successfully!'
                return resolve(orderData)
            })
        } catch (error) {
            reject(error)
        }
    })
}

// Function to clear cart
const clearCart = async (userid, orderid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderData = {
                errCode: 0,
                errMessage: '',
                order: null     
            }

            let user = await db.User.findOne({
                where: { UserID: userid }
            })

            if(!user) {
                orderData.errCode = 1
                orderData.errMessage = 'User not found'
                return resolve(orderData)
            }

            let order = await db.Order.findOne({
                where: { OrderID: orderid },
            })

            if (!order) {
                orderData.errCode = 1
                orderData.errMessage = 'No order found!'
                return resolve(orderData)
            }

            await db.Order.update({
                Status: 'Pending Pickup',
                StatusDate: Date.now(),
            }, {
                where: { OrderID: orderid }
            })

            await db.Cart.destroy({
                where: { UserID: userid }
            })

            orderData.errCode = 0
            orderData.errMessage = 'Order confirmed successfully!'
            orderData.order = order
            return resolve(orderData)

        } catch (error) {
            reject(error)
        }
    })
}

// Function to show order
let showOrder = async (userid, orderid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderData = {
                errCode: 0,
                errMessage: '',
                order: null     
            }

            let user = await db.User.findOne({
                where: { UserID: userid }
            })

            if(!user) {
                orderData.errCode = 1
                orderData.errMessage = 'User not found'
                return resolve(orderData)
            }

            let order = await db.Order.findOne({
                where: { OrderID: orderid }
            })

            if (!order) {
                orderData.errCode = 2
                orderData.errMessage = 'Order not found!'
                return resolve(orderData)
            }

            orderData.order = order
            orderData.errMessage = 'Get order successfully!'
            return resolve(orderData)
        } catch (error) {
            reject(error)
        }
    })
}

// Function to show order item
let showOrderItem = async (userid, orderid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderData = {
                errCode: 0,
                errMessage: '',
                orderItems: null
            }

            let user = await db.User.findOne({
                where: { UserID: userid }
            })

            if(!user) {
                orderData.errCode = 1
                orderData.errMessage = 'User not found'
                return resolve(orderData)
            }

            let order = await db.Order.findOne({
                where: { OrderID: orderid }
            })

            if (!order) {
                orderData.errCode = 2
                orderData.errMessage = 'Order not found!'
                return resolve(orderData)
            }

            let orderItems = await db.OrderItem.findAll({
                where: { OrderID: orderid }
            })

            if (!orderItems || orderItems.length === 0) {
                orderData.errCode = 3;
                orderData.errMessage = 'Order items not found!';
                return resolve(orderData);
            }

            orderData.orderItems = orderItems
            orderData.errMessage = 'Get order item successfully!'
            return resolve(orderData)
        } catch (error) {
            reject(error)
        }
    })
}

// Function to add note
let addNote = async (userid, note) => {
    return new Promise(async (resolve, reject) => {
        try {
            
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewOrder: createNewOrder,
    clearCart: clearCart,
    showOrder: showOrder,
    showOrderItem: showOrderItem
}