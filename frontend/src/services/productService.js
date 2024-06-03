import axios from '../axios';

let getProductsByCategory = (categoryid) => {
    return axios.get(`/api/product?categoryid=${categoryid}`);
}

let getProductsBySubcategory = (subcategoryid) => {
    return axios.get(`/api/product?subcategoryid=${subcategoryid}`);
}

let getProductsById = (productid) => {
    return axios.get(`/api/product?productid=${productid}`);
}

export {
    getProductsByCategory, 
    getProductsBySubcategory,
    getProductsById,
}