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

let getProductImage = async (id) => {
    try {
        let response = await axios.get(`/api/product-image/${id}`, {
            responseType: 'arraybuffer'
        });
        let imageData = Buffer.from(response.data, 'binary').toString('base64');
        return `data:image/png;base64,${imageData}`;
    } catch (error) {
        console.error('Error fetching product image:', error);
    }
};

export {
    getProductImage, getProductsByCategory, getProductsById, getProductsBySubcategory
};
