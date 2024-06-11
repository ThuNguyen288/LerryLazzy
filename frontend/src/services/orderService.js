import axios from '../axios'

let handleCreateNewOrder = (token, data) => {
    return axios.post('/api/protected/create-order', data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export {
    handleCreateNewOrder,
}