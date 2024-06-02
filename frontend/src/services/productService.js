import axios from '../axios';

const displayProductsByCategory =(categoryid) => {
    return axios.get(`/api/product?categoryid=${categoryid}`);
}

const displayProductsBySubcategory =(subcategoryid) => {
    return axios.get(`/api/product?subcategoryid=${subcategoryid}`);
}

export {displayProductsByCategory, displayProductsBySubcategory}