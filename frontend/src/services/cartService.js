import axios from '../axios'

let handleUserAddToCart = (token, productid) => {
    return axios.put('/api/protected/add-to-cart', { productid} , {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

let handleUserShowCart = (token) => {
    return axios.get('/api/protected/show-cart', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

let handleShowProductDetail = (productid) => {
    return axios.get(`/api/product?productid=${ productid }`)
}

let handleUserRemoveFromCart = (token, productid) => {
    return axios.post('/api/protected/remove-from-cart', productid, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

export {
    handleUserAddToCart,
    handleUserShowCart,
    handleShowProductDetail,
    handleUserRemoveFromCart,
}