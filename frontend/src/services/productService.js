import axios from '../axios'

let getProductsByCategory = (categoryid) => {
    return axios.get(`/api/product?categoryid=${categoryid}`)
}

let getProductsBySubcategory = (subcategoryid) => {
    return axios.get(`/api/product?subcategoryid=${subcategoryid}`)
}

let getProductById = (productid) => {
    return axios.get(`/api/product?productid=${productid}`)
}

let getHotProduct = async () => {
    let response = await axios.get('/api/hot-product')
    return response
}

export {
    getProductsByCategory, 
    getProductById, 
    getProductsBySubcategory,
    getHotProduct
}
