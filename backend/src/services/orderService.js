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

            let cartItems = await db.Cart.findAll({
                where: { userid: userid },
            })

            if (!cartItems || cartItems.length === 0) {
                orderData.errCode = 2
                orderData.errMessage = 'Your cart is empty'
                return resolve(orderData)
            }

            if (!data || !data.shippingAddress || !data.paymentMethod || !data.totalPrice || !data.deliveryMethod) {
                orderData.errCode = 3
                orderData.errMessage = 'Missing required parameters!'
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
                    Note: data.note,
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
const clearCart = async (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderData = {
                errCode: 0,
                errMessage: '',
                order: null     
            }
            let order = await db.Order.findOne({
                where: { UserID: userid },
                order: [['OrderID', 'DESC']]
            })

            if (!order) {
                orderData.errCode = 1
                orderData.errMessage = 'No order found!'
                return resolve(orderData)
            }

            await db.Order.update({
                Status: 'Pending Pickup',
                StatusDate: Date.now()
            }, {
                where: { OrderID: order.OrderID }
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

module.exports = {
    createNewOrder: createNewOrder,
    clearCart: clearCart
}