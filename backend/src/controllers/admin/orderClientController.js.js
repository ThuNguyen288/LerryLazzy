import orderClientService from '../../services/admin/orderClientService'

let countOrdersCreated = async (req, res) => {
    try {
        let todayCount = await orderClientService.countOrdersCreatedToday()
        let monthlyCount = await orderClientService.countOrdersCreatedThisMonth()
        let totalCount = await orderClientService.getAllOrdersAndCount()
        let order = await orderClientService.getOrdersForLast7Days()

        return res.status(200).json({
            todayCount,
            monthlyCount,
            totalCount,
            order
        })
    } catch (error) {
        console.error('Error handling count orders created request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

module.exports = {
    countOrdersCreated: countOrdersCreated
}