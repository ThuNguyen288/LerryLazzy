import clientService from '../../services/admin/clientService'

let countUsersCreated = async (req, res) => {
    try {
        let todayCount = await clientService.countUsersCreatedToday()
        let monthlyCount = await clientService.countUsersCreatedThisMonth()
        let totalCount = await clientService.getAllUsersAndCount()

        return res.status(200).json({
            todayCount,
            monthlyCount,
            totalCount
        })
    } catch (error) {
        console.error('Error handling count users created request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

module.exports = {
    countUsersCreated: countUsersCreated
}