import db from '../../models/index'
import { Op } from 'sequelize'

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
        const orders = await db.Order.findAll()

        let totalPrice = 0;
        orders.forEach(order => {
            totalPrice += order.TotalPrice;
        })

        return {
            count: orders.length,
            totalPrice: totalPrice,
            orders: orders
        }
    } catch (error) {
        throw new Error('Error fetching all orders and count: ' + error.message)
    }
}

const getOrdersForLast7Days = async () => {
    try {
        // Tạo ngày bắt đầu của ngày hiện tại
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        // Tạo ngày kết thúc của ngày hiện tại
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        // Tạo ngày bắt đầu của ngày 7 ngày trước
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        // Truy vấn cơ sở dữ liệu để lấy danh sách đơn hàng trong 7 ngày gần đây
        const orders = await db.Order.findAll({
            where: {
                createdAt: {
                    [Op.between]: [sevenDaysAgo, todayEnd]
                }
            },
            order: [['createdAt', 'ASC']] // Sắp xếp theo ngày tăng dần
        });

        // Tạo một mảng để lưu trữ số lượng đơn hàng mỗi ngày
        const dailyData = [];

        // Tạo một đối tượng map để lưu trữ tổng giá trị đơn hàng mỗi ngày
        const dailyTotalMap = new Map();

        // Lặp qua danh sách đơn hàng và nhóm chúng theo ngày
        orders.forEach(order => {
            const orderDate = order.createdAt.toDateString();
            if (!dailyTotalMap.has(orderDate)) {
                dailyTotalMap.set(orderDate, 0);
            }
            dailyTotalMap.set(orderDate, dailyTotalMap.get(orderDate) + order.TotalPrice);
        });

        // Tạo mảng dữ liệu hàng ngày từ bản đồ
        dailyTotalMap.forEach((total, date) => {
            dailyData.push({
                day: new Date(date).toLocaleDateString('en-US', { weekday: 'long' }), // Format ngày thành tên ngày
                count: orders.filter(order => order.createdAt.toDateString() === date).length, // Đếm số lượng đơn hàng trong ngày
                total: total // Tổng giá trị đơn hàng trong ngày
            });
        });

        return dailyData;
    } catch (error) {
        throw new Error('Error fetching orders for last 7 days: ' + error.message);
    }
};

module.exports = {
    countOrdersCreatedToday: countOrdersCreatedToday,
    countOrdersCreatedThisMonth: countOrdersCreatedThisMonth,
    getAllOrdersAndCount: getAllOrdersAndCount,
    getOrdersForLast7Days: getOrdersForLast7Days
}