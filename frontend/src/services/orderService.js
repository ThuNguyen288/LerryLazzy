import axios from '../axios'

let handleCreateNewOrder = (token, data) => {
    return axios.post('/api/protected/create-order', data, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

let handleClearCart = (token, orderid) => {
    return axios.put('/api/protected/clear-cart', { orderid }, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

let handleShowOrderItem = (token, orderid) => {
    return axios.get(`/api/protected/show-order-item?orderid=${orderid}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

let handleShowAllOrders = (token) => {
    return axios.get('/api/protected/show-all-orders', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

export {
    handleCreateNewOrder,
    handleClearCart,
    handleShowOrderItem,
    handleShowAllOrders
}