import db from '../../models/index'

const countUsersCreatedToday = async () => {
    try {
        const todayStart = new Date()
        todayStart.setHours(0, 0, 0, 0)

        const todayEnd = new Date()
        todayEnd.setHours(23, 59, 59, 999)

        const users = await db.User.findAll({
            where: {
                Role: 'customer',
                createdAt: {
                    [db.Sequelize.Op.between]: [todayStart, todayEnd]
                }
            },
            attributes: ['UserID'] 
        })

        return users.length
    } catch (error) {
        throw new Error('Error counting users created today: ' + error.message)
    }
}

const countUsersCreatedThisMonth = async () => {
    try {
        const now = new Date()
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)

        const users = await db.User.findAll({
            where: {
                Role: 'customer',
                createdAt: {
                    [db.Sequelize.Op.between]: [monthStart, monthEnd]
                }
            },
            attributes: ['UserID'] 
        })

        return users.length
    } catch (error) {
        throw new Error('Error counting users created this month: ' + error.message)
    }
}

const getAllUsersAndCount = async () => {
    try {
        const users = await db.User.findAll({
            where: { Role: 'customer' },
            attributes: ['UserID', 'Username', 'Firstname', 'Lastname', 'Email', 'Address', 'Phone', 'DateOfBirth', 'Role', 'createdAt', 'updatedAt']
        })

        return {
            count: users.length,
            users: users
        }
    } catch (error) {
        throw new Error('Error fetching all users and count: ' + error.message)
    }
}

module.exports = {
    countUsersCreatedToday: countUsersCreatedToday,
    countUsersCreatedThisMonth: countUsersCreatedThisMonth,
    getAllUsersAndCount: getAllUsersAndCount
}