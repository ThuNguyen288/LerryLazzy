import axios from '../axios'

let handleAddRemoveFavorite = (token, productid) => {
    return axios.put('/api/protected/add-remove', { productid } , {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

let handleShowFavorite = (token) => {
    return axios.get('/api/protected/show-favorite', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

export {
    handleAddRemoveFavorite,
    handleShowFavorite
}