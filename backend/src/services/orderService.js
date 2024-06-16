import { format } from 'date-fns'
import db from '../models/index'
let { Op } = require('sequelize')

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
                    CouponID: data.couponId,
                    Status: 'Pending Pickup',
                    StatusDate: new Date(),
                    DeliveryMethod: data.deliveryMethod,
                    Note: data.note,
                }, { transaction: t })

                let orderItemsData = cartItems.map((item) => ({
                    OrderID: orderData.order.OrderID,
                    ProductID: item.ProductID,
                    Quantity: item.Quantity,
                    Price: item.Price
                }))

                await db.OrderItem.bulkCreate(orderItemsData, { transaction: t })

                await db.Cart.destroy({ where: { UserID: userid }, transaction: t })

                await t.commit()

                orderData.errMessage = 'Ordered successfully!'
                return resolve(orderData)
            })
        } catch (error) {
            reject(error)
        }
    })
}

// Function to clear cart
let clearCart = (userid, orderid, note) => {
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
                Note: note,
                Status: 'Pending Pickup',
                StatusDate: new Date(),
            }, {
                where: { OrderID: orderid }
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
let showOrder = (userid, orderid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderData = {
                errCode: 0,
                errMessage: '',
                order: null,
                discount: 0,
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

            if (order.CouponID) {
                let coupon = await db.Coupon.findOne({
                    where: { CouponID: order.CouponID }
                })
                if (coupon) {
                    orderData.discount = coupon.Discount
                }
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
let showOrderItem = (userid, orderid) => {
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

// Funtion to show all orders of user
let showAllOrders = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderData = {
                errCode: 0,
                errMessage: '',
                orders: []
            }

            let user = await db.User.findOne({
                where: { UserID: userid }
            })

            if(!user) {
                orderData.errCode = 1
                orderData.errMessage = 'User not found'
                return resolve(orderData)
            }

            let orders = await db.Order.findAll({
                where: { UserID: userid },
                order: [['OrderID', 'DESC']]
            })

            if (!orders) {
                orderData.errCode = 2;
                orderData.errMessage = 'Orders not found!';
                return resolve(orderData);
            }

            orderData.orders = orders.map(order => {
                return {
                    ...order,
                    OrderDate: format(new Date(order.OrderDate), 'dd/MM/yyyy')
                }
            })

            orderData.errMessage = 'Show all orders successfully!'
            return resolve(orderData)
        } catch (error) {
            reject(error)
        }
    })
}

// Function to add coupon code
let applyCoupon = async (userid, code) => {
    return new Promise(async (resolve, reject) => {
        try {
            let couponData = {
                errCode: 0,
                errMessage: '',
                coupon: null
            }

            let user = await db.User.findOne({
                where: { UserID: userid }
            })

            if(!user) {
                orderData.errCode = 1
                orderData.errMessage = 'User not found'
                return resolve(orderData)
            }

            let coupon = await db.Coupon.findOne({
                where: { Code: code }
            })

            if (!coupon) {
                couponData.errCode = 2
                couponData.errMessage = 'Coupon code not found!'
                return resolve(couponData)
            }

            const currentDate = new Date()
            if (coupon.ExpiryDate < currentDate) {
                couponData.errCode = 3
                couponData.errMessage = 'Coupon has expired!'
                return resolve(couponData)
            }

            couponData.coupon = coupon
            couponData.errMessage = 'Apply discount code successfully'
            return resolve(couponData)
        } catch (error) {
            reject(error)
        }
    })
}

// Function to update pickup status of order { Pending Pickup -> Pending Delivery}
let updatePickupStatus = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderData = {
                errCode: 0,
                errMessage: '',
                orders: []
            }
            
            let now = new Date()
            let randomDays = Math.floor(Math.random() * 2) + 1

            let pastDate = new Date()
            pastDate.setMinutes(now.getMinutes() - randomDays)

            let orders = await db.Order.findAll({
                where: {
                    StatusDate: { [Op.lte]: pastDate },
                    Status: 'Pending Pickup'
                }
            })

            if (!orders || orders.length === 0) {
                orderData.errCode = 1
                orderData.errMessage = 'No orders found for pickup status update'
                return resolve(orderData)
            }

            for (let order of orders) {
                await db.Order.update({
                    Status: 'Pending Delivery',
                    StatusDate: Date.now()
                }, {
                    where: { OrderID: order.OrderID}
                })
                orderData.orders.push(order)
            }
            orderData.errMessage = 'Complete to change order status from pending pickup to pending delivery'
            return resolve(orderData)
        } catch (error) {
            reject(error)
        } 
    })
}

// Function to update delivery status of order { Pending Delivery -> Delivered }
let updateDeliveryStatus = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderData = {
                errCode: 0,
                errMessage: '',
                orders: []
            }
            
            let now = new Date()
            
            let methods = [
                {
                    name: 'Usp Next Day',
                    minDays: 0,
                    maxDays: 1,
                    pastDate: null
                }, {
                    name: 'Express Shipping',
                    minDays: 2,
                    maxDays: 3,
                    pastDate: null
                }, {
                    name: 'Standard Shipping',
                    minDays: 5,
                    maxDays: 7,
                    pastDate: null
                }, {
                    name: 'In Store Pickup',
                    minDays: 0,
                    maxDays: 0,
                    pastDate: null
                }
            ]

            for (let method of methods) {
                let randomDays = Math.floor(Math.random() * (method.maxDays - method.minDays + 1)) + method.minDays
                let pastDate = new Date()
                pastDate.setMinutes(now.getMinutes() - randomDays)
                method.pastDate = pastDate
                console.log(`Delivery Method: ${method.name}, Past Date: ${method.pastDate}`)

                let orders = await db.Order.findAll({
                    where: {
                        Status: 'Pending Delivery',
                        StatusDate: { [Op.lte]: method.pastDate },
                        DeliveryMethod: method.name
                    }
                })

                if (!orders || orders.length === 0) {
                    console.log(`No orders found for delivery method: ${method.name}`)
                    continue
                }

                for (let order of orders) {
                    await db.Order.update({
                        Status: 'Delivered',
                        StatusDate: Date.now()
                    }, {
                        where: { OrderID: order.OrderID }
                    })
                    orderData.orders.push(order)
                }
            }

            orderData.errMessage = 'Complete to change order status from pending delivery to devivered'
            return resolve(orderData)
        } catch (error) {
            reject(error)
        }
    })
}

// Function to update confirm status of order { Pending Confirmation -> Canceled }
let updateConfirmStatus = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderData = {
                errCode: 0,
                errMessage: '',
                orders: []
            }

            let now = new Date()
            let randomHours = Math.floor(Math.random() * 5) + 1

            let pastDate = new Date()
            pastDate.setMinutes(now.getMinutes() - randomHours)
            
            let orders = await db.Order.findAll({
                where: {
                    updatedAt: { [Op.lte]: pastDate },
                    Status: 'Pending Confirmation'
                }
            })

            if (!orders || orders.length === 0) {
                orderData.errCode = 1
                orderData.errMessage = 'No orders found for confirm status update'
            }

            for (let order of orders) {
                await db.Order.update({
                    Status: 'Canceled',
                    StatusDate: Date.now()
                }, {
                    where: { OrderID: order.OrderID}
                })
                orderData.orders.push(order)
            }
            orderData.errMessage = 'Complete to change order status from pending confirmation to canceled'
            return resolve(orderData)

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewOrder: createNewOrder,
    clearCart: clearCart,
    showOrder: showOrder,
    showOrderItem: showOrderItem,
    showAllOrders: showAllOrders,
    updateDeliveryStatus: updateDeliveryStatus,
    updatePickupStatus: updatePickupStatus,
    updateConfirmStatus: updateConfirmStatus,
    applyCoupon: applyCoupon
}