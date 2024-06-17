import { Op } from 'sequelize'
import db from '../../models/index'

const countOrdersCreatedToday = async () => {
    try {
        const todayStart = new Date()
        todayStart.setHours(0, 0, 0, 0)

        const todayEnd = new Date()
        todayEnd.setHours(23, 59, 59, 999)

        const orders = await db.Order.findAll({
            where: {
                createdAt: {
                    [db.Sequelize.Op.between]: [todayStart, todayEnd]
                }
            },
        })

        let totalToday = 0;
        orders.forEach(order => {
            totalToday += order.TotalPrice;
        })

        return {
            count: orders.length,
            total: totalToday
        }
    } catch (error) {
        throw new Error('Error counting orders created today: ' + error.message)
    }
}

const countOrdersCreatedThisMonth = async () => {
    try {
        const now = new Date()
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)

        const orders = await db.Order.findAll({
            where: {
                createdAt: {
                    [db.Sequelize.Op.between]: [monthStart, monthEnd]
                }
            },
        })

        let totalMonth = 0;
        orders.forEach(order => {
            totalMonth += order.TotalPrice;
        })

        return {
            count: orders.length,
            total: totalMonth
        }
    } catch (error) {
        throw new Error('Error counting orders created this month: ' + error.message)
    }
}

const getAllOrdersAndCount = async () => {
    try {
        const orders = await db.Order.findAll({
            include: [{
                model: db.OrderItem, 
                as: 'orderitem',
                attributes: ['ProductID', 'Quantity']
            }],
            raw: true
        })
        console.log(orders)

        let totalPrice = 0
        let statusCounts = {
            pickup: 0,
            delivery: 0,
            delivered: 0,
            canceled: 0
        }

        let deliveredProductsQuantity = 0;

        orders.forEach(order => {
            totalPrice += order.TotalPrice;

            switch (order.Status) {
                case 'Pending Pickup':
                    statusCounts.pickup++;
                    break;
                case 'Pending Delivery':
                    statusCounts.delivery++;
                    break;
                case 'Delivered':
                    statusCounts.delivered++;
                    if (order['orderitem.Quantity']) {
                        deliveredProductsQuantity += order['orderitem.Quantity'];
                    }
                    break;
                case 'Canceled':
                    statusCounts.canceled++;
                    break;
                default:
                    break;
            }
        });

        return {
            count: orders.length,
            totalPrice: totalPrice,
            statusCounts: statusCounts,
            orders: orders,
            deliveredProductsQuantity: deliveredProductsQuantity,
        }
    } catch (error) {
        throw new Error('Error fetching all orders and count: ' + error.message)
    }
}

const getOrdersForLast7Days = async () => {
    try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const orders = await db.Order.findAll({
            where: {
                createdAt: {
                    [Op.between]: [sevenDaysAgo, todayEnd]
                }
            },
            order: [['createdAt', 'ASC']] 
        });

        const dailyData = [];

        const dailyTotalMap = new Map();

        orders.forEach(order => {
            const orderDate = order.createdAt.toDateString();
            if (!dailyTotalMap.has(orderDate)) {
                dailyTotalMap.set(orderDate, 0);
            }
            dailyTotalMap.set(orderDate, dailyTotalMap.get(orderDate) + order.TotalPrice);
        });

        dailyTotalMap.forEach((total, date) => {
            dailyData.push({
                day: new Date(date).toLocaleDateString('en-US', { weekday: 'long' }), // Format ngày thành tên ngày
                count: orders.filter(order => order.createdAt.toDateString() === date).length, // Đếm số lượng đơn hàng trong ngày
                total: total 
            });
        });

        return dailyData;
    } catch (error) {
        throw new Error('Error fetching orders for last 7 days: ' + error.message);
    }
};

let showAllOrders = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderData = {
                errCode: 0,
                errMessage: '',
                orders: []
            };

            let orders = await db.Order.findAll({
                include: [{
                    model: db.User,
                    attributes: ['Firstname', 'Lastname'],
                    as: 'user'
                }],
                order: [['createdAt', 'DESC']],
                raw: true
            });

            if (!orders || orders.length === 0) {
                orderData.errCode = 1;
                orderData.errMessage = 'Orders not found!';
                return resolve(orderData);
            }

            orderData.orders = orders.map(order => {
                let userName = `${order['user.Firstname']} ${order['user.Lastname']}`;
        
                return {
                    OrderID: order.OrderID,
                    OrderDate: order.OrderDate,
                    UserName: userName,
                    TotalPrice: order.TotalPrice
                };
            });

            orderData.errMessage = 'Show all orders successfully!';
            return resolve(orderData);
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    countOrdersCreatedToday: countOrdersCreatedToday,
    countOrdersCreatedThisMonth: countOrdersCreatedThisMonth,
    getAllOrdersAndCount: getAllOrdersAndCount,
    getOrdersForLast7Days: getOrdersForLast7Days,
    showAllOrders: showAllOrders
}